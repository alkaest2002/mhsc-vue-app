<script setup>
/* eslint-disable no-unused-vars */
import ItemLikert from '@/components/checklist/ItemLikert.vue'
import ItemRating from '@/components/checklist/ItemRating.vue'

// define options
defineOptions({ inheritAttrs: false })

// define props
const props = defineProps({
  item: {
    type: Object,
    reruired: true
  }
})

// defihne components
const checklistComponents = {
  itemLikert: ItemLikert,
  itemRating: ItemRating
}
</script>

<template>
  <div class="mt-2">
    <p class="block mb-6 text-xl">{{ item.itemText }}</p>
    <component
      :is="checklistComponents[item.itemType]"
      :options="item.itemOptions"
      v-bind="$attrs"
    />
  </div>
</template>
