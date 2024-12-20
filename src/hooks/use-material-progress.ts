import { useCallback } from 'react'
import { useAuth } from './use-auth'
import { checkMaterialProgress, updateMaterialProgress } from '@/lib/services/progress'

export function useMaterialProgress() {
  const { user } = useAuth()

  const checkProgress = useCallback(async (materialId: string) => {
    if (!user) return false
    return await checkMaterialProgress(user.id, materialId)
  }, [user])

  const updateProgress = useCallback(async (materialId: string, completed: boolean) => {
    if (!user) return
    await updateMaterialProgress(user.id, materialId, completed)
  }, [user])

  return {
    checkProgress,
    updateProgress
  }
}