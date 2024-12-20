/*
  # Add avatar settings

  1. New Tables
    - `user_avatar_settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `avatar_style` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_avatar_settings` table
    - Add policies for authenticated users to manage their own settings
*/

-- Create user avatar settings table
CREATE TABLE IF NOT EXISTS user_avatar_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL UNIQUE,
  avatar_style text NOT NULL DEFAULT 'avataaars',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_avatar_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own avatar settings"
  ON user_avatar_settings FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_avatar_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_avatar_settings_updated_at
  BEFORE UPDATE ON user_avatar_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_avatar_settings_updated_at();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user_avatar()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_avatar_settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created_avatar
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user_avatar();