import { useState, useEffect } from 'react'
import { useAuth } from './use-auth'
import { filterVocabularyByUserLevel, VocabularyWord } from '@/lib/services/vocabulary'

export function useVocabulary(words: string[]) {
  const { user } = useAuth()
  const [vocabularyWords, setVocabularyWords] = useState<VocabularyWord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadVocabulary() {
      if (!user || !words.length) {
        setVocabularyWords([])
        setLoading(false)
        return
      }

      try {
        const filteredWords = await filterVocabularyByUserLevel(words, user.id)
        setVocabularyWords(filteredWords)
      } catch (error) {
        console.error('Error loading vocabulary:', error)
      } finally {
        setLoading(false)
      }
    }

    loadVocabulary()
  }, [user, words])

  return { vocabularyWords, loading }
}