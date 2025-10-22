import type { Database, Tables, TablesInsert } from '~/types/database.types'
import { AuthenticationError, CustomError } from '~/types/errors'

type WeightEntry = Tables<'weight_entries'>
type WeightFormData = Omit<TablesInsert<'weight_entries'>, 'user_id' | 'id' | 'created_at' | 'updated_at'>

/**
 * Composable for weight entry management
 * Provides CRUD operations for weight tracking data including authentication checks
 * and error handling for Supabase operations
 */
export const useWeight = () => {
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  /**
   * Add a new weight entry for the current user
   * @param data - Weight entry data (excluding user_id, id, timestamps)
   * @throws {AuthenticationError} When user is not authenticated
   * @returns Promise<void>
   */
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
        throw error
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieve all weight entries for the current user
   * @throws {AuthenticationError} When user is not authenticated
   * @returns Promise<WeightEntry[]> Array of weight entries ordered by date
   */
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
        throw error
      }
      
      return data as WeightEntry[]
    } catch (error) {
      throw error
    }
  }

  /**
   * Update an existing weight entry
   * @param id - The ID of the weight entry to update
   * @param data - Partial weight entry data to update
   * @throws {AuthenticationError} When user is not authenticated
   * @returns Promise<WeightEntry> The updated weight entry
   */
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
        throw error
      }
      
      return entry as WeightEntry
    } catch (error) {
      throw error
    }
  }

  /**
   * Delete a weight entry
   * @param id - The ID of the weight entry to delete
   * @throws {AuthenticationError} When user is not authenticated
   * @returns Promise<void>
   */
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
        throw error
      }
    } catch (error) {
      throw error
    }
  }

  return {
    addWeightEntry,
    getWeightEntries,
    updateWeightEntry,
    deleteWeightEntry
  }
} 