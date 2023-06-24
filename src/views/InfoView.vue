<script setup>
import { useI18n } from 'vue-i18n'

// get i18n t
const { t } = useI18n()
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.info.title') }}
    </template>
    <template #content>
      <p class="block mb-6">
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
