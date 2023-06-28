<script setup>
/* eslint-disable no-undef, no-unused-vars */

// get modelValue
const modelValue = defineModel()
// props
const props = defineProps({
  options: {
    type: Array,
    required: true
  },

  placeHolder: {
    type: String,
    default: ''
  },

  disabled: {
    type: Boolean,
    default: false
  },

  css: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="field">
    <div class="select" :class="css">
      <select
        class="p-2 bg-sky-50 border-2 border-sky-800 text-sky-900 text-sm rounded-lg focus:border-sky-500 focus:ring-0"
        :class="css"
        :disabled="disabled"
        @change="modelValue = $event.target.value"
      >
        <option v-if="placeHolder.length > 0" value="placeHolder" disabled :selected="!modelValue">
          {{ placeHolder }}
        </option>
        <option
          v-for="{ label, value } in options"
          :key="value"
          :value="value"
          :class="{ 'is-active': value == modelValue }"
          :selected="value == modelValue"
        >
          {{ label }}
        </option>
      </select>
    </div>
  </div>
</template>
