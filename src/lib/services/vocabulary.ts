import { supabase } from '@/lib/supabase'
import { VocabularyWord } from '@/lib/types/practice'
import { generateOptions } from '@/lib/utils/battle'

export async function getVocabularyWords(
  limit: number = 10,
  level?: number
): Promise<VocabularyWord[]> {
  try {
    let query = supabase
      .from('vocabulary_words')
      .select('id, word, definition, chinese_translation, level, frequency_rank')
      .order('frequency_rank', { ascending: true })

    if (level) {
      query = query.eq('level', level)
    }

    const { data, error } = await query.limit(limit)

    if (error) throw error

    // Add options to each word
    return (data || []).map(word => ({
      ...word,
      options: generateOptions(
        word.definition,
        data.map(w => w.definition)
      )
    }))
  } catch (error) {
    console.error('Error fetching vocabulary words:', error)
    return []
  }
}