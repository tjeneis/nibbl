export interface WeightEntry {
  id: string
  user_id: string
  date: string
  weight: number
  bmi: number
  fat_percentage: number
  visceral_level: number
  muscle_mass: number
  physique_level: number
  bone_mass: number
  kcal_intake: number
  kj_intake: number
  metabolic_age: number
  body_water_percentage: number
  created_at: string
  updated_at: string
}

export interface WeightFormData {
  date: string
  weight: number
  bmi: number
  fat_percentage: number
  visceral_level: number
  muscle_mass: number
  physique_level: number
  bone_mass: number
  kcal_intake: number
  kj_intake: number
  metabolic_age: number
  body_water_percentage: number
}

export interface WeightInsertData extends WeightFormData {
  user_id: string
}