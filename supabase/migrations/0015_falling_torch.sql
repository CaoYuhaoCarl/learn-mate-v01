/*
  # Fix Avatar Settings Migration
  
  1. Changes
    - Drop existing avatar trigger to avoid conflicts
    - Modify user_avatar_settings table
    - Add default avatar style
    - Ensure existing users have avatar settings
  
  2. Security
    - Maintain existing RLS policies
*/

-- Drop existing avatar trigger to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created_avatar ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user_avatar();

-- Modify the user_avatar_settings table
ALTER TABLE user_avatar_settings
  ALTER COLUMN avatar_style SET DEFAULT 'avataaars';

-- Ensure all existing users have avatar settings
INSERT INTO user_avatar_settings (user_id)
SELECT id FROM auth.users
WHERE id NOT IN (SELECT user_id FROM user_avatar_settings)
ON CONFLICT (user_id) DO NOTHING;