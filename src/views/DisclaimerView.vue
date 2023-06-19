<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useChecklistStore } from '@/stores/checklist.store'
import RouterLinkButton from '@/components/ui/RouterLinkButton.vue'

// get i18n
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
      <p class="mb-6">{{ t('views.disclaimer.text') }}</p>
      <input
        type="checkbox"
        id="disclaimer-checkbox"
        name="disclaimer-checkbox"
        v-model="disclaimer"
        @click="onSubmit"
        class="accent-sky-800 text-sky-800"
      />
      <label class="ml-2 text-sm" for="disclaimer-checkbox">{{
        t('views.disclaimer.agree')
      }}</label>
    </template>
    <template #footer>
      <RouterLinkButton :to="{ name: 'bio' }" :class="'w-full mt-2'" :disabled="!disclaimer">
        {{ t('ui.button.continue') }}
      </RouterLinkButton>
    </template>
  </AppContainer>
</template>
