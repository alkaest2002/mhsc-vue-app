<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useChecklistStore } from '@/stores/checklist.store'
import RouterLinkButton from '@/components/ui/RouterLinkButton.vue'
const { t } = useI18n()
const { disclaimer } = storeToRefs(useChecklistStore())
</script>

<template>
  <AppPanel>
    <template #title>
      {{ t('app.views.start.title') }}
    </template>
    <template #content>
      <p class="mb-6">{{ t('app.views.start.disclaimer') }}</p>
      <input
        type="checkbox"
        id="disclaimer-checkbox"
        name="disclaimer-checkbox"
        v-model="disclaimer"
        @click="onSubmit"
      />
      <label class="ml-2 text-sm" for="disclaimer-checkbox">{{ t('app.views.start.agree') }}</label>
    </template>
    <template #footer>
      <RouterLinkButton :to="{ name: 'bio' }" :class="'w-full mt-2'" :disabled="!disclaimer">
        {{ t('app.ui.button.ok') }}
      </RouterLinkButton>
    </template>
  </AppPanel>
</template>
