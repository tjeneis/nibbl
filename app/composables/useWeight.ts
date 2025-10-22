import type { WeightEntry, WeightFormData } from '~/types/weight'

export const useWeight = () => {
  const client = useSupabaseClient<any>()
  const user = useSupabaseUser()

  const addWeightEntry = async (data: WeightFormData) => {
    if (!user.value) throw new Error('User not authenticated')

    const { error } = await client
      .from('weight_entries')
      .insert({
        ...data,
        user_id: user.value.sub
      })

    if (error) throw error
  }

  const getWeightEntries = async () => {
    if (!user.value) throw new Error('User not authenticated')

    const { data, error } = await client
      .from('weight_entries')
      .select('*')
      .eq('user_id', user.value.sub)
      .order('date', { ascending: true })

    if (error) throw error
    return data as WeightEntry[]
  }

  const updateWeightEntry = async (id: string, data: Partial<WeightFormData>) => {
    if (!user.value) throw new Error('User not authenticated')

    const { data: entry, error } = await client
      .from('weight_entries')
      .update(data)
      .eq('id', id)
      .eq('user_id', user.value.sub)
      .select()
      .single()

    if (error) throw error
    return entry as WeightEntry
  }

  const deleteWeightEntry = async (id: string) => {
    if (!user.value) throw new Error('User not authenticated')

    const { error } = await client
      .from('weight_entries')
      .delete()
      .eq('id', id)
      .eq('user_id', user.value.sub)

    if (error) throw error
  }

  return {
    addWeightEntry,
    getWeightEntries,
    updateWeightEntry,
    deleteWeightEntry
  }
} 