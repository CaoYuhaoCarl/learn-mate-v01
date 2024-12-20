/*
  # Add Chinese translations and practice modes
  
  1. Updates
    - Add Chinese translation to vocabulary words
    - Add practice mode settings table
    - Add practice history tracking
  
  2. Changes
    - Adds chinese_translation column to vocabulary_words
    - Creates user_practice_settings table
    - Creates practice_history table
*/

-- Add Chinese translation to vocabulary words
ALTER TABLE vocabulary_words
ADD COLUMN chinese_translation text;

-- Create practice settings table
CREATE TABLE IF NOT EXISTS user_practice_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  practice_mode text NOT NULL DEFAULT 'guided', -- 'guided' or 'speech'
  display_mode text NOT NULL DEFAULT 'en_to_en', -- 'en_to_en', 'zh_to_en', 'en_to_zh', 'zh_to_speech', 'en_to_speech'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create practice history table
CREATE TABLE IF NOT EXISTS practice_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  word_id uuid REFERENCES vocabulary_words(id) NOT NULL,
  practice_mode text NOT NULL,
  display_mode text NOT NULL,
  correct boolean NOT NULL,
  spoken_text text, -- For speech practice
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_practice_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their practice settings"
  ON user_practice_settings FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their practice history"
  ON practice_history FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Update existing vocabulary with Chinese translations
UPDATE vocabulary_words SET chinese_translation = CASE
  WHEN word = 'sustainability' THEN '可持续性'
  WHEN word = 'ecosystem' THEN '生态系统'
  WHEN word = 'biodiversity' THEN '生物多样性'
  WHEN word = 'conservation' THEN '保护'
  WHEN word = 'renewable' THEN '可再生的'
  WHEN word = 'footprint' THEN '足迹'
  WHEN word = 'ephemeral' THEN '短暂的'
  WHEN word = 'ubiquitous' THEN '无处不在的'
  WHEN word = 'serendipity' THEN '意外发现'
  WHEN word = 'paradigm' THEN '范例'
  ELSE word
END;