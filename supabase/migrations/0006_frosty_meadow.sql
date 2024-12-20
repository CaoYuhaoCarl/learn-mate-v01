/*
  # Add Notebook Feature

  1. New Tables
    - `notebook_items`: Stores saved items from learning materials
      - `id`: Unique identifier
      - `user_id`: Reference to user
      - `content`: The saved content
      - `type`: Type of content (vocabulary/sentence/grammar)
      - `source_id`: Reference to source material
      - `notes`: User's personal notes
      - `created_at`: Timestamp

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

CREATE TYPE notebook_item_type AS ENUM ('vocabulary', 'sentence', 'grammar');

CREATE TABLE IF NOT EXISTS notebook_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  content text NOT NULL,
  type notebook_item_type NOT NULL,
  source_id uuid REFERENCES materials(id),
  notes text,
  created_at timestamptz DEFAULT now(),
  practice_count integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE notebook_items ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can manage their own notebook items"
  ON notebook_items FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);