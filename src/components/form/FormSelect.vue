<script setup>
/* eslint-disable no-undef */

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

  class: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="field">
    <div class="select" :class="props.class">
      <select
        class="block p-2 bg-sky-50 border border-sky-800 text-sky-900 text-sm rounded-lg focus:ring-sky-500 focus:border-blindigoue-500"
        :class="props.class"
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
