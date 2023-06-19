<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */

// props
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
console.log(options, currentAnswer)
// define emit
const emit = defineEmits(['onAnswer'])
</script>

<template>
  <div class="flex flex-col last:mt-5" v-for="option in options" :key="option.value">
    <div @click="$emit('onAnswer', option.value)">
      <div
        class="relative flex flex-col p-3 rounded-lg shadow-md cursor-pointer my-2 border-2"
        :class="{
          'bg-white': option.value != currentAnswer,
          'border-white': option.value != currentAnswer,
          'bg-sky-100': option.value == currentAnswer,
          'border-sky-800': option.value == currentAnswer
        }"
      >
        <span class="font-semibold text-sky-800 leading-tight"
          >{{ option.label }} {{ option.value }}</span
        >
      </div>
    </div>
  </div>
</template>
