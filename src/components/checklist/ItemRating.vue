<script setup>
/* eslint-disable no-unused-vars */
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <h1>Rating</h1>
  {{ item.itemText }}
  {{ item.itemOptions }}
</template>