<script setup>
/* eslint-disable no-unused-vars */
import ItemOption from './ItemOption.vue'

// define options
defineOptions({ inheritAttrs: false })

// define props
const props = defineProps({
  options: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="last:mt-8" v-for="option in options" :key="option.value">
      <ItemOption :option="option" v-bind="$attrs" />
    </div>
  </div>
</template>
