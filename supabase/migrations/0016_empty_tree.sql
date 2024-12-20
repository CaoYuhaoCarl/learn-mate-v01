/*
  # Group Battle System Tables

  1. New Tables
    - `groups` - User groups for battle system
    - `group_members` - Group membership and user stats
    - `battle_challenges` - Battle challenges between users
    - `battle_results` - Detailed battle results
    - `group_leaderboard` - Materialized view for group rankings

  2. Security
    - Enable RLS on all tables
    - Add policies for group access and battle management
*/

-- Groups table
CREATE TABLE IF NOT EXISTS groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Group members table
CREATE TABLE IF NOT EXISTS group_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES groups(id),
  user_id uuid REFERENCES auth.users(id),
  rating integer DEFAULT 1200, -- Initial ELO rating
  total_wins integer DEFAULT 0,
  total_battles integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  best_streak integer DEFAULT 0,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- Battle challenges table
CREATE TABLE IF NOT EXISTS battle_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid REFERENCES groups(id),
  challenger_id uuid REFERENCES auth.users(id),
  opponent_id uuid REFERENCES auth.users(id),
  status text CHECK (status IN ('pending', 'accepted', 'declined', 'completed')),
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz NOT NULL,
  completed_at timestamptz
);

-- Battle results table
CREATE TABLE IF NOT EXISTS battle_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id uuid REFERENCES battle_challenges(id),
  winner_id uuid REFERENCES auth.users(id),
  loser_id uuid REFERENCES auth.users(id),
  winner_score integer NOT NULL,
  loser_score integer NOT NULL,
  words_played jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Create materialized view for group leaderboard
CREATE MATERIALIZED VIEW group_leaderboard AS
SELECT 
  gm.group_id,
  gm.user_id,
  u.email as username,
  gm.rating,
  gm.total_wins as wins,
  (gm.total_battles - gm.total_wins) as losses,
  CASE 
    WHEN gm.total_battles > 0 
    THEN ROUND((gm.total_wins::numeric / gm.total_battles) * 100, 2)
    ELSE 0 
  END as win_rate,
  gm.best_streak,
  br.avg_score
FROM group_members gm
LEFT JOIN auth.users u ON gm.user_id = u.id
LEFT JOIN (
  SELECT 
    winner_id as user_id,
    ROUND(AVG(winner_score)) as avg_score
  FROM battle_results
  GROUP BY winner_id
) br ON gm.user_id = br.user_id;

-- Create index for faster leaderboard queries
CREATE INDEX idx_group_leaderboard_rating ON group_members(group_id, rating DESC);

-- Enable RLS
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE battle_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE battle_results ENABLE ROW LEVEL SECURITY;

-- Policies for groups
CREATE POLICY "Users can view all groups"
  ON groups FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create groups"
  ON groups FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Policies for group members
CREATE POLICY "Users can view group members"
  ON group_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join groups"
  ON group_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats"
  ON group_members FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for battle challenges
CREATE POLICY "Users can view relevant challenges"
  ON battle_challenges FOR SELECT
  TO authenticated
  USING (
    auth.uid() = challenger_id OR 
    auth.uid() = opponent_id
  );

CREATE POLICY "Users can create challenges"
  ON battle_challenges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = challenger_id);

CREATE POLICY "Users can update their challenges"
  ON battle_challenges FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = challenger_id OR 
    auth.uid() = opponent_id
  );

-- Policies for battle results
CREATE POLICY "Users can view battle results"
  ON battle_results FOR SELECT
  TO authenticated
  USING (
    auth.uid() = winner_id OR 
    auth.uid() = loser_id
  );

CREATE POLICY "Users can record battle results"
  ON battle_results FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = winner_id OR 
    auth.uid() = loser_id
  );

-- Function to refresh leaderboard
CREATE OR REPLACE FUNCTION refresh_group_leaderboard()
RETURNS trigger AS $$
BEGIN
  REFRESH MATERIALIZED VIEW group_leaderboard;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to refresh leaderboard on battle results
CREATE TRIGGER refresh_leaderboard_on_battle
  AFTER INSERT OR UPDATE ON battle_results
  FOR EACH STATEMENT
  EXECUTE FUNCTION refresh_group_leaderboard();