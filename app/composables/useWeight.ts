import type { WeightEntry, WeightFormData } from '~/types/weight'
import { AuthenticationError, CustomError } from '~/types/errors'

export const useWeight = () => {
  const client = useSupabaseClient<any>()
  const user = useSupabaseUser()
  const { handleApiError } = useErrorHandler()

  const addWeightEntry = async (data: WeightFormData) => {
    if (!user.value) {
      throw new AuthenticationError('User not authenticated', {
        component: 'useWeight',
        action: 'addWeightEntry'
      })
    }

    try {
      const { error } = await client
        .from('weight_entries')
        .insert({
          ...data,
          user_id: user.value.sub
        })

      if (error) {
        throw handleApiError(error, {
          component: 'useWeight',
          action: 'addWeightEntry'
        })
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw handleApiError(error, {
        component: 'useWeight',
        action: 'addWeightEntry'
      })
    }
  }

  const getWeightEntries = async () => {
    if (!user.value) {
      throw new AuthenticationError('User not authenticated', {
        component: 'useWeight',
        action: 'getWeightEntries'
      })
    }

    try {
      const { data, error } = await client
        .from('weight_entries')
        .select('*')
        .eq('user_id', user.value.sub)
        .order('date', { ascending: true })

      if (error) {
        throw handleApiError(error, {
          component: 'useWeight',
          action: 'getWeightEntries'
        })
      }
      
      return data as WeightEntry[]
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw handleApiError(error, {
        component: 'useWeight',
        action: 'getWeightEntries'
      })
    }
  }

  const updateWeightEntry = async (id: string, data: Partial<WeightFormData>) => {
    if (!user.value) {
      throw new AuthenticationError('User not authenticated', {
        component: 'useWeight',
        action: 'updateWeightEntry'
      })
    }

    try {
      const { data: entry, error } = await client
        .from('weight_entries')
        .update(data)
        .eq('id', id)
        .eq('user_id', user.value.sub)
        .select()
        .single()

      if (error) {
        throw handleApiError(error, {
          component: 'useWeight',
          action: 'updateWeightEntry'
        })
      }
      
      return entry as WeightEntry
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw handleApiError(error, {
        component: 'useWeight',
        action: 'updateWeightEntry'
      })
    }
  }

  const deleteWeightEntry = async (id: string) => {
    if (!user.value) {
      throw new AuthenticationError('User not authenticated', {
        component: 'useWeight',
        action: 'deleteWeightEntry'
      })
    }

    try {
      const { error } = await client
        .from('weight_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user.value.sub)

      if (error) {
        throw handleApiError(error, {
          component: 'useWeight',
          action: 'deleteWeightEntry'
        })
      }
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw handleApiError(error, {
        component: 'useWeight',
        action: 'deleteWeightEntry'
      })
    }
  }

  return {
    addWeightEntry,
    getWeightEntries,
    updateWeightEntry,
    deleteWeightEntry
  }
} 