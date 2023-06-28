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
  <div>
    <div class="grid grid-cols-4 gap-x-4 gap-y-2">
      <div class="my-2 text-center" v-for="option in options.slice(0, -1)" :key="option.value">
        <ItemOption :option="option" v-bind="$attrs" />
      </div>
    </div>
    <div class="flex flex-wrap mt-12">
      <div class="my-2 text-center w-full" v-for="option in options.slice(-1)" :key="option.value">
        <ItemOption :option="option" v-bind="$attrs" />
      </div>
    </div>
  </div>
</template>
