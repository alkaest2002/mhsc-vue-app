<script setup>
/* eslint-disable no-unused-vars */
import IconCheckmark from '@/components/icons/IconCheckmark.vue'

// define props
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  currentAnswer: {
    type: [null, String, Number],
    required: true
  }
})
// define emit
const emit = defineEmits(['onAnswer'])
</script>

<template>
  <div class="flex flex-col">
    <div class="my-2 last:mt-12" v-for="option in options" :key="option.value">
      <div
        @click="$emit('onAnswer', option.value)"
        :class="{
          'bg-white': option.value != currentAnswer,
          'border-white': option.value != currentAnswer,
          'bg-sky-100': option.value == currentAnswer,
          'border-sky-800': option.value == currentAnswer
        }"
        class="relative flex justify-between p-2 rounded-lg shadow-md cursor-pointer border-2"
      >
        <span class="font-semibold text-sky-800 leading-tight">
          {{ option.label }}
        </span>
        <IconCheckmark
          v-show="option.value == currentAnswer"
          class="stroke-sky-800 fill-none stroke-[30] h-4"
        />
      </div>
    </div>
  </div>
</template>
