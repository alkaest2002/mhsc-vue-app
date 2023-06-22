<script setup>
/* eslint-disable no-unused-vars */

// define props
const props = defineProps({
  to: { type: Object },
  css: { type: String },
  disabled: { type: Boolean, default: false }
})
</script>

<template>
  <span
    v-if="disabled"
    class="inline-block h-10 bg-sky-800 outline-sky-800 accent-sky-800 text-white py-2 px-4 rounded-lg text-center cursor-not-allowed opacity-25"
  >
    <slot />
  </span>
  <router-link
    v-else
    class="inline-block h-10 bg-sky-800 hover:bg-sky-700 text-white py-2 px-4 rounded-lg text-center"
    :class="css"
    :to="to"
  >
    <slot />
  </router-link>
</template>
