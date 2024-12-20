/*
  # Add practice enabled flag to notebook items
  
  1. Changes
    - Add practice_enabled column to notebook_items table
    - Add index for faster queries on practice_enabled items
*/

ALTER TABLE notebook_items
  ADD COLUMN IF NOT EXISTS practice_enabled boolean DEFAULT true;

CREATE INDEX IF NOT EXISTS idx_notebook_items_practice 
  ON notebook_items(user_id, practice_enabled, type);