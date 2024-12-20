import { useState, useCallback, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './use-auth'

export type NotebookItemType = 'vocabulary' | 'sentence' | 'grammar'

export interface NotebookItem {
  id: string
  content: string
  type: NotebookItemType
  sourceId: string
  notes?: string
  createdAt: string
  practiceCount: number
  practiceEnabled: boolean
  context?: string
}

export function useNotebook() {
  const { user } = useAuth()
  const [items, setItems] = useState<NotebookItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchItems = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      setError(null)
      setLoading(true)
      
      const { data, error: fetchError } = await supabase
        .from('notebook_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (fetchError) {
        throw supabase.handleError(fetchError)
      }

      setItems(data?.map(item => ({
        id: item.id,
        content: item.content,
        type: item.type,
        sourceId: item.source_id,
        notes: item.notes,
        createdAt: item.created_at,
        practiceCount: item.practice_count,
        practiceEnabled: item.practice_enabled,
        context: item.context
      })) || [])
    } catch (error) {
      console.error('Error fetching notebook items:', error)
      setError(error as Error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [user])

  const addItem = useCallback(async (
    content: string,
    type: NotebookItemType,
    sourceId: string,
    context?: string
  ) => {
    if (!user) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('notebook_items')
        .insert({
          user_id: user.id,
          content,
          type,
          source_id: sourceId,
          context,
          practice_enabled: true
        })

      if (error) throw supabase.handleError(error)
      await fetchItems()
    } catch (error) {
      console.error('Error adding notebook item:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [user, fetchItems])

  const removeItem = useCallback(async (id: string) => {
    if (!user) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('notebook_items')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw supabase.handleError(error)
      await fetchItems()
    } catch (error) {
      console.error('Error removing notebook item:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [user, fetchItems])

  const updateNotes = useCallback(async (id: string, notes: string) => {
    if (!user) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('notebook_items')
        .update({ notes })
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw supabase.handleError(error)
      await fetchItems()
    } catch (error) {
      console.error('Error updating notes:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [user, fetchItems])

  const togglePractice = useCallback(async (id: string, enabled: boolean) => {
    if (!user) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('notebook_items')
        .update({ practice_enabled: enabled })
        .eq('id', id)
        .eq('user_id', user.id)

      if (error) throw supabase.handleError(error)
      await fetchItems()
    } catch (error) {
      console.error('Error toggling practice:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [user, fetchItems])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return {
    items,
    loading,
    error,
    addItem,
    removeItem,
    updateNotes,
    togglePractice,
    fetchItems,
    retry: fetchItems
  }
}