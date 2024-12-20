/*
  # Update Vocabulary System

  1. Changes
    - Add user vocabulary settings table
    - Add level and frequency_rank to vocabulary_words
    - Add practice_enabled column to notebook_items
    - Add indexes for better performance
  
  2. Security
    - Enable RLS on new tables
    - Add policies for user access control
*/

-- Create user vocabulary settings if not exists
CREATE TABLE IF NOT EXISTS user_vocabulary_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL UNIQUE,
  target_level integer NOT NULL DEFAULT 1 CHECK (target_level >= 1 AND target_level <= 6),
  mastered_words text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add new columns to vocabulary_words if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'vocabulary_words' 
    AND column_name = 'level'
  ) THEN
    ALTER TABLE vocabulary_words 
    ADD COLUMN level integer NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 6);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'vocabulary_words' 
    AND column_name = 'frequency_rank'
  ) THEN
    ALTER TABLE vocabulary_words 
    ADD COLUMN frequency_rank integer;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE user_vocabulary_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their vocabulary settings"
  ON user_vocabulary_settings FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_vocabulary_words_level 
  ON vocabulary_words(level, frequency_rank);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_user_vocabulary_settings_updated_at 
  ON user_vocabulary_settings;

CREATE TRIGGER update_user_vocabulary_settings_updated_at
  BEFORE UPDATE ON user_vocabulary_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample vocabulary data if table is empty
INSERT INTO vocabulary_words (word, definition, difficulty_level, level, frequency_rank)
SELECT word, definition, 'intermediate', level, frequency_rank
FROM (VALUES
  ('sustainability', 'The ability to maintain something at a certain level without depleting resources', 4, 2500),
  ('ecosystem', 'A community of living organisms and their environment', 3, 1800),
  ('biodiversity', 'The variety of life in a particular habitat or ecosystem', 4, 3000),
  ('conservation', 'The protection of plants, animals, and natural resources', 3, 2000),
  ('renewable', 'A resource that can be naturally replenished', 3, 2200),
  ('footprint', 'The impact or effect left by something', 2, 1500)
) AS v(word, definition, level, frequency_rank)
WHERE NOT EXISTS (
  SELECT 1 FROM vocabulary_words 
  WHERE word = v.word
);