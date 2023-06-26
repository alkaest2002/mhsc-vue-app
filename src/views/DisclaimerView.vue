<script setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useChecklistStore } from '@/stores/checklist.store'

// get i18n t
const { t } = useI18n()
// get pinia checkList store prop
const { disclaimer } = storeToRefs(useChecklistStore())
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.disclaimer.title') }}
    </template>
    <template #content>
      <p class="block mb-6">{{ t('views.disclaimer.text') }}</p>
      <div>
        <input
          type="checkbox"
          id="disclaimer-checkbox"
          name="disclaimer-checkbox"
          v-model="disclaimer"
          @click="onSubmit"
          class="accent-sky-800 text-sky-800 focus:ring-transparent"
        />
        <label class="ml-2 text-sm" for="disclaimer-checkbox">{{
          t('views.disclaimer.agree')
        }}</label>
      </div>
    </template>
    <template #footer>
      <RouterLinkButton :to="{ name: 'bio' }" :class="'w-full mt-2'" :disabled="!disclaimer">
        {{ t('ui.button.continue') }}
      </RouterLinkButton>
    </template>
  </AppContainer>
</template>
