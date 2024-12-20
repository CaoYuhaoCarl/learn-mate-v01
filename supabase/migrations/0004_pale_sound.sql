/*
  # Vocabulary Battle Tables

  1. New Tables
    - `vocabulary_words`
      - `id` (uuid, primary key)
      - `word` (text)
      - `definition` (text)
      - `difficulty_level` (text)
      - `created_at` (timestamp)
    
    - `battle_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `score` (integer)
      - `opponent_score` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Vocabulary Words Table
CREATE TABLE IF NOT EXISTS vocabulary_words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  word text NOT NULL,
  definition text NOT NULL,
  difficulty_level text NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  created_at timestamptz DEFAULT now()
);

-- Battle History Table
CREATE TABLE IF NOT EXISTS battle_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  score integer NOT NULL,
  opponent_score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE vocabulary_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE battle_history ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Vocabulary words are viewable by authenticated users"
  ON vocabulary_words FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own battle history"
  ON battle_history FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert sample vocabulary words
INSERT INTO vocabulary_words (word, definition, difficulty_level) VALUES
  ('Ephemeral', 'Lasting for a very short time', 'advanced'),
  ('Ubiquitous', 'Present, appearing, or found everywhere', 'advanced'),
  ('Serendipity', 'The occurrence of finding pleasant things by chance', 'advanced'),
  ('Paradigm', 'A typical example or pattern of something', 'intermediate'),
  ('Ambiguous', 'Open to more than one interpretation', 'intermediate'),
  ('Pragmatic', 'Dealing with things sensibly and realistically', 'intermediate'),
  ('Resilient', 'Able to recover quickly from difficulties', 'intermediate'),
  ('Arbitrary', 'Based on random choice rather than reason', 'intermediate'),
  ('Concise', 'Brief but comprehensive', 'beginner'),
  ('Diligent', 'Having or showing care in one''s work', 'beginner');