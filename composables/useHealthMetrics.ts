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
      if (fatPercentage < 25) return 'primary'
      return 'error'
    } else {
      if (fatPercentage < 14) return 'warning'
      if (fatPercentage < 21) return 'success'
      if (fatPercentage < 25) return 'info'
      if (fatPercentage < 32) return 'primary'
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
      if (muscleMass < 40) return 'primary'
      if (muscleMass < 45) return 'info'
      return 'success'
    } else {
      if (muscleMass < 25) return 'error'
      if (muscleMass < 30) return 'warning'
      if (muscleMass < 35) return 'primary'
      if (muscleMass < 40) return 'info'
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

  return {
    getBmiStatus,
    getBmiColor,
    getBodyFatStatus,
    getBodyFatColor,
    getMuscleMassStatus,
    getMuscleMassColor,
    getBodyWaterStatus,
    getBodyWaterColor,
  }
} 