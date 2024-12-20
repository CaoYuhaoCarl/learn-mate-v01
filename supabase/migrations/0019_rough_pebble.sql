/*
  # Add Knowledge Fragments System
  
  1. New Tables
    - `knowledge_fragments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `amount` (integer)
      - `source` (text)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on new table
    - Add policies for authenticated users
*/

-- Create knowledge fragments table
CREATE TABLE IF NOT EXISTS knowledge_fragments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  amount integer NOT NULL,
  source text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE knowledge_fragments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own fragments"
  ON knowledge_fragments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own fragments"
  ON knowledge_fragments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create view for total fragments
CREATE OR REPLACE VIEW user_total_fragments AS
SELECT 
  user_id,
  SUM(amount) as total_fragments
FROM knowledge_fragments
GROUP BY user_id;