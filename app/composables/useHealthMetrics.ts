import type { Gender } from "~/types/profile"

export const useHealthMetrics = () => {
  const { t } = useI18n()

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

  const getMetabolicAgeStatus = (age: number, chronologicalAge: number): string => {
    const diff = age - chronologicalAge
    if (Math.abs(diff) < 1) return t('healthMetrics.atAge')
    return diff > 0 ? `+${diff.toFixed(0)}` : `${diff.toFixed(0)}`
  }

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

  const getWeightStatus = (currentWeight: number, goalWeight: number): string => {
    const diff = currentWeight - goalWeight
    if (Math.abs(diff) < 0.5) return t('healthMetrics.atGoal')
    return diff > 0 ? `+${diff.toFixed(1)}` : `${diff.toFixed(1)}`
  }

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