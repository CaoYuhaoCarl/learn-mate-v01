/*
  # Add sample groups and members

  1. Sample Data
    - Creates study groups
    - Adds members to groups
    - Sets up initial ratings and stats
*/

-- Insert sample groups
INSERT INTO groups (id, name, description, created_by)
SELECT 
  gen_random_uuid(),
  name,
  description,
  (SELECT id FROM auth.users LIMIT 1)
FROM (
  VALUES 
    ('English Masters', 'Advanced English study group for serious learners'),
    ('Casual Learning Club', 'Relaxed environment for practicing English'),
    ('Vocabulary Champions', 'Focus on expanding vocabulary through battles')
) AS g(name, description)
ON CONFLICT DO NOTHING;

-- Add some members to groups
WITH first_group AS (
  SELECT id FROM groups ORDER BY created_at LIMIT 1
)
INSERT INTO group_members (
  group_id,
  user_id,
  rating,
  total_wins,
  total_battles,
  current_streak,
  best_streak
)
SELECT 
  (SELECT id FROM first_group),
  id,
  1200 + floor(random() * 400)::int, -- Random initial rating between 1200-1600
  floor(random() * 20)::int, -- Random wins between 0-20
  floor(random() * 30)::int, -- Random total battles between 0-30
  floor(random() * 5)::int, -- Random current streak between 0-5
  floor(random() * 10)::int -- Random best streak between 0-10
FROM auth.users
ON CONFLICT DO NOTHING;

-- Add some sample battle challenges
WITH first_group AS (
  SELECT id FROM groups ORDER BY created_at LIMIT 1
),
members AS (
  SELECT user_id 
  FROM group_members 
  WHERE group_id = (SELECT id FROM first_group)
  LIMIT 2
)
INSERT INTO battle_challenges (
  group_id,
  challenger_id,
  opponent_id,
  status,
  expires_at
)
SELECT
  (SELECT id FROM first_group),
  (SELECT user_id FROM members LIMIT 1),
  (SELECT user_id FROM members OFFSET 1 LIMIT 1),
  'pending',
  now() + interval '24 hours'
ON CONFLICT DO NOTHING;

-- Refresh the leaderboard
REFRESH MATERIALIZED VIEW group_leaderboard;