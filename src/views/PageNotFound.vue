<script setup>
import { useI18n } from 'vue-i18n'
import RouterLinkButton from '@/components/ui/RouterLinkButton.vue'

// get i18n t
const { t } = useI18n()
</script>

<template>
  <AppContainer>
    <template #content>
      <div class="h-full flex justify-center items-center text-center">
        <div>
          <p class="font-bold text-4xl">404!</p>
          <p class="font-bold text-base text-slate-400">{{ t('views.pageNotFound.title') }}</p>
        </div>
      </div>
    </template>
    <template #footer>
      <div>
        <RouterLinkButton :to="{ name: 'start' }" class="w-full">
          {{ t('ui.button.ok') }}
        </RouterLinkButton>
      </div>
    </template>
  </AppContainer>
</template>
