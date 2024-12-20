-- Create trigger for new user practice settings
CREATE OR REPLACE FUNCTION handle_new_user_practice_settings()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_practice_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created_practice_settings ON auth.users;
CREATE TRIGGER on_auth_user_created_practice_settings
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user_practice_settings();