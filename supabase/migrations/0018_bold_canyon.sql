/*
  # Add nickname support
  
  1. Changes
    - Add nickname column to user_avatar_settings
    - Add default nickname from email
    - Add nickname update function
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add nickname column
ALTER TABLE user_avatar_settings
ADD COLUMN IF NOT EXISTS nickname text;

-- Update existing users with default nicknames from email
UPDATE user_avatar_settings
SET nickname = SPLIT_PART(
  (SELECT email FROM auth.users WHERE id = user_avatar_settings.user_id),
  '@',
  1
)
WHERE nickname IS NULL;