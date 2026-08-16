import { describe, it, expect } from 'vitest'
import { createEntryFormData } from '../../app/utils/entry'

const lastEntry = {
  id: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  user_id: '11111111-2222-3333-4444-555555555555',
  created_at: '2024-06-14T08:00:00.000Z',
  updated_at: '2024-06-14T08:00:00.000Z',
  date: '2024-06-14',
  weight: 82.4,
  fat_percentage: 21.3,
  visceral_level: 8,
  muscle_mass: 59.7,
  physique_level: 5,
  bone_mass: 3.2,
  kcal_intake: 2150,
  metabolic_age: 34,
  body_water_percentage: 55.1
}

const today = () => new Date().toISOString().split('T')[0]

describe('createEntryFormData', () => {
  it('should default all measurements to 0 when there is no previous entry', () => {
    expect(createEntryFormData()).toEqual({
      date: today(),
      weight: 0,
      fat_percentage: 0,
      visceral_level: 0,
      muscle_mass: 0,
      physique_level: 0,
      bone_mass: 0,
      kcal_intake: 0,
      metabolic_age: 0,
      body_water_percentage: 0
    })
  })

  it('should treat a null previous entry the same as no previous entry', () => {
    expect(createEntryFormData(null)).toEqual(createEntryFormData())
  })

  it('should prefill every measurement with the values of the last entry', () => {
    const formData = createEntryFormData(lastEntry)

    expect(formData).toEqual({
      date: today(),
      weight: 82.4,
      fat_percentage: 21.3,
      visceral_level: 8,
      muscle_mass: 59.7,
      physique_level: 5,
      bone_mass: 3.2,
      kcal_intake: 2150,
      metabolic_age: 34,
      body_water_percentage: 55.1
    })
  })

  it("should use today's date instead of the date of the last entry", () => {
    expect(createEntryFormData(lastEntry).date).toBe(today())
    expect(createEntryFormData(lastEntry).date).not.toBe(lastEntry.date)
  })

  it('should not copy the identifiers or timestamps of the last entry', () => {
    const formData = createEntryFormData(lastEntry)

    expect(formData).not.toHaveProperty('id')
    expect(formData).not.toHaveProperty('user_id')
    expect(formData).not.toHaveProperty('created_at')
    expect(formData).not.toHaveProperty('updated_at')
  })

  it('should return a new object so edits do not leak into the last entry', () => {
    const formData = createEntryFormData(lastEntry)
    formData.weight = 80

    expect(lastEntry.weight).toBe(82.4)
    expect(createEntryFormData(lastEntry).weight).toBe(82.4)
  })
})
