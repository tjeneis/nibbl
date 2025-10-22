import { describe, it, expect, vi } from 'vitest'
import type { Gender } from '../../app/types/common'

// Mock i18n to return the key itself (simpler approach)
const mockT = vi.fn((key: string) => key)

// Mock the useI18n function globally
global.useI18n = vi.fn(() => ({ t: mockT }))

// Import the composable after mocking
import { useHealthMetrics } from '../../app/composables/useHealthMetrics'

describe('useHealthMetrics', () => {
  const { 
    getBmiStatus, 
    getBmiColor, 
    getBodyFatStatus, 
    getBodyFatColor,
    getMuscleMassStatus,
    getMuscleMassColor,
    getBodyWaterStatus,
    getBodyWaterColor,
    getPhysiqueLevelStatus,
    getPhysiqueLevelColor,
    getVisceralFatStatus,
    getVisceralFatColor,
    getMetabolicAgeStatus,
    getMetabolicAgeColor,
    getWeightStatus,
    getWeightColor
  } = useHealthMetrics()

  describe('BMI Calculations', () => {
    describe('getBmiStatus', () => {
      it('should return correct BMI status for underweight', () => {
        expect(getBmiStatus(18.0)).toBe('healthMetrics.underweight')
        expect(getBmiStatus(15.5)).toBe('healthMetrics.underweight')
      })

      it('should return correct BMI status for normal weight', () => {
        expect(getBmiStatus(20.0)).toBe('healthMetrics.normalWeight')
        expect(getBmiStatus(24.9)).toBe('healthMetrics.normalWeight')
      })

      it('should return correct BMI status for overweight', () => {
        expect(getBmiStatus(25.0)).toBe('healthMetrics.overweight')
        expect(getBmiStatus(29.9)).toBe('healthMetrics.overweight')
      })

      it('should return correct BMI status for obese', () => {
        expect(getBmiStatus(30.0)).toBe('healthMetrics.obese')
        expect(getBmiStatus(35.0)).toBe('healthMetrics.obese')
      })
    })

    describe('getBmiColor', () => {
      it('should return correct colors for BMI ranges', () => {
        expect(getBmiColor(18.0)).toBe('warning')
        expect(getBmiColor(22.0)).toBe('success')
        expect(getBmiColor(27.0)).toBe('warning')
        expect(getBmiColor(32.0)).toBe('error')
      })
    })
  })

  describe('Body Fat Calculations', () => {
    describe('getBodyFatStatus - Male', () => {
      it('should return correct status for essential fat', () => {
        expect(getBodyFatStatus(5, 'male')).toBe('healthMetrics.essential')
        expect(getBodyFatStatus(3, 'male')).toBe('healthMetrics.essential')
      })

      it('should return correct status for athletic', () => {
        expect(getBodyFatStatus(10, 'male')).toBe('healthMetrics.athletic')
        expect(getBodyFatStatus(13, 'male')).toBe('healthMetrics.athletic')
      })

      it('should return correct status for fitness', () => {
        expect(getBodyFatStatus(15, 'male')).toBe('healthMetrics.fitness')
        expect(getBodyFatStatus(17, 'male')).toBe('healthMetrics.fitness')
      })

      it('should return correct status for average', () => {
        expect(getBodyFatStatus(20, 'male')).toBe('healthMetrics.average')
        expect(getBodyFatStatus(24, 'male')).toBe('healthMetrics.average')
      })

      it('should return correct status for high', () => {
        expect(getBodyFatStatus(30, 'male')).toBe('healthMetrics.high')
        expect(getBodyFatStatus(35, 'male')).toBe('healthMetrics.high')
      })
    })

    describe('getBodyFatStatus - Female', () => {
      it('should return correct status for essential fat', () => {
        expect(getBodyFatStatus(12, 'female')).toBe('healthMetrics.essential')
        expect(getBodyFatStatus(10, 'female')).toBe('healthMetrics.essential')
      })

      it('should return correct status for athletic', () => {
        expect(getBodyFatStatus(18, 'female')).toBe('healthMetrics.athletic')
        expect(getBodyFatStatus(20, 'female')).toBe('healthMetrics.athletic')
      })

      it('should return correct status for fitness', () => {
        expect(getBodyFatStatus(22, 'female')).toBe('healthMetrics.fitness')
        expect(getBodyFatStatus(24, 'female')).toBe('healthMetrics.fitness')
      })

      it('should return correct status for average', () => {
        expect(getBodyFatStatus(28, 'female')).toBe('healthMetrics.average')
        expect(getBodyFatStatus(31, 'female')).toBe('healthMetrics.average')
      })

      it('should return correct status for high', () => {
        expect(getBodyFatStatus(35, 'female')).toBe('healthMetrics.high')
        expect(getBodyFatStatus(40, 'female')).toBe('healthMetrics.high')
      })
    })

    describe('getBodyFatColor', () => {
      it('should return correct colors for male body fat', () => {
        expect(getBodyFatColor(5, 'male')).toBe('warning')
        expect(getBodyFatColor(10, 'male')).toBe('success')
        expect(getBodyFatColor(15, 'male')).toBe('info')
        expect(getBodyFatColor(20, 'male')).toBe('warning')
        expect(getBodyFatColor(30, 'male')).toBe('error')
      })

      it('should return correct colors for female body fat', () => {
        expect(getBodyFatColor(12, 'female')).toBe('warning')
        expect(getBodyFatColor(18, 'female')).toBe('success')
        expect(getBodyFatColor(22, 'female')).toBe('info')
        expect(getBodyFatColor(28, 'female')).toBe('warning')
        expect(getBodyFatColor(35, 'female')).toBe('error')
      })
    })
  })

  describe('Muscle Mass Calculations', () => {
    describe('getMuscleMassStatus - Male', () => {
      it('should return correct status for low muscle mass', () => {
        expect(getMuscleMassStatus(25, 'male')).toBe('healthMetrics.low')
        expect(getMuscleMassStatus(29, 'male')).toBe('healthMetrics.low')
      })

      it('should return correct status for below average', () => {
        expect(getMuscleMassStatus(32, 'male')).toBe('healthMetrics.belowAverage')
        expect(getMuscleMassStatus(34, 'male')).toBe('healthMetrics.belowAverage')
      })

      it('should return correct status for average', () => {
        expect(getMuscleMassStatus(38, 'male')).toBe('healthMetrics.average')
        expect(getMuscleMassStatus(39, 'male')).toBe('healthMetrics.average')
      })

      it('should return correct status for above average', () => {
        expect(getMuscleMassStatus(42, 'male')).toBe('healthMetrics.aboveAverage')
        expect(getMuscleMassStatus(44, 'male')).toBe('healthMetrics.aboveAverage')
      })

      it('should return correct status for high', () => {
        expect(getMuscleMassStatus(50, 'male')).toBe('healthMetrics.high')
        expect(getMuscleMassStatus(55, 'male')).toBe('healthMetrics.high')
      })
    })

    describe('getMuscleMassColor', () => {
      it('should return correct colors for male muscle mass', () => {
        expect(getMuscleMassColor(25, 'male')).toBe('error')
        expect(getMuscleMassColor(32, 'male')).toBe('warning')
        expect(getMuscleMassColor(38, 'male')).toBe('info')
        expect(getMuscleMassColor(42, 'male')).toBe('success')
        expect(getMuscleMassColor(50, 'male')).toBe('success')
      })
    })
  })

  describe('Body Water Calculations', () => {
    describe('getBodyWaterStatus - Male', () => {
      it('should return correct status for low water', () => {
        expect(getBodyWaterStatus(45, 'male')).toBe('healthMetrics.low')
        expect(getBodyWaterStatus(49, 'male')).toBe('healthMetrics.low')
      })

      it('should return correct status for below average', () => {
        expect(getBodyWaterStatus(52, 'male')).toBe('healthMetrics.belowAverage')
        expect(getBodyWaterStatus(54, 'male')).toBe('healthMetrics.belowAverage')
      })

      it('should return correct status for normal', () => {
        expect(getBodyWaterStatus(58, 'male')).toBe('healthMetrics.normal')
        expect(getBodyWaterStatus(64, 'male')).toBe('healthMetrics.normal')
      })

      it('should return correct status for high', () => {
        expect(getBodyWaterStatus(70, 'male')).toBe('healthMetrics.high')
        expect(getBodyWaterStatus(75, 'male')).toBe('healthMetrics.high')
      })
    })

    describe('getBodyWaterColor', () => {
      it('should return correct colors for male body water', () => {
        expect(getBodyWaterColor(45, 'male')).toBe('error')
        expect(getBodyWaterColor(52, 'male')).toBe('warning')
        expect(getBodyWaterColor(58, 'male')).toBe('success')
        expect(getBodyWaterColor(70, 'male')).toBe('info')
      })
    })
  })

  describe('Physique Level Calculations', () => {
    describe('getPhysiqueLevelStatus', () => {
      it('should return correct status for very low', () => {
        expect(getPhysiqueLevelStatus(0.5)).toBe('healthMetrics.veryLow')
        expect(getPhysiqueLevelStatus(0.9)).toBe('healthMetrics.veryLow')
      })

      it('should return correct status for low', () => {
        expect(getPhysiqueLevelStatus(1.2)).toBe('healthMetrics.low')
        expect(getPhysiqueLevelStatus(1.8)).toBe('healthMetrics.low')
      })

      it('should return correct status for average', () => {
        expect(getPhysiqueLevelStatus(2.2)).toBe('healthMetrics.average')
        expect(getPhysiqueLevelStatus(2.8)).toBe('healthMetrics.average')
      })

      it('should return correct status for good', () => {
        expect(getPhysiqueLevelStatus(3.2)).toBe('healthMetrics.good')
        expect(getPhysiqueLevelStatus(3.8)).toBe('healthMetrics.good')
      })

      it('should return correct status for very good', () => {
        expect(getPhysiqueLevelStatus(4.2)).toBe('healthMetrics.veryGood')
        expect(getPhysiqueLevelStatus(4.8)).toBe('healthMetrics.veryGood')
      })

      it('should return correct status for excellent', () => {
        expect(getPhysiqueLevelStatus(5.2)).toBe('healthMetrics.excellent')
        expect(getPhysiqueLevelStatus(6.0)).toBe('healthMetrics.excellent')
      })
    })

    describe('getPhysiqueLevelColor', () => {
      it('should return correct colors for physique levels', () => {
        expect(getPhysiqueLevelColor(0.5)).toBe('error')
        expect(getPhysiqueLevelColor(1.5)).toBe('warning')
        expect(getPhysiqueLevelColor(2.5)).toBe('info')
        expect(getPhysiqueLevelColor(3.5)).toBe('success')
        expect(getPhysiqueLevelColor(4.5)).toBe('success')
        expect(getPhysiqueLevelColor(5.5)).toBe('success')
      })
    })
  })

  describe('Visceral Fat Calculations', () => {
    describe('getVisceralFatStatus', () => {
      it('should return correct status for healthy', () => {
        expect(getVisceralFatStatus(3)).toBe('healthMetrics.healthy')
        expect(getVisceralFatStatus(4)).toBe('healthMetrics.healthy')
      })

      it('should return correct status for moderate', () => {
        expect(getVisceralFatStatus(7)).toBe('healthMetrics.moderate')
        expect(getVisceralFatStatus(9)).toBe('healthMetrics.moderate')
      })

      it('should return correct status for high', () => {
        expect(getVisceralFatStatus(12)).toBe('healthMetrics.high')
        expect(getVisceralFatStatus(14)).toBe('healthMetrics.high')
      })

      it('should return correct status for very high', () => {
        expect(getVisceralFatStatus(18)).toBe('healthMetrics.veryHigh')
        expect(getVisceralFatStatus(25)).toBe('healthMetrics.veryHigh')
      })
    })

    describe('getVisceralFatColor', () => {
      it('should return correct colors for visceral fat levels', () => {
        expect(getVisceralFatColor(3)).toBe('success')
        expect(getVisceralFatColor(7)).toBe('info')
        expect(getVisceralFatColor(12)).toBe('warning')
        expect(getVisceralFatColor(18)).toBe('error')
      })
    })
  })

  describe('Metabolic Age Calculations', () => {
    describe('getMetabolicAgeStatus', () => {
      it('should return "At Age" for same age', () => {
        expect(getMetabolicAgeStatus(30, 30)).toBe('healthMetrics.atAge')
        expect(getMetabolicAgeStatus(25, 25)).toBe('healthMetrics.atAge')
      })

      it('should return positive difference for older metabolic age', () => {
        expect(getMetabolicAgeStatus(35, 30)).toBe('+5')
        expect(getMetabolicAgeStatus(28, 25)).toBe('+3')
      })

      it('should return negative difference for younger metabolic age', () => {
        expect(getMetabolicAgeStatus(25, 30)).toBe('-5')
        expect(getMetabolicAgeStatus(22, 25)).toBe('-3')
      })
    })

    describe('getMetabolicAgeColor', () => {
      it('should return correct colors for metabolic age differences', () => {
        expect(getMetabolicAgeColor(20, 30)).toBe('success') // -10 years
        expect(getMetabolicAgeColor(25, 30)).toBe('info')    // -5 years
        expect(getMetabolicAgeColor(30, 30)).toBe('warning') // same age
        expect(getMetabolicAgeColor(35, 30)).toBe('warning') // +5 years
        expect(getMetabolicAgeColor(40, 30)).toBe('error')   // +10 years
      })
    })
  })

  describe('Weight Goal Calculations', () => {
    describe('getWeightStatus', () => {
      it('should return "At Goal" for same weight', () => {
        expect(getWeightStatus(70, 70)).toBe('healthMetrics.atGoal')
        expect(getWeightStatus(65, 65)).toBe('healthMetrics.atGoal')
      })

      it('should return "At Goal" for very close weight', () => {
        expect(getWeightStatus(70.2, 70)).toBe('healthMetrics.atGoal')
        expect(getWeightStatus(69.8, 70)).toBe('healthMetrics.atGoal')
      })

      it('should return positive difference for overweight', () => {
        expect(getWeightStatus(75, 70)).toBe('+5.0')
        expect(getWeightStatus(72.5, 70)).toBe('+2.5')
      })

      it('should return negative difference for underweight', () => {
        expect(getWeightStatus(65, 70)).toBe('-5.0')
        expect(getWeightStatus(67.5, 70)).toBe('-2.5')
      })
    })

    describe('getWeightColor', () => {
      it('should return correct colors for weight differences', () => {
        expect(getWeightColor(70, 70)).toBe('success')   // at goal
        expect(getWeightColor(70.2, 70)).toBe('success') // very close
        expect(getWeightColor(75, 70)).toBe('error')     // overweight
        expect(getWeightColor(65, 70)).toBe('success')   // underweight (good)
      })
    })
  })
})