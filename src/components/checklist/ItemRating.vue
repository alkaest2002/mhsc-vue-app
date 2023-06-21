<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */

// get props
const { options, currentAnswer } = defineProps({
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
  <div>
    <div class="grid grid-cols-4 gap-x-4 gap-y-2">
      <div class="my-2 text-center" v-for="option in options.slice(0, -1)" :key="option.value">
        <div
          @click="$emit('onAnswer', option.value)"
          :class="{
            'bg-white': option.value != currentAnswer,
            'border-white': option.value != currentAnswer,
            'bg-sky-100': option.value == currentAnswer,
            'border-sky-800': option.value == currentAnswer
          }"
          class="relative flex flex-col p-3 rounded-lg shadow-md cursor-pointer border-2"
        >
          <span class="font-semibold text-sky-800 leading-tight">{{ option.label }}</span>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-1 mt-8">
      <div class="my-2 text-center w-full" v-for="option in options.slice(-1)" :key="option.value">
        <div
          @click="$emit('onAnswer', option.value)"
          :class="{
            'bg-white': option.value != currentAnswer,
            'border-white': option.value != currentAnswer,
            'bg-sky-100': option.value == currentAnswer,
            'border-sky-800': option.value == currentAnswer
          }"
          class="relative flex flex-col p-3 rounded-lg shadow-md cursor-pointer border-2"
        >
          <span class="font-semibold text-sky-800 leading-tight">{{ option.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
