<template>
  <VDialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <VCard>
      <VToolbar :color="getInvertedSurfaceColor()">
        <VToolbarTitle>{{ t('weight.newEntry') }}</VToolbarTitle>
        <VSpacer />
        <VToolbarItems>
          <VBtn @click="dialog = false" :text="t('profile.cancel')" />
        </VToolbarItems>
      </VToolbar>

      <VForm class="pa-6 pa-md-8" @submit.prevent="handleSubmit">
        <VRow>
          <VCol cols="12" md="6">
            <VTextField
              v-model="formData.date"
              :label="t('weight.date')"
              type="date"
              required
            />
          </VCol>
          
          <VCol cols="12" md="6">
            <VTextField
              v-model.number="formData.weight"
              :label="t('weight.weight')"
              type="number"
              step="0.1"
              required
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model.number="formData.fat_percentage"
              :label="t('weight.bodyFat')"
              type="number"
              step="0.1"
              required
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model.number="formData.visceral_level"
              :label="t('weight.visceralLevel')"
              type="number"
              step="0.1"
              required
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model.number="formData.muscle_mass"
              :label="t('weight.muscleMass')"
              type="number"
              step="0.1"
              required
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model.number="formData.physique_level"
              :label="t('weight.physiqueLevel')"
              type="number"
              step="0.1"
              required
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model.number="formData.bone_mass"
              :label="t('weight.boneMass')"
              type="number"
              step="0.1"
              required
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model.number="formData.kcal_intake"
              :label="t('weight.calorieIntake')"
              type="number"
              required
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model.number="formData.metabolic_age"
              :label="t('weight.metabolicAge')"
              type="number"
              required
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model.number="formData.body_water_percentage"
              :label="t('weight.bodyWater')"
              type="number"
              step="0.1"
              required
            />
          </VCol>

          <VCol cols="12">
            <VBtn
              @click="handleSubmit"
              block
              :color="getInvertedSurfaceColor()"
              size="large"
              :loading="loading"
              :disabled="loading"
              :text="t('weight.save')"
            />
          </VCol>
        </VRow>
      </VForm>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import type { TablesInsert } from '~/types/database.types'

type WeightFormData = Omit<TablesInsert<'weight_entries'>, 'user_id' | 'id' | 'created_at' | 'updated_at'>

const { t } = useI18n()
const { closeDialog } = useAddEntry()
const { getInvertedSurfaceColor } = useThemeColors()

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

const { addWeightEntry } = useWeight()
const loading = ref(false)

const formData = ref<WeightFormData>({
  date: new Date().toISOString().split('T')[0] || '',
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

const handleSubmit = async () => {
  try {
    loading.value = true
    await addWeightEntry(formData.value)
    dialog.value = false
    emit('saved')
  } catch (error) {
    console.error('Error adding weight entry:', error)
  } finally {
    loading.value = false
  }
}
</script>