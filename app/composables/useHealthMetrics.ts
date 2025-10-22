import type { Gender } from "~/types/common"

/**
 * Composable for health metrics calculations and status evaluations
 * Provides functions to calculate BMI, body fat, muscle mass, and other health indicators
 * with appropriate status labels and color coding for UI display
 */
export const useHealthMetrics = () => {
  const { t } = useI18n()

  /**
   * Get BMI status label based on BMI value
   * @param bmi - Body Mass Index value
   * @returns Localized status string (underweight, normal, overweight, obese)
   */
  const getBmiStatus = (bmi: number): string => {
    switch (true) {
      case bmi < 18.5:
        return t('healthMetrics.underweight')
      case bmi < 25:
        return t('healthMetrics.normalWeight')
      case bmi < 30:
        return t('healthMetrics.overweight')
      default:
        return t('healthMetrics.obese')
    }
  }

  /**
   * Get BMI color for UI display based on BMI value
   * @param bmi - Body Mass Index value
   * @returns Vuetify color name (warning, success, error)
   */
  const getBmiColor = (bmi: number): string => {
    switch (true) {
      case bmi < 18.5:
        return 'warning'
      case bmi < 25:
        return 'success'
      case bmi < 30:
        return 'warning'
      default:
        return 'error'
    }
  }

  /**
   * Get body fat status label based on percentage and gender
   * @param fatPercentage - Body fat percentage
   * @param gender - User's gender (affects thresholds)
   * @returns Localized status string (essential, athletic, fitness, average, high)
   */
  const getBodyFatStatus = (fatPercentage: number, gender: Gender): string => {
    const thresholds = gender === 'male' 
      ? { essential: 6, athletic: 14, fitness: 18, average: 25 }
      : { essential: 14, athletic: 21, fitness: 25, average: 32 }

    switch (true) {
      case fatPercentage < thresholds.essential:
        return t('healthMetrics.essential')
      case fatPercentage < thresholds.athletic:
        return t('healthMetrics.athletic')
      case fatPercentage < thresholds.fitness:
        return t('healthMetrics.fitness')
      case fatPercentage < thresholds.average:
        return t('healthMetrics.average')
      default:
        return t('healthMetrics.high')
    }
  }

  /**
   * Get body fat color for UI display based on percentage and gender
   * @param fatPercentage - Body fat percentage
   * @param gender - User's gender (affects thresholds)
   * @returns Vuetify color name (warning, success, info, error)
   */
  const getBodyFatColor = (fatPercentage: number, gender: Gender): string => {
    const thresholds = gender === 'male' 
      ? { essential: 6, athletic: 14, fitness: 18, average: 25 }
      : { essential: 14, athletic: 21, fitness: 25, average: 32 }

    switch (true) {
      case fatPercentage < thresholds.essential:
        return 'warning'
      case fatPercentage < thresholds.athletic:
        return 'success'
      case fatPercentage < thresholds.fitness:
        return 'info'
      case fatPercentage < thresholds.average:
        return 'warning'
      default:
        return 'error'
    }
  }

  /**
   * Get muscle mass status label based on mass and gender
   * @param muscleMass - Muscle mass in kg
   * @param gender - User's gender (affects thresholds)
   * @returns Localized status string (low, below average, average, above average, high)
   */
  const getMuscleMassStatus = (muscleMass: number, gender: Gender): string => {
    const thresholds = gender === 'male' 
      ? { low: 30, belowAverage: 35, average: 40, aboveAverage: 45 }
      : { low: 25, belowAverage: 30, average: 35, aboveAverage: 40 }

    switch (true) {
      case muscleMass < thresholds.low:
        return t('healthMetrics.low')
      case muscleMass < thresholds.belowAverage:
        return t('healthMetrics.belowAverage')
      case muscleMass < thresholds.average:
        return t('healthMetrics.average')
      case muscleMass < thresholds.aboveAverage:
        return t('healthMetrics.aboveAverage')
      default:
        return t('healthMetrics.high')
    }
  }

  /**
   * Get muscle mass color for UI display based on mass and gender
   * @param muscleMass - Muscle mass in kg
   * @param gender - User's gender (affects thresholds)
   * @returns Vuetify color name (error, warning, info, success)
   */
  const getMuscleMassColor = (muscleMass: number, gender: Gender): string => {
    const thresholds = gender === 'male' 
      ? { low: 30, belowAverage: 35, average: 40, aboveAverage: 45 }
      : { low: 25, belowAverage: 30, average: 35, aboveAverage: 40 }

    switch (true) {
      case muscleMass < thresholds.low:
        return 'error'
      case muscleMass < thresholds.belowAverage:
        return 'warning'
      case muscleMass < thresholds.average:
        return 'info'
      case muscleMass < thresholds.aboveAverage:
        return 'success'
      default:
        return 'success'
    }
  }

  /**
   * Get body water status label based on percentage and gender
   * @param waterPercentage - Body water percentage
   * @param gender - User's gender (affects thresholds)
   * @returns Localized status string (low, below average, normal, high)
   */
  const getBodyWaterStatus = (waterPercentage: number, gender: Gender): string => {
    const thresholds = gender === 'male' 
      ? { low: 50, belowAverage: 55, normal: 65 }
      : { low: 45, belowAverage: 50, normal: 60 }

    switch (true) {
      case waterPercentage < thresholds.low:
        return t('healthMetrics.low')
      case waterPercentage < thresholds.belowAverage:
        return t('healthMetrics.belowAverage')
      case waterPercentage < thresholds.normal:
        return t('healthMetrics.normal')
      default:
        return t('healthMetrics.high')
    }
  }

  /**
   * Get body water color for UI display based on percentage and gender
   * @param waterPercentage - Body water percentage
   * @param gender - User's gender (affects thresholds)
   * @returns Vuetify color name (error, warning, success, info)
   */
  const getBodyWaterColor = (waterPercentage: number, gender: Gender): string => {
    const thresholds = gender === 'male' 
      ? { low: 50, belowAverage: 55, normal: 65 }
      : { low: 45, belowAverage: 50, normal: 60 }

    switch (true) {
      case waterPercentage < thresholds.low:
        return 'error'
      case waterPercentage < thresholds.belowAverage:
        return 'warning'
      case waterPercentage < thresholds.normal:
        return 'success'
      default:
        return 'info'
    }
  }

  /**
   * Get physique level status label based on level (1-9 scale)
   * @param level - Physique level (1-9 scale)
   * @returns Localized status string (very low, low, average, good, very good, excellent)
   */
  const getPhysiqueLevelStatus = (level: number): string => {
    switch (true) {
      case level < 1:
        return t('healthMetrics.veryLow')
      case level < 2:
        return t('healthMetrics.low')
      case level < 3:
        return t('healthMetrics.average')
      case level < 4:
        return t('healthMetrics.good')
      case level < 5:
        return t('healthMetrics.veryGood')
      default:
        return t('healthMetrics.excellent')
    }
  }

  /**
   * Get physique level color for UI display based on level
   * @param level - Physique level (1-9 scale)
   * @returns Vuetify color name (error, warning, info, success)
   */
  const getPhysiqueLevelColor = (level: number): string => {
    switch (true) {
      case level < 1:
        return 'error'
      case level < 2:
        return 'warning'
      case level < 3:
        return 'info'
      case level < 4:
        return 'success'
      case level < 5:
        return 'success'
      default:
        return 'success'
    }
  }

  /**
   * Get visceral fat status label based on level
   * @param level - Visceral fat level
   * @returns Localized status string (healthy, moderate, high, very high)
   */
  const getVisceralFatStatus = (level: number): string => {
    switch (true) {
      case level < 5:
        return t('healthMetrics.healthy')
      case level < 10:
        return t('healthMetrics.moderate')
      case level < 15:
        return t('healthMetrics.high')
      default:
        return t('healthMetrics.veryHigh')
    }
  }

  /**
   * Get visceral fat color for UI display based on level
   * @param level - Visceral fat level
   * @returns Vuetify color name (success, info, warning, error)
   */
  const getVisceralFatColor = (level: number): string => {
    switch (true) {
      case level < 5:
        return 'success'
      case level < 10:
        return 'info'
      case level < 15:
        return 'warning'
      default:
        return 'error'
    }
  }

  /**
   * Get metabolic age status compared to chronological age
   * @param age - Metabolic age
   * @param chronologicalAge - Actual chronological age
   * @returns Formatted difference string (e.g., "+2", "-3", "at age")
   */
  const getMetabolicAgeStatus = (age: number, chronologicalAge: number): string => {
    const diff = age - chronologicalAge
    if (Math.abs(diff) < 1) return t('healthMetrics.atAge')
    return diff > 0 ? `+${diff.toFixed(0)}` : `${diff.toFixed(0)}`
  }

  /**
   * Get metabolic age color for UI display based on difference from chronological age
   * @param age - Metabolic age
   * @param chronologicalAge - Actual chronological age
   * @returns Vuetify color name (success, info, warning, error)
   */
  const getMetabolicAgeColor = (age: number, chronologicalAge: number): string => {
    const diff = age - chronologicalAge
    switch (true) {
      case diff < -5:
        return 'success'
      case diff < 0:
        return 'info'
      case diff < 5:
        return 'warning'
      case diff < 10:
        return 'warning'
      default:
        return 'error'
    }
  }

  /**
   * Get weight status compared to goal weight
   * @param currentWeight - Current weight in kg
   * @param goalWeight - Goal weight in kg
   * @returns Formatted difference string (e.g., "+2.5", "-1.0", "at goal")
   */
  const getWeightStatus = (currentWeight: number, goalWeight: number): string => {
    const diff = currentWeight - goalWeight
    if (Math.abs(diff) < 0.5) return t('healthMetrics.atGoal')
    return diff > 0 ? `+${diff.toFixed(1)}` : `${diff.toFixed(1)}`
  }

  /**
   * Get weight color for UI display based on difference from goal weight
   * @param currentWeight - Current weight in kg
   * @param goalWeight - Goal weight in kg
   * @returns Vuetify color name (success, error)
   */
  const getWeightColor = (currentWeight: number, goalWeight: number): string => {
    const diff = currentWeight - goalWeight
    if (Math.abs(diff) < 0.5) return 'success'
    return diff > 0 ? 'error' : 'success'
  }

  return {
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
  }
}