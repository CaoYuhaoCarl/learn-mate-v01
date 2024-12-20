import { supabase } from '@/lib/supabase'

export async function checkMaterialProgress(userId: string, materialId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('completed')
      .eq('user_id', userId)
      .eq('material_id', materialId)
      .maybeSingle()

    if (error) throw error
    return data?.completed ?? false
  } catch (error) {
    console.error('Error checking progress:', error)
    return false
  }
}

export async function updateMaterialProgress(
  userId: string, 
  materialId: string, 
  completed: boolean
): Promise<void> {
  try {
    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        material_id: materialId,
        completed,
        last_accessed: new Date().toISOString()
      })

    if (error) throw error
  } catch (error) {
    console.error('Error updating progress:', error)
    throw error
  }
}