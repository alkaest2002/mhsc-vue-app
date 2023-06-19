<script setup>
/* eslint-disable no-unused-vars */
import { storeToRefs } from 'pinia'
import { useChecklistStore } from '@/stores/checklist.store'
import ItemLikert from '@/components/checklist/ItemLikert.vue'
import ItemRating from '@/components/checklist/ItemRating.vue'

// define options
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
// components
const checklistComponents = {
  itemLikert: ItemLikert,
  itemRating: ItemRating
}
</script>

<template>
  <div>
    <p class="font-semibold text-sky-800 leading-tight uppercase my-3 text-1xl">
      {{ `${currentItemIndex + 1}/${answers.length}` }}
    </p>
    <p class="text-xl mb-7">{{ item.itemText }}</p>
    <component
      :is="checklistComponents[item.itemType]"
      :options="item.itemOptions"
      v-bind="$attrs"
    />
  </div>
</template>
