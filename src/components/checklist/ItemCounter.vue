<script setup>
/* eslint-disable no-unused-vars */

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  answers: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <span class="text-sky-800 leading-tight text-1xl text-base flex items-center">
    <span class="text-base bg-sky-800 text-white px-1 border-2 border-sky-800 rounded-l w-[40px] text-center">{{ index + 1
    }}</span>
    <span class="text-base bg-sky-100 tbg-sky-800 px-1 border-2 border-sky-800 rounded-r w-[40px] text-center">{{
      answers.length }}</span>
  </span>
</template>