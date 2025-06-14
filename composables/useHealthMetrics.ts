import type { Gender } from "~/types/profile"

export const useHealthMetrics = () => {
  const getBmiStatus = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight'
    if (bmi < 25) return 'Normal weight'
    if (bmi < 30) return 'Overweight'
    return 'Obese'
  }

  const getBmiColor = (bmi: number): string => {
    if (bmi < 18.5) return 'warning'
    if (bmi < 25) return 'success'
    if (bmi < 30) return 'warning'
    return 'error'
  }

  const getBodyFatStatus = (fatPercentage: number, gender: Gender): string => {
    if (gender === 'male') {
      if (fatPercentage < 6) return 'Essential'
      if (fatPercentage < 14) return 'Athletic'
      if (fatPercentage < 18) return 'Fitness'
      if (fatPercentage < 25) return 'Average'
      return 'High'
    } else {
      if (fatPercentage < 14) return 'Essential'
      if (fatPercentage < 21) return 'Athletic'
      if (fatPercentage < 25) return 'Fitness'
      if (fatPercentage < 32) return 'Average'
      return 'High'
    }
  }

  const getBodyFatColor = (fatPercentage: number, gender: Gender): string => {
    if (gender === 'male') {
      if (fatPercentage < 6) return 'warning'
      if (fatPercentage < 14) return 'success'
      if (fatPercentage < 18) return 'info'
      if (fatPercentage < 25) return 'warning'
      return 'error'
    } else {
      if (fatPercentage < 14) return 'warning'
      if (fatPercentage < 21) return 'success'
      if (fatPercentage < 25) return 'info'
      if (fatPercentage < 32) return 'warning'
      return 'error'
    }
  }

  const getMuscleMassStatus = (muscleMass: number, gender: Gender): string => {
    if (gender === 'male') {
      if (muscleMass < 30) return 'Low'
      if (muscleMass < 35) return 'Below Average'
      if (muscleMass < 40) return 'Average'
      if (muscleMass < 45) return 'Above Average'
      return 'High'
    } else {
      if (muscleMass < 25) return 'Low'
      if (muscleMass < 30) return 'Below Average'
      if (muscleMass < 35) return 'Average'
      if (muscleMass < 40) return 'Above Average'
      return 'High'
    }
  }

  const getMuscleMassColor = (muscleMass: number, gender: Gender): string => {
    if (gender === 'male') {
      if (muscleMass < 30) return 'error'
      if (muscleMass < 35) return 'warning'
      if (muscleMass < 40) return 'info'
      if (muscleMass < 45) return 'success'
      return 'success'
    } else {
      if (muscleMass < 25) return 'error'
      if (muscleMass < 30) return 'warning'
      if (muscleMass < 35) return 'info'
      if (muscleMass < 40) return 'success'
      return 'success'
    }
  }

  const getBodyWaterStatus = (waterPercentage: number, gender: Gender): string => {
    if (gender === 'male') {
      if (waterPercentage < 50) return 'Low'
      if (waterPercentage < 55) return 'Below Average'
      if (waterPercentage < 65) return 'Normal'
      return 'High'
    } else {
      if (waterPercentage < 45) return 'Low'
      if (waterPercentage < 50) return 'Below Average'
      if (waterPercentage < 60) return 'Normal'
      return 'High'
    }
  }

  const getBodyWaterColor = (waterPercentage: number, gender: Gender): string => {
    if (gender === 'male') {
      if (waterPercentage < 50) return 'error'
      if (waterPercentage < 55) return 'warning'
      if (waterPercentage < 65) return 'success'
      return 'info'
    } else {
      if (waterPercentage < 45) return 'error'
      if (waterPercentage < 50) return 'warning'
      if (waterPercentage < 60) return 'success'
      return 'info'
    }
  }

  const getPhysiqueLevelStatus = (level: number): string => {
    if (level < 1) return 'Very Low'
    if (level < 2) return 'Low'
    if (level < 3) return 'Average'
    if (level < 4) return 'Good'
    if (level < 5) return 'Very Good'
    return 'Excellent'
  }

  const getPhysiqueLevelColor = (level: number): string => {
    if (level < 1) return 'error'
    if (level < 2) return 'warning'
    if (level < 3) return 'info'
    if (level < 4) return 'success'
    if (level < 5) return 'success'
    return 'success'
  }

  const getVisceralFatStatus = (level: number): string => {
    if (level < 5) return 'Healthy'
    if (level < 10) return 'Moderate'
    if (level < 15) return 'High'
    return 'Very High'
  }

  const getVisceralFatColor = (level: number): string => {
    if (level < 5) return 'success'
    if (level < 10) return 'info'
    if (level < 15) return 'warning'
    return 'error'
  }

  const getMetabolicAgeStatus = (age: number, chronologicalAge: number): string => {
    const diff = age - chronologicalAge
    if (Math.abs(diff) < 1) return 'At Age'
    return diff > 0 ? `+${diff.toFixed(0)}` : `${diff.toFixed(0)}`
  }

  const getMetabolicAgeColor = (age: number, chronologicalAge: number): string => {
    const diff = age - chronologicalAge
    if (diff < -5) return 'success'
    if (diff < 0) return 'info'
    if (diff < 5) return 'warning'
    if (diff < 10) return 'warning'
    return 'error'
  }

  const getWeightStatus = (currentWeight: number, goalWeight: number): string => {
    const diff = currentWeight - goalWeight
    if (Math.abs(diff) < 0.5) return 'At Goal'
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