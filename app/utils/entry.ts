import type { Tables, TablesInsert } from '~/types/database.types'

type WeightEntry = Tables<'weight_entries'>

export type WeightFormData = Omit<TablesInsert<'weight_entries'>, 'user_id' | 'id' | 'created_at' | 'updated_at'>

/**
 * Build the initial form data for a new weight entry
 * Measurements are prefilled with the values of the last entry so that only the
 * changed numbers have to be typed. The date always defaults to today.
 * @param lastEntry - The most recent weight entry, if any
 * @returns Form data for a new weight entry
 * @example
 * createEntryFormData() // all measurements default to 0
 * createEntryFormData(lastEntry) // measurements copied from lastEntry, date is today
 */
export const createEntryFormData = (lastEntry?: WeightEntry | null): WeightFormData => ({
  date: new Date().toISOString().split('T')[0] || '',
  weight: lastEntry?.weight ?? 0,
  fat_percentage: lastEntry?.fat_percentage ?? 0,
  visceral_level: lastEntry?.visceral_level ?? 0,
  muscle_mass: lastEntry?.muscle_mass ?? 0,
  physique_level: lastEntry?.physique_level ?? 0,
  bone_mass: lastEntry?.bone_mass ?? 0,
  kcal_intake: lastEntry?.kcal_intake ?? 0,
  metabolic_age: lastEntry?.metabolic_age ?? 0,
  body_water_percentage: lastEntry?.body_water_percentage ?? 0
})
