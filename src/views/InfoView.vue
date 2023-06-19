<script setup>
import { useI18n } from 'vue-i18n'
import RouterLinkButton from '@/components/ui/RouterLinkButton.vue'

// get i18n
const { t } = useI18n()
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.info.title') }}
    </template>
    <template #content>
      <p>
        {{ t('views.info.text') }}
      </p>
    </template>
    <template #footer>
      <div>
        <RouterLinkButton :to="{ name: 'disclaimer' }" class="w-full">
          {{ t('ui.button.continue') }}
        </RouterLinkButton>
      </div>
    </template>
  </AppContainer>
</template>
