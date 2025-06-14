import type { UserProfile } from '~/types/profile'

export const useProfile = () => {
  const client = useSupabaseClient<any>()
  const user = useSupabaseUser()

  const getProfile = async () => {
    if (!user.value) throw new Error('User not authenticated')

    const { data, error } = await client
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.value.id)
      .single()

    if (error) throw error
    return data as UserProfile
  }

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user.value) throw new Error('User not authenticated')

    const { data: profile, error } = await client
      .from('user_profiles')
      .update(data)
      .eq('user_id', user.value.id)
      .select()
      .single()

    if (error) throw error
    return profile as UserProfile
  }

  const createProfile = async (data: Omit<UserProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user.value) throw new Error('User not authenticated')

    const { data: profile, error } = await client
      .from('user_profiles')
      .insert({
        ...data,
        user_id: user.value.id
      })
      .select()
      .single()

    if (error) throw error
    return profile as UserProfile
  }

  return {
    getProfile,
    updateProfile,
    createProfile
  }
} 