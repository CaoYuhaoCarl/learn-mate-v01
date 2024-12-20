/*
  # Add user profiles and sample data

  1. New Tables
    - Creates user_profiles table for storing user metadata
  
  2. Security
    - Enables RLS on user_profiles table
    - Adds appropriate policies for user access
*/

-- Create user profiles table if not exists
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) UNIQUE,
  username text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert sample users
DO $$
DECLARE
  new_user_id uuid;
  user_email text;
BEGIN
  FOR i IN 1..10 LOOP
    user_email := 'user' || i || '@example.com';
    
    -- Create new user ID
    new_user_id := gen_random_uuid();

    -- Insert into auth.users if email doesn't exist
    BEGIN
      INSERT INTO auth.users (
        id,
        email,
        raw_user_meta_data,
        raw_app_meta_data,
        created_at,
        updated_at,
        role,
        email_confirmed_at
      ) VALUES (
        new_user_id,
        user_email,
        '{}',
        '{"provider":"email","providers":["email"]}',
        now(),
        now(),
        'authenticated',
        now()
      );

      -- Create profile
      INSERT INTO user_profiles (user_id, username)
      VALUES (new_user_id, 'User ' || i);

      -- Add avatar settings
      INSERT INTO user_avatar_settings (user_id, avatar_style)
      VALUES (
        new_user_id,
        CASE (i % 3)
          WHEN 0 THEN 'avataaars'
          WHEN 1 THEN 'lorelei'
          ELSE 'micah'
        END
      );

      -- Add to groups with random stats
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
        g.id,
        new_user_id,
        1200 + floor(random() * 400)::int,
        floor(random() * 20)::int,
        floor(random() * 30)::int,
        floor(random() * 5)::int,
        floor(random() * 10)::int
      FROM groups g;

    EXCEPTION 
      WHEN unique_violation THEN
        -- Skip if user already exists
        CONTINUE;
    END;
  END LOOP;
END $$;

-- Create some pending battle challenges
WITH sample_group AS (
  SELECT id FROM groups ORDER BY created_at LIMIT 1
),
sample_users AS (
  SELECT DISTINCT user_id 
  FROM group_members 
  WHERE group_id = (SELECT id FROM sample_group)
  ORDER BY random()
  LIMIT 6
)
INSERT INTO battle_challenges (
  group_id,
  challenger_id,
  opponent_id,
  status,
  expires_at
)
SELECT
  (SELECT id FROM sample_group),
  a.user_id,
  b.user_id,
  'pending',
  now() + interval '24 hours'
FROM (
  SELECT user_id, row_number() OVER () as rn
  FROM sample_users
) a
JOIN (
  SELECT user_id, row_number() OVER () as rn
  FROM sample_users
) b ON b.rn = a.rn + 1
WHERE b.user_id IS NOT NULL;

-- Refresh the leaderboard
REFRESH MATERIALIZED VIEW group_leaderboard;