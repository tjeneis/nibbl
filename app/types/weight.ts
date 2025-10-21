export interface WeightEntry {
  id: string
  user_id: string
  date: string
  weight: number
  fat_percentage: number
  visceral_level: number
  muscle_mass: number
  physique_level: number
  bone_mass: number
  kcal_intake: number
  metabolic_age: number
  body_water_percentage: number
  created_at: string
  updated_at: string
}

export interface WeightFormData {
  date: string
  weight: number | undefined
  fat_percentage: number | undefined
  visceral_level: number | undefined
  muscle_mass: number | undefined
  physique_level: number | undefined
  bone_mass: number | undefined
  kcal_intake: number | undefined
  metabolic_age: number | undefined
  body_water_percentage: number | undefined
}

export interface WeightInsertData extends WeightFormData {
  user_id: string
}