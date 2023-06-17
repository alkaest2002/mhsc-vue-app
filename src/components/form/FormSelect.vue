<script setup>
/* eslint-disable no-unused-vars, no-undef */
const modelValue = defineModel()

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
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-inidigo-500 focus:border-blindigoue-500 block p-2.5"
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
