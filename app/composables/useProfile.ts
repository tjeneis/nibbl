import type { Database, Tables } from '~/types/database.types'
import { AuthenticationError, CustomError } from '~/types/errors'

type UserProfile = Tables<'user_profiles'>

/**
 * Composable for user profile management
 * Provides CRUD operations for user profile data including authentication checks
 * and error handling for Supabase operations
 */
export const useProfile = () => {
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()

  /**
   * Retrieve the current user's profile data
   * @throws {AuthenticationError} When user is not authenticated
   * @returns Promise<UserProfile> The user's profile data
   */
  const getProfile = async () => {
    if (!user.value) {
      throw new AuthenticationError('User not authenticated', {
        component: 'useProfile',
        action: 'getProfile'
      })
    }

    try {
      const { data, error } = await client
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.value.sub)
        .single()

      if (error) {
        throw error
      }
      
      return data as UserProfile
    } catch (error) {
      throw error
    }
  }

  /**
   * Update the current user's profile with new data
   * @param data - Partial profile data to update
   * @throws {AuthenticationError} When user is not authenticated
   * @returns Promise<UserProfile> The updated profile data
   */
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user.value) {
      throw new AuthenticationError('User not authenticated', {
        component: 'useProfile',
        action: 'updateProfile'
      })
    }

    try {
      const { data: profile, error } = await client
        .from('user_profiles')
        .update(data)
        .eq('user_id', user.value.sub)
        .select()
        .single()

      if (error) {
        throw error
      }
      
      return profile as UserProfile
    } catch (error) {
      throw error
    }
  }

  /**
   * Create a new user profile
   * @param data - Profile data to create (excluding id, user_id, timestamps)
   * @throws {AuthenticationError} When user is not authenticated
   * @returns Promise<UserProfile> The created profile data
   */
  const createProfile = async (data: Omit<UserProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user.value) {
      throw new AuthenticationError('User not authenticated', {
        component: 'useProfile',
        action: 'createProfile'
      })
    }

    try {
      const { data: profile, error } = await client
        .from('user_profiles')
        .insert({
          ...data,
          user_id: user.value.sub
        })
        .select()
        .single()

      if (error) {
        throw error
      }
      
      return profile as UserProfile
    } catch (error) {
      throw error
    }
  }

  return {
    getProfile,
    updateProfile,
    createProfile
  }
} 