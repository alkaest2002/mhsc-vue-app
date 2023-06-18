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
      <transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
          mode="out-in"
          appear
        >
          <component
            :key="index"
            :is="checklistComponents[checklist[index].itemType]" 
            :item="checklist[index]" 
            @on-answer="onAnswer"
          />
        </transition>
    </template>
  </AppPanel>
</template>
