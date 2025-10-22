import { describe, it, expect } from 'vitest'

// Example utility function to test
export function formatWeight(weight: number): string {
  return `${weight.toFixed(1)} kg`
}

export function calculateBMI(weight: number, height: number): number {
  const heightInMeters = height / 100
  return Number((weight / (heightInMeters * heightInMeters)).toFixed(1))
}

export function validateWeightEntry(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!data.weight || data.weight <= 0) {
    errors.push('Weight must be greater than 0')
  }
  
  if (!data.date) {
    errors.push('Date is required')
  }
  
  if (data.fat_percentage && (data.fat_percentage < 0 || data.fat_percentage > 100)) {
    errors.push('Body fat percentage must be between 0 and 100')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

describe('Utility Functions', () => {
  describe('formatWeight', () => {
    it('should format weight correctly', () => {
      expect(formatWeight(70.5)).toBe('70.5 kg')
      expect(formatWeight(65)).toBe('65.0 kg')
      expect(formatWeight(80.123)).toBe('80.1 kg')
    })
  })

  describe('calculateBMI', () => {
    it('should calculate BMI correctly', () => {
      expect(calculateBMI(70, 175)).toBe(22.9)
      expect(calculateBMI(80, 180)).toBe(24.7)
      expect(calculateBMI(60, 165)).toBe(22.0)
    })
  })

  describe('validateWeightEntry', () => {
    it('should validate correct weight entry', () => {
      const validData = {
        weight: 70,
        date: '2024-01-01',
        fat_percentage: 15
      }
      
      const result = validateWeightEntry(validData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should catch validation errors', () => {
      const invalidData = {
        weight: -5,
        date: '',
        fat_percentage: 150
      }
      
      const result = validateWeightEntry(invalidData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Weight must be greater than 0')
      expect(result.errors).toContain('Date is required')
      expect(result.errors).toContain('Body fat percentage must be between 0 and 100')
    })
  })
})
