/*
  # Fix RLS policies and add indexes

  1. Changes
    - Add missing RLS policy for user_progress
    - Add indexes for better query performance
    - Fix speaking_scores policies
  
  2. Security
    - Ensure users can only access their own data
    - Add proper RLS policies for all operations
*/

-- Add missing policy for user_progress
CREATE POLICY "Users can insert their own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_material 
  ON user_progress(user_id, material_id);

CREATE INDEX IF NOT EXISTS idx_speaking_scores_user_material 
  ON speaking_scores(user_id, material_id);

-- Drop and recreate speaking_scores policies with proper conditions
DROP POLICY IF EXISTS "Users can insert their own scores" ON speaking_scores;
DROP POLICY IF EXISTS "Users can view their own scores" ON speaking_scores;

CREATE POLICY "Users can manage their own scores"
  ON speaking_scores FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);