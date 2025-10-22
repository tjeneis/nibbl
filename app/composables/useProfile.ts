import type { Database, Tables } from '~/types/database.types'
import { AuthenticationError, CustomError } from '~/types/errors'

type UserProfile = Tables<'user_profiles'>

export const useProfile = () => {
  const client = useSupabaseClient<Database>()
  const user = useSupabaseUser()
  const { handleApiError } = useErrorHandler()

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
        throw handleApiError(error, {
          component: 'useProfile',
          action: 'getProfile'
        })
      }
      
      return data as UserProfile
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw handleApiError(error, {
        component: 'useProfile',
        action: 'getProfile'
      })
    }
  }

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
        throw handleApiError(error, {
          component: 'useProfile',
          action: 'updateProfile'
        })
      }
      
      return profile as UserProfile
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw handleApiError(error, {
        component: 'useProfile',
        action: 'updateProfile'
      })
    }
  }

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
        throw handleApiError(error, {
          component: 'useProfile',
          action: 'createProfile'
        })
      }
      
      return profile as UserProfile
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw handleApiError(error, {
        component: 'useProfile',
        action: 'createProfile'
      })
    }
  }

  return {
    getProfile,
    updateProfile,
    createProfile
  }
} 