export type Gender = 'male' | 'female' | 'other'

export interface UserProfile {
  id: string
  user_id: string
  height: number
  date_of_birth: string
  gender: Gender
  goal_weight: number
  goal_fat_percentage?: number
  created_at: string
  updated_at: string
} 