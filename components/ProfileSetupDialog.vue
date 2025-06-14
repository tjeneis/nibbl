<template>
  <VDialog
    v-model="dialog"
    persistent
    max-width="500"
  >
    <VCard class="pa-6 pa-md-8">
      <h2 class="mb-2">{{ isNewProfile ? 'Welcome to Nibbl' : 'Edit Profile' }}</h2>
      <p class="mb-6">{{ isNewProfile ? 'Please set up your profile to get started.' : 'Update your profile information.' }}</p>

      <VForm @submit.prevent="handleSubmit">
        <VRow dense>
          <VCol cols="12">
            <VTextField
              v-model.number="height"
              label="Height (cm)"
              type="number"
              step="0.1"
              required
              :error-messages="error"
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model="dateOfBirth"
              label="Date of Birth"
              type="date"
              required
              :error-messages="error"
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model.number="goalWeight"
              label="Goal Weight (kg)"
              type="number"
              step="0.1"
              :error-messages="error"
            />
          </VCol>
          <VCol cols="12">
            <VSelect
              v-model="gender"
              label="Gender"
              :items="genderOptions"
              required
              :error-messages="error"
            />
          </VCol>
        </VRow>
      </VForm>

      <div class="d-flex align-center">
        <VBtn
          variant="flat"
          size="large"
          @click="dialog = false"
          :disabled="loading"
        >
          Cancel
        </VBtn>
        <VSpacer />
        <VBtn
          color="primary"
          variant="flat"
          size="large"
          @click="handleSubmit"
          :loading="loading"
          :disabled="loading || !height || !dateOfBirth || !gender"
        >
          {{ isNewProfile ? 'Save' : 'Update' }}
        </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import type { Gender } from '~/types/profile'

const props = defineProps<{
  modelValue: boolean
  isNewProfile?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'saved': []
}>()

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const { createProfile, updateProfile, getProfile } = useProfile()
const loading = ref(false)
const height = ref<number>()
const dateOfBirth = ref<string>()
const gender = ref<Gender>()
const goalWeight = ref<number>()
const error = ref<string>()

const genderOptions = [
  { title: 'Male', value: 'male' },
  { title: 'Female', value: 'female' }
]

// Load existing profile data when editing
onMounted(async () => {
  if (!props.isNewProfile) {
    try {
      const profile = await getProfile()
      height.value = profile.height
      dateOfBirth.value = profile.date_of_birth
      gender.value = profile.gender
      goalWeight.value = profile.goal_weight
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }
})

const handleSubmit = async () => {
  if (!height.value || !dateOfBirth.value || !gender.value) {
    error.value = 'Height, date of birth, and gender are required'
    return
  }

  try {
    loading.value = true
    if (props.isNewProfile) {
      await createProfile({ 
        height: height.value,
        date_of_birth: dateOfBirth.value,
        gender: gender.value,
        goal_weight: goalWeight.value
      })
    } else {
      await updateProfile({
        height: height.value,
        date_of_birth: dateOfBirth.value,
        gender: gender.value,
        goal_weight: goalWeight.value
      })
    }
    dialog.value = false
    emit('saved')
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    loading.value = false
  }
}
</script> 