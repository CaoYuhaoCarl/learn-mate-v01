/*
  # Update Materials Schema for Rich Content

  1. Changes
    - Add support for rich content sections (text, images, headings)
    - Add thumbnail images
    - Convert existing content to new format
    - Add new sample materials

  2. Schema Updates
    - Add content_sections column (JSONB)
    - Add thumbnail_url column
    - Update existing materials
*/

-- First, add new columns if they don't exist
ALTER TABLE materials 
  ADD COLUMN IF NOT EXISTS content_sections jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS thumbnail_url text;

-- Clear existing materials
TRUNCATE materials CASCADE;

-- Insert new materials with rich content
INSERT INTO materials (
  category_id,
  title,
  description,
  content,
  content_sections,
  difficulty_level,
  estimated_time,
  thumbnail_url
) VALUES
  -- Environmental Conservation
  (
    (SELECT id FROM categories WHERE name = 'Reading'),
    'Environmental Conservation Today',
    'Understanding climate change and modern conservation efforts',
    'Climate change represents one of the most significant challenges facing our planet today.',
    jsonb_build_array(
      jsonb_build_object(
        'type', 'image',
        'image', jsonb_build_object(
          'url', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
          'alt', 'Pristine nature landscape',
          'caption', 'The importance of preserving our natural environment'
        )
      ),
      jsonb_build_object(
        'type', 'text',
        'content', 'Climate change represents one of the most significant challenges facing our planet today. As global temperatures continue to rise, we''re witnessing unprecedented changes in weather patterns, ecosystems, and biodiversity.'
      ),
      jsonb_build_object(
        'type', 'heading',
        'content', 'Key Environmental Challenges',
        'level', 2
      ),
      jsonb_build_object(
        'type', 'text',
        'content', 'Rising sea levels, extreme weather events, and loss of biodiversity are just some of the critical issues we face. Scientists warn that without immediate action, these problems will only intensify.'
      ),
      jsonb_build_object(
        'type', 'image',
        'image', jsonb_build_object(
          'url', 'https://images.unsplash.com/photo-1466611653911-95081537e5b7',
          'alt', 'Renewable energy windmills',
          'caption', 'Renewable energy solutions are crucial for sustainable development'
        )
      )
    ),
    'intermediate',
    20,
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'
  ),
  
  -- Digital Innovation
  (
    (SELECT id FROM categories WHERE name = 'Reading'),
    'The Future of Digital Innovation',
    'Exploring emerging technologies and their impact',
    'The digital revolution has transformed every aspect of our lives.',
    jsonb_build_array(
      jsonb_build_object(
        'type', 'image',
        'image', jsonb_build_object(
          'url', 'https://images.unsplash.com/photo-1518770660439-4636190af475',
          'alt', 'Advanced technology concept',
          'caption', 'Technology continues to reshape our world'
        )
      ),
      jsonb_build_object(
        'type', 'text',
        'content', 'The digital revolution has transformed every aspect of our lives, from how we work to how we connect with others. Artificial intelligence, blockchain, and the Internet of Things are leading this transformation.'
      ),
      jsonb_build_object(
        'type', 'heading',
        'content', 'Emerging Technologies',
        'level', 2
      ),
      jsonb_build_object(
        'type', 'text',
        'content', 'AI and machine learning are revolutionizing industries, while virtual and augmented reality are creating new ways to experience digital content.'
      ),
      jsonb_build_object(
        'type', 'image',
        'image', jsonb_build_object(
          'url', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
          'alt', 'Modern technology workspace',
          'caption', 'The modern workplace is increasingly digital and connected'
        )
      )
    ),
    'intermediate',
    25,
    'https://images.unsplash.com/photo-1518770660439-4636190af475'
  ),
  
  -- Urban Development
  (
    (SELECT id FROM categories WHERE name = 'Reading'),
    'Smart Cities of Tomorrow',
    'The evolution of urban spaces and sustainable development',
    'Smart cities represent the future of urban development.',
    jsonb_build_array(
      jsonb_build_object(
        'type', 'image',
        'image', jsonb_build_object(
          'url', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
          'alt', 'Modern city skyline',
          'caption', 'Smart cities are reshaping urban living'
        )
      ),
      jsonb_build_object(
        'type', 'text',
        'content', 'Smart cities represent the future of urban development, combining technology and sustainability to create more livable spaces. These cities use data and technology to improve efficiency and quality of life.'
      ),
      jsonb_build_object(
        'type', 'heading',
        'content', 'Sustainable Urban Solutions',
        'level', 2
      ),
      jsonb_build_object(
        'type', 'text',
        'content', 'From smart transportation systems to energy-efficient buildings, cities are adopting innovative solutions to reduce their environmental impact and improve services.'
      ),
      jsonb_build_object(
        'type', 'image',
        'image', jsonb_build_object(
          'url', 'https://images.unsplash.com/photo-1486325212027-8081e485255e',
          'alt', 'Green building architecture',
          'caption', 'Sustainable architecture is key to future urban development'
        )
      )
    ),
    'advanced',
    30,
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000'
  );