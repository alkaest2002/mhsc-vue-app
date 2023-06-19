<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */

// props
const { options } = defineProps({
  options: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['onAnswer'])
</script>

<template>
  <div class="flex flex-col" v-for="option in options" :key="option.value">
    <div @click="$emit('on-answer', option.value)">{{ option.label }}</div>
  </div>
</template>
