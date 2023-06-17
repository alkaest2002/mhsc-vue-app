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
const { bio, $patch } = useChecklistStore()
// set loading state
const isLoading = ref(false)
// set reactive formData (default from pinia checklistStore)
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
// submitData
const submitFormData = async () => {
  // check forma data
  const isFormCorrect = await v.value.$validate()
  // stop loading state
  isLoading.value = false
  // do nothing on form errors
  if (!isFormCorrect) return
  // update pinia checklistStore
  $patch(formData)
  // goto checklist
  router.push({ name: 'checklist' })
}
</script>

<template>
  <AppPanel>
    <template #title>
      {{ t('app.views.bio.title') }}
    </template>
    <template #content>
      <p class="block mb-5">
        {{ t('app.views.bio.form.info') }}
      </p>
      <template v-for="({ field, type }, index) of fieldsToRender" :key="field">
        <FormInput
          v-model="formData[field]"
          :auto-focus="index == 0"
          :label="t(`app.views.bio.form.input.${field}.label`)"
          :placeholder="t(`app.views.bio.form.input.${field}.placeholder`)"
          :css="'mb-4'"
          :errors="v[field].$errors"
          :type="type"
        />
      </template>
    </template>
    <template #footer>
      <LoadingButton class="w-full" v-model="isLoading" @click="submitFormData">
        {{ t('app.ui.button.continue') }}
      </LoadingButton>
    </template>
  </AppPanel>
</template>
