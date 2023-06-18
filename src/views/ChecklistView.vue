<script setup>
/* eslint-disable no-unused-vars */
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import { useChecklistStore } from '@/stores/checklist.store'
import { storeToRefs } from 'pinia'
import ItemLikert from '@/components/checklist/ItemLikert.vue'
import ItemRating from '@/components/checklist/ItemRating.vue'

const checklistComponents = {
  "itemLikert": ItemLikert,
  "ItemRating": ItemRating
}

const { t } = useI18n()

const { answers, getFirstItemIndexToAnswer: index } = storeToRefs(useChecklistStore())

const module = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)

const checklist = module.default

const onAnswer = (answer) => {
  answers.value.splice(index.value, 1, answer)
}
</script>

<template>
  <AppPanel>
    <template #title>
      {{ t('views.checklist.title') }}
    </template>
    <template #content>
      <div>
        {{ answers  }}
      </div>
      <component 
        :is="checklistComponents[checklist[index].itemType]" 
        :item="checklist[index]" 
        @on-answer="onAnswer"
      />
    </template>
  </AppPanel>
</template>
