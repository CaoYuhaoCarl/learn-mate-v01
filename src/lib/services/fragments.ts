import { supabase } from '@/lib/supabase'

export async function addKnowledgeFragments(
  userId: string,
  amount: number,
  source: string
): Promise<void> {
  if (!userId || amount <= 0) return

  try {
    // Ensure amount is an integer
    const intAmount = Math.round(amount)
    
    const { error } = await supabase
      .from('knowledge_fragments')
      .insert({
        user_id: userId,
        amount: intAmount,
        source
      })

    if (error) throw error
  } catch (error) {
    console.error('Error adding knowledge fragments:', error)
    // Don't throw - we don't want to break the game flow if fragments fail
    // But we should log for monitoring
  }
}

export async function getTotalFragments(userId: string): Promise<number> {
  if (!userId) return 0
  
  try {
    const { data, error } = await supabase
      .from('user_total_fragments')
      .select('total_fragments')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) throw error
    
    // Ensure we return an integer
    return Math.round(data?.total_fragments || 0)
  } catch (error) {
    console.error('Error getting total fragments:', error)
    return 0 // Return 0 instead of throwing to maintain UI stability
  }
}