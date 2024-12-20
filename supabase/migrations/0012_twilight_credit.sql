/*
  # Update Material Content Structure

  1. Changes
    - Updates existing materials with proper content sections
    - Adds images and structured content
    - Improves content organization

  2. Content Structure
    - Adds proper headings
    - Includes relevant images
    - Organizes content into logical sections
*/

-- Update Environmental Conservation material
UPDATE materials
SET content_sections = jsonb_build_array(
  jsonb_build_object(
    'type', 'image',
    'image', jsonb_build_object(
      'url', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
      'alt', 'Beautiful natural landscape',
      'caption', 'Our planet''s ecosystems need protection'
    )
  ),
  jsonb_build_object(
    'type', 'heading',
    'content', 'Understanding Climate Change',
    'level', 1
  ),
  jsonb_build_object(
    'type', 'text',
    'content', 'Climate change represents one of the most significant challenges facing our planet today. As global temperatures continue to rise, we''re witnessing unprecedented changes in weather patterns, ecosystems, and biodiversity.'
  ),
  jsonb_build_object(
    'type', 'image',
    'image', jsonb_build_object(
      'url', 'https://images.unsplash.com/photo-1466611653911-95081537e5b7',
      'alt', 'Renewable energy solutions',
      'caption', 'Renewable energy is crucial for a sustainable future'
    )
  ),
  jsonb_build_object(
    'type', 'heading',
    'content', 'Key Environmental Challenges',
    'level', 2
  ),
  jsonb_build_object(
    'type', 'list',
    'items', jsonb_build_array(
      jsonb_build_object(
        'content', 'Rising global temperatures',
        'type', 'example'
      ),
      jsonb_build_object(
        'content', 'Loss of biodiversity',
        'type', 'example'
      ),
      jsonb_build_object(
        'content', 'Ocean acidification',
        'type', 'example'
      )
    )
  ),
  jsonb_build_object(
    'type', 'heading',
    'content', 'Vocabulary',
    'level', 2
  ),
  jsonb_build_object(
    'type', 'list',
    'items', jsonb_build_array(
      jsonb_build_object(
        'content', 'Sustainability',
        'definition', 'The ability to maintain something at a certain level without depleting resources',
        'type', 'vocabulary'
      ),
      jsonb_build_object(
        'content', 'Biodiversity',
        'definition', 'The variety of life in a particular habitat or ecosystem',
        'type', 'vocabulary'
      ),
      jsonb_build_object(
        'content', 'Conservation',
        'definition', 'The protection of plants, animals, and natural resources',
        'type', 'vocabulary'
      )
    )
  )
)
WHERE title LIKE 'Environmental%';

-- Update Digital Innovation material
UPDATE materials
SET content_sections = jsonb_build_array(
  jsonb_build_object(
    'type', 'image',
    'image', jsonb_build_object(
      'url', 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      'alt', 'Modern technology concept',
      'caption', 'Digital innovation is reshaping our world'
    )
  ),
  jsonb_build_object(
    'type', 'heading',
    'content', 'The Digital Revolution',
    'level', 1
  ),
  jsonb_build_object(
    'type', 'text',
    'content', 'The digital revolution has transformed every aspect of our lives, from how we work to how we connect with others. Artificial intelligence, blockchain, and the Internet of Things are leading this transformation.'
  ),
  jsonb_build_object(
    'type', 'image',
    'image', jsonb_build_object(
      'url', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      'alt', 'Technology workspace',
      'caption', 'Modern workspaces are increasingly digital'
    )
  ),
  jsonb_build_object(
    'type', 'heading',
    'content', 'Key Technologies',
    'level', 2
  ),
  jsonb_build_object(
    'type', 'list',
    'items', jsonb_build_array(
      jsonb_build_object(
        'content', 'Artificial Intelligence',
        'type', 'example'
      ),
      jsonb_build_object(
        'content', 'Blockchain',
        'type', 'example'
      ),
      jsonb_build_object(
        'content', 'Internet of Things',
        'type', 'example'
      )
    )
  )
)
WHERE title LIKE 'The Future%';