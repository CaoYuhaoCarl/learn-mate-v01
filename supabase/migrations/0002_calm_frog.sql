/*
  # Add speaking practice scores

  1. New Tables
    - `speaking_scores`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `material_id` (uuid, references materials)
      - `sentence` (text, the practiced sentence)
      - `spoken_text` (text, what the user said)
      - `score` (integer, pronunciation score)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on speaking_scores table
    - Add policy for users to manage their own scores
*/

CREATE TABLE IF NOT EXISTS speaking_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  material_id uuid REFERENCES materials(id) NOT NULL,
  sentence text NOT NULL,
  spoken_text text NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE speaking_scores ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can insert their own scores"
  ON speaking_scores FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own scores"
  ON speaking_scores FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);