import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './use-auth'
import { getTotalFragments } from '@/lib/services/fragments'

export function useFragments() {
  const { user } = useAuth()
  const [totalFragments, setTotalFragments] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchFragments = useCallback(async () => {
    if (!user) {
      setTotalFragments(null)
      setLoading(false)
      return
    }
    
    try {
      setLoading(true)
      const total = await getTotalFragments(user.id)
      setTotalFragments(total)
    } catch (error) {
      console.error('Error fetching fragments:', error)
      // Don't set to 0 on error to maintain last known value
    } finally {
      setLoading(false)
    }
  }, [user])

  // Fetch fragments initially and set up polling
  useEffect(() => {
    fetchFragments()
    
    // Poll for updates every 3 seconds
    const interval = setInterval(fetchFragments, 3000)
    
    return () => clearInterval(interval)
  }, [fetchFragments])

  return {
    totalFragments: totalFragments ?? 0,
    loading,
    refetch: fetchFragments
  }
}