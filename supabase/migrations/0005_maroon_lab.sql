/*
  # Enhance Battle Statistics

  1. Changes
    - Add accuracy field to track correct answers percentage
    - Add total_questions field to track number of questions attempted
    - Add streak field to track max streak in the game
    - Add time_taken field to track total game duration
    - Add difficulty_level for future difficulty settings

  2. Security
    - Enable RLS
    - Add policy for authenticated users
*/

-- Add new columns to battle_history
ALTER TABLE battle_history 
  ADD COLUMN IF NOT EXISTS accuracy decimal CHECK (accuracy >= 0 AND accuracy <= 100),
  ADD COLUMN IF NOT EXISTS total_questions integer NOT NULL DEFAULT 10,
  ADD COLUMN IF NOT EXISTS max_streak integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS time_taken integer, -- in seconds
  ADD COLUMN IF NOT EXISTS difficulty_level text DEFAULT 'normal' 
    CHECK (difficulty_level IN ('easy', 'normal', 'hard'));

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_battle_history_user_created 
  ON battle_history(user_id, created_at);

-- Update the existing policy to be more specific
DROP POLICY IF EXISTS "Users can manage their own battle history" ON battle_history;

CREATE POLICY "Users can view their own battle history"
  ON battle_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own battle history"
  ON battle_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);