<script setup>
/* eslint-disable no-unused-vars */

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([ 'onAnswer' ])
</script>

<template>
  <div @click="$emit('onAnswer', 2)">
    <h1>Likert</h1>
    {{ item.itemText }}
    {{ item.itemOptions }}
  </div>
</template>

