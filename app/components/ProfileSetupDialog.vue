<template>
  <VDialog
    v-model="dialog"
    persistent
    max-width="500"
  >
    <VCard class="pa-6 pa-md-8">
      <h2 class="mb-2">{{ isNewProfile ? t('profile.welcome') : t('profile.editProfile') }}</h2>
      <p class="mb-6">{{ isNewProfile ? t('profile.setupDescription') : t('profile.updateDescription') }}</p>

      <VForm @submit.prevent="handleSubmit">
        <VRow dense>
          <VCol cols="12">
            <VTextField
              v-model.number="height"
              :label="t('profile.height')"
              type="number"
              step="0.1"
              required
              :error-messages="error"
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model="dateOfBirth"
              :label="t('profile.dateOfBirth')"
              type="date"
              required
              :error-messages="error"
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model.number="goalWeight"
              :label="t('profile.goalWeight')"
              type="number"
              step="0.1"
              :error-messages="error"
            />
          </VCol>
          <VCol cols="12">
            <VSelect
              v-model="gender"
              :label="t('profile.gender')"
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
          {{ t('profile.cancel') }}
        </VBtn>
        <VSpacer />
        <VBtn
          :color="getInvertedSurfaceColor()"
          variant="flat"
          size="large"
          @click="handleSubmit"
          :loading="loading"
          :disabled="loading || !height || !dateOfBirth || !gender"
        >
          {{ isNewProfile ? t('profile.save') : t('profile.update') }}
        </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import type { Gender } from '~/types/common'

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
const { getInvertedSurfaceColor } = useThemeColors()
const loading = ref(false)
const height = ref<number>()
const dateOfBirth = ref<string>()
const gender = ref<Gender>()
const goalWeight = ref<number>()
const error = ref<string>()

const { t } = useI18n()

const genderOptions = computed(() => [
  { title: t('profile.male'), value: 'male' },
  { title: t('profile.female'), value: 'female' }
])

// Load existing profile data when editing
onMounted(async () => {
  if (!props.isNewProfile) {
    try {
      const profile = await getProfile()
      height.value = profile.height
      dateOfBirth.value = profile.date_of_birth
      gender.value = profile.gender as Gender
      goalWeight.value = profile.goal_weight as number
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }
})

const handleSubmit = async () => {
  if (!height.value || !dateOfBirth.value || !gender.value) {
    error.value = t('profile.requiredFields')
    return
  }

  try {
    loading.value = true
    if (props.isNewProfile) {
      await createProfile({ 
        height: height.value,
        date_of_birth: dateOfBirth.value,
        gender: gender.value,
        goal_weight: goalWeight.value as number | null
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