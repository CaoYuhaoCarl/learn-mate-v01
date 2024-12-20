import { colors } from './colors'

// Avatar style categories to organize options
const CATEGORIES = {
  PEOPLE: 'People & Characters',
  ANIMALS: 'Animals & Creatures', 
  ABSTRACT: 'Abstract & Fun',
  GAMING: 'Gaming & Pixels'
} as const

export const AVATAR_STYLES = [
  // People & Characters - diverse age groups
  {
    id: 'avataaars',
    name: 'Character',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) => 
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'lorelei',
    name: 'Anime Style',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/lorelei/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'micah',
    name: 'Friendly Face',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'notionists',
    name: 'Professional',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'open-peeps',
    name: 'Casual',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/open-peeps/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'personas',
    name: 'Persona',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/personas/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'pixel-art-neutral',
    name: 'Pixel Person',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}&backgroundColor=transparent&mood=happy`
  },
  {
    id: 'adventurer-neutral',
    name: 'Explorer',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'big-smile',
    name: 'Big Smile',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/big-smile/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'micah-kid',
    name: 'Kid',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/micah/svg?seed=${seed}&backgroundColor=transparent&baseColor=apricot&mouth=laughing&hair=short`
  },
  {
    id: 'avataaars-child',
    name: 'Child',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=transparent&top=shortHair&mouth=smile&eyes=happy`
  },
  {
    id: 'lorelei-kid',
    name: 'Young Anime',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/lorelei/svg?seed=${seed}&backgroundColor=transparent&mouth=happy&eyes=wide`
  },
  {
    id: 'notionists-kid',
    name: 'Young Student',
    category: CATEGORIES.PEOPLE,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=transparent&style=cute`
  },
  
  // Animals & Creatures
  {
    id: 'big-ears',
    name: 'Friendly Pet',
    category: CATEGORIES.ANIMALS,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/big-ears/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'big-ears-neutral',
    name: 'Calm Pet',
    category: CATEGORIES.ANIMALS,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/big-ears-neutral/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'cats',
    name: 'Cat',
    category: CATEGORIES.ANIMALS,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/cats/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'croodles-cat',
    name: 'Doodle Cat',
    category: CATEGORIES.ANIMALS,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/croodles/svg?seed=${seed}&backgroundColor=transparent&type=cat`
  },
  {
    id: 'croodles-dog',
    name: 'Doodle Dog',
    category: CATEGORIES.ANIMALS,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/croodles/svg?seed=${seed}&backgroundColor=transparent&type=dog`
  },
  
  // Gaming avatars
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    category: CATEGORIES.GAMING,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/pixel-art/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'adventurer',
    name: 'Adventurer',
    category: CATEGORIES.GAMING,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'bottts',
    name: 'Robot Friend',
    category: CATEGORIES.GAMING,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&backgroundColor=transparent`
  },
  
  // Abstract options
  {
    id: 'fun-emoji',
    name: 'Fun Emoji',
    category: CATEGORIES.ABSTRACT,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'shapes',
    name: 'Shapes',
    category: CATEGORIES.ABSTRACT,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/shapes/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'thumbs',
    name: 'Thumbs',
    category: CATEGORIES.ABSTRACT,
    preview: (seed: string) =>
      `https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}&backgroundColor=transparent`
  },
  {
    id: 'initials',
    name: 'Initials',
    category: CATEGORIES.ABSTRACT,
    preview: (seed: string) => 
      `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=${colors.matcha[500].replace('#', '')}`
  }
]

// Helper to get avatars by category
export const getAvatarsByCategory = () => {
  return Object.values(CATEGORIES).reduce((acc, category) => {
    acc[category] = AVATAR_STYLES.filter(style => style.category === category)
    return acc
  }, {} as Record<string, typeof AVATAR_STYLES>)
}