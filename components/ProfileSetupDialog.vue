<template>
  <VDialog
    v-model="dialog"
    persistent
    max-width="500"
  >
    <VCard class="pa-6 pa-md-8">
      <h2 class="mb-2">Welcome to Nibbl</h2>
      <p class="mb-6">Please set up your profile to get started.</p>

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
              v-model.number="age"
              label="Age"
              type="number"
              min="1"
              max="120"
              required
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

      <div class="d-flex justify-end">
        <VBtn
          color="primary"
          variant="flat"
          size="large"
          @click="handleSubmit"
          :loading="loading"
          :disabled="loading || !height || !age || !gender"
        >
          Save
        </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import type { Gender } from '~/types/profile'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'saved': []
}>()

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const { createProfile } = useProfile()
const loading = ref(false)
const height = ref<number>()
const age = ref<number>()
const gender = ref<Gender>()
const error = ref<string>()

const genderOptions = [
  { title: 'Male', value: 'male' },
  { title: 'Female', value: 'female' }
]

const handleSubmit = async () => {
  if (!height.value || !age.value || !gender.value) {
    error.value = 'All fields are required'
    return
  }

  try {
    loading.value = true
    await createProfile({ 
      height: height.value,
      age: age.value,
      gender: gender.value
    })
    dialog.value = false
    emit('saved')
  } catch (error) {
    console.error('Error creating profile:', error)
  } finally {
    loading.value = false
  }
}
</script> 