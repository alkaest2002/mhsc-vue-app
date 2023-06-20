<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useChecklistStore } from '@/stores/checklist.store'
import { useVuelidate } from '@vuelidate/core'
import { required, extendedAlpha } from '@/utils/i18n-validators'
import FormInput from '@/components/form/FormInput.vue'
import LoadingButton from '../components/ui/LoadingButton.vue'

// get router
const router = useRouter()
// get i18n
const { t } = useI18n()
// get pinia checklistStore
const checklistStore = useChecklistStore()
// pick pinia checklistStore prop
const { bio } = checklistStore
// set loading state
const isLoading = ref(false)
// set reactive formData (default values from pinia checklistStore prop)
const formData = reactive(bio)
// set validations rules
const rules = {
  name: { required, extendedAlpha },
  surname: { required, extendedAlpha },
  birthWhere: { required, extendedAlpha },
  birthWhen: { required }
}
// init validator
const v = useVuelidate(rules, formData, { $lazy: true })
// set array of fields
const fieldsToRender = [
  { field: 'name', type: 'text' },
  { field: 'surname', type: 'text' },
  { field: 'birthWhere', type: 'text' },
  { field: 'birthWhen', type: 'date' }
]
// on click button function
const onClick = async () => {
  // start spinner
  isLoading.value = true
  // check forma data
  const isFormCorrect = await v.value.$validate()
  // on form errors
  if (!isFormCorrect) {
    // stop spinner
    isLoading.value = false
    // do nothing
    return
  }
  // update pinia checklistStore
  checklistStore.$patch({ bio: formData })
  // stop spinner
  isLoading.value = false
  // goto checklist
  router.push({ name: 'checklist' })
}
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.bio.title') }}
    </template>
    <template #content>
      <p class="block mb-5">
        {{ t('views.bio.form.info') }}
      </p>
      <template v-for="({ field, type }, index) of fieldsToRender" :key="field">
        <FormInput
          v-model="formData[field]"
          :auto-focus="index == 0"
          :label="t(`views.bio.form.input.${field}.label`)"
          :css="'mb-3'"
          :errors="v[field].$errors"
          :type="type"
        />
      </template>
    </template>
    <template #footer>
      <LoadingButton :css="'w-full'" :is-loading="isLoading" @click="onClick">
        {{ t('ui.button.continue') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>
