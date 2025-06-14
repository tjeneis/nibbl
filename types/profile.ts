export type Gender = 'male' | 'female' | 'other'

export interface UserProfile {
  id: string
  user_id: string
  height: number
  age: number
  gender: Gender
  goal_weight: number
  created_at: string
  updated_at: string
} 