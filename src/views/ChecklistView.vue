<script setup>
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import { useChecklistStore } from '@/stores/checklist.store'
import { storeToRefs } from 'pinia'

const { t } = useI18n()

const { answers, getFirstItemIndexToAnswer: index } = storeToRefs(useChecklistStore())

const module = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)

const checklist = module.default

</script>

<template>
  <AppPanel>
    <template #title>
      {{ t('views.checklist.title') }}
    </template>
    <template #content>
        {{ answers  }}
        {{ checklist[index].itemText }}
        {{ checklist[index].itemOptions }}
    </template>
  </AppPanel>
</template>
