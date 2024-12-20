-- Add support for material images
ALTER TABLE materials 
  ADD COLUMN IF NOT EXISTS thumbnail_url text,
  ADD COLUMN IF NOT EXISTS content_sections jsonb DEFAULT '[]'::jsonb;

-- Update existing materials with new content format
UPDATE materials
SET content_sections = (
  SELECT jsonb_agg(
    CASE 
      WHEN ordinality = 1 THEN 
        jsonb_build_object(
          'type', 'text',
          'content', paragraph,
          'image', jsonb_build_object(
            'url', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353',
            'alt', 'Learning environment',
            'caption', 'Modern learning tools and methods'
          )
        )
      ELSE 
        jsonb_build_object(
          'type', 'text',
          'content', paragraph
        )
    END
  )
  FROM unnest(string_to_array(content, E'\n\n')) WITH ORDINALITY AS t(paragraph, ordinality)
)
WHERE content_sections = '[]'::jsonb;