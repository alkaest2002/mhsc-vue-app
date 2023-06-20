<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useChecklistStore } from '@/stores/checklist.store'
import RouterLinkButton from '@/components/ui/RouterLinkButton.vue'

// get i18n t
const { t } = useI18n()
// get pinia checkList store prop
const { qrcodeWasGenerated } = storeToRefs(useChecklistStore())
// computed routerlin to prop
const to = computed(() => {
  if (qrcodeWasGenerated.value)
    return { name: 'qrcode' }
  return { name: 'disclaimer' }
})
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
        <RouterLinkButton :to="to" class="w-full">
          {{ t('ui.button.continue') }}
        </RouterLinkButton>
      </div>
    </template>
  </AppContainer>
</template>
