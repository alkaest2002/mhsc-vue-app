<script setup>
/* eslint-disable no-unused-vars */

import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useChecklistStore } from '@/stores/checklist.store'
import ItemLikert from '@/components/checklist/ItemLikert.vue'
import ItemRating from '@/components/checklist/ItemRating.vue'

defineOptions({ inheritAttrs: false })

// props
const props = defineProps({
  item: {
    type: Object,
    reruired: true
  }
})

// get pinia checklistStore prop
const { answers, currentItemIndex } = storeToRefs(useChecklistStore())

// get i18n t
const { t } = useI18n()

// components
const checklistComponents = {
  itemLikert: ItemLikert,
  ItemRating: ItemRating
}
</script>

<template>
  <div>
    <p class="font-semibold text-sky-800 leading-tight uppercase mb-3 text-1xl">
      {{ `${currentItemIndex + 1}/${answers.length}` }}
    </p>
    <p class="mb-4 text-xl">{{ item.itemText }}</p>
    <component
      :is="checklistComponents[item.itemType]"
      :options="item.itemOptions"
      v-bind="$attrs"
    />
  </div>
</template>
