<template>
  <VDialog
    v-model="dialog"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <VCard>
      <VToolbar color="primary">
        <VBtn icon @click="dialog = false">
          <VIcon>mdi-close</VIcon>
        </VBtn>
        <VToolbarTitle>Add New Entry</VToolbarTitle>
        <VSpacer />
        <VToolbarItems>
          <VBtn
            variant="text"
            @click="handleSubmit"
            :loading="loading"
            :disabled="loading"
          >
            Save
          </VBtn>
        </VToolbarItems>
      </VToolbar>

      <VCardText>
        <VForm @submit.prevent="handleSubmit">
          <VRow>
            <VCol cols="12" md="6">
              <VTextField
                v-model="formData.date"
                label="Date"
                type="date"
                required
              />
            </VCol>
            
            <VCol cols="12" md="6">
              <VTextField
                v-model.number="formData.weight"
                label="Weight (kg)"
                type="number"
                step="0.1"
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model.number="formData.fat_percentage"
                label="Body Fat %"
                type="number"
                step="0.1"
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model.number="formData.visceral_level"
                label="Visceral Level"
                type="number"
                step="0.1"
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model.number="formData.muscle_mass"
                label="Muscle Mass (kg)"
                type="number"
                step="0.1"
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model.number="formData.physique_level"
                label="Physique Level"
                type="number"
                step="0.1"
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model.number="formData.bone_mass"
                label="Bone Mass (kg)"
                type="number"
                step="0.1"
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model.number="formData.kcal_intake"
                label="Calorie Intake (kcal)"
                type="number"
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model.number="formData.metabolic_age"
                label="Metabolic Age"
                type="number"
                required
              />
            </VCol>

            <VCol cols="12" md="6">
              <VTextField
                v-model.number="formData.body_water_percentage"
                label="Body Water %"
                type="number"
                step="0.1"
                required
              />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import type { WeightFormData } from '~/types/weight'

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
  date: new Date().toISOString().split('T')[0],
  weight: undefined,
  fat_percentage: undefined,
  visceral_level: undefined,
  muscle_mass: undefined,
  physique_level: undefined,
  bone_mass: undefined,
  kcal_intake: undefined,
  metabolic_age: undefined,
  body_water_percentage: undefined
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