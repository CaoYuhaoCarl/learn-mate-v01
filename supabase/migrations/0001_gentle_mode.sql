/*
  # Learning Materials Schema

  1. New Tables
    - `categories`
      - Main categories of learning materials (reading, listening, etc.)
    - `materials`
      - Learning materials with content and metadata
    - `user_progress`
      - Tracks user progress through materials

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Materials table
CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES categories(id),
  title text NOT NULL,
  description text,
  content text NOT NULL,
  difficulty_level text NOT NULL CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_time integer, -- in minutes
  created_at timestamptz DEFAULT now()
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  material_id uuid REFERENCES materials(id),
  completed boolean DEFAULT false,
  last_accessed timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, material_id)
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Categories are viewable by authenticated users"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Materials are viewable by authenticated users"
  ON materials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own progress"
  ON user_progress FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert initial categories
INSERT INTO categories (name, description, icon) VALUES
  ('Reading', 'Improve your reading comprehension', 'book-open'),
  ('Listening', 'Enhance your listening skills', 'headphones'),
  ('Speaking', 'Practice speaking English', 'mic'),
  ('Writing', 'Develop your writing abilities', 'pen-tool');

-- Insert sample materials
INSERT INTO materials (category_id, title, description, content, difficulty_level, estimated_time) VALUES
  -- Reading materials
  ((SELECT id FROM categories WHERE name = 'Reading'), 
   'The Digital Age',
   'An article about modern technology',
   'The digital revolution has transformed how we live and work. From smartphones to artificial intelligence, technology continues to reshape our daily experiences. This article explores the impact of digital transformation on society and what the future might hold.

Key Points:
1. The rise of mobile technology
2. Social media''s influence
3. Future trends in digital innovation

Discussion Questions:
- How has technology changed your daily life?
- What do you think about artificial intelligence?
- What future technologies are you most excited about?',
   'intermediate',
   15),

  ((SELECT id FROM categories WHERE name = 'Reading'),
   'Environmental Conservation',
   'Understanding climate change and conservation',
   'Climate change is one of the most pressing issues of our time. This article discusses the causes, effects, and potential solutions to environmental challenges.

Key Concepts:
- Global warming
- Renewable energy
- Conservation efforts

Vocabulary:
- Sustainability
- Carbon footprint
- Ecosystem
- Biodiversity

Questions for Reflection:
1. What actions do you take to protect the environment?
2. How can we promote environmental awareness?
3. What are the main environmental challenges in your country?',
   'intermediate',
   20),

  -- Listening materials
  ((SELECT id FROM categories WHERE name = 'Listening'),
   'Daily Conversations: At the Restaurant',
   'Practice common restaurant dialogues',
   'Listen to these common restaurant conversations and practice ordering food:

Dialogue 1: Making a Reservation
- Customer: "I''d like to make a reservation for tonight."
- Host: "What time would you like to come in?"
- Customer: "Around 7:30 for two people."

Dialogue 2: Ordering Food
- Waiter: "Are you ready to order?"
- Customer: "Yes, I''ll have the chicken salad."
- Waiter: "Would you like any drinks with that?"

Practice Questions:
1. Role-play the dialogues with a partner
2. What other restaurant phrases do you know?
3. Share your restaurant experiences',
   'beginner',
   10),

  -- Speaking materials
  ((SELECT id FROM categories WHERE name = 'Speaking'),
   'Job Interview Practice',
   'Common interview questions and responses',
   'Prepare for job interviews with these common questions and sample answers:

1. Tell me about yourself
- Structure your answer with past, present, and future
- Focus on relevant experiences
- Keep it professional

2. Why do you want this job?
- Research the company
- Match your skills to the role
- Show enthusiasm

Practice Tasks:
- Record yourself answering these questions
- Practice with a friend
- Time your responses (aim for 2-3 minutes per answer)',
   'advanced',
   30),

  -- Writing materials
  ((SELECT id FROM categories WHERE name = 'Writing'),
   'Email Writing Essentials',
   'Learn to write professional emails',
   'Professional Email Writing Guide:

Structure:
1. Subject Line
- Clear and concise
- Relevant to content

2. Greeting
- Dear Mr./Ms. [Last Name]
- Hello [First Name]

3. Body
- Keep paragraphs short
- Use professional language
- Be clear and specific

4. Closing
- Best regards
- Kind regards
- Sincerely

Practice Exercise:
Write emails for these scenarios:
1. Requesting a meeting
2. Following up on an application
3. Thanking someone for their help',
   'intermediate',
   25);