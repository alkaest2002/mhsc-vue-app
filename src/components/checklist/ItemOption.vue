<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure  */
import { computed } from 'vue'
import IconCheckmark from '@/components/icons/IconCheckmark.vue'

// define props
const { option, currentAnswer } = defineProps({
  option: {
    type: Object,
    required: true
  },
  currentAnswer: {
    type: [null, String, Number],
    required: true
  }
})

// computed prop
const css = computed(() => option.value == currentAnswer 
  ? 'bg-sky-100 border-sky-800'
  : 'bg-white border-white')
</script>

<template>
  <div
    @click.capture.stop="$attrs.onClick(option.value)"
    :class="css"
    class="flex justify-between p-2 shadow-md cursor-pointer border-2 rounded-lg min-w-6 overflow-scroll"
  >
    <span class="font-semibold text-sky-800 leading-tight">
      {{ option.label }}
    </span>
    <IconCheckmark
      v-show="option.value == currentAnswer"
      class="stroke-sky-800 fill-none stroke-[30] h-4 ml-1"
    />
  </div>
</template>
