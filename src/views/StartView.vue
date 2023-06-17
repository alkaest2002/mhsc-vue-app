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
  <AppPanel>
    <template #title>
      {{ t('views.start.title') }}
    </template>
    <template #content>
      <p class="mb-6">{{ t('views.start.disclaimer') }}</p>
      <input
        type="checkbox"
        id="disclaimer-checkbox"
        name="disclaimer-checkbox"
        v-model="disclaimer"
        @click="onSubmit"
      />
      <label class="ml-2 text-sm" for="disclaimer-checkbox">{{ t('views.start.agree') }}</label>
    </template>
    <template #footer>
      <RouterLinkButton :to="{ name: 'bio' }" :class="'w-full mt-2'" :disabled="!disclaimer">
        {{ t('ui.button.ok') }}
      </RouterLinkButton>
    </template>
  </AppPanel>
</template>
