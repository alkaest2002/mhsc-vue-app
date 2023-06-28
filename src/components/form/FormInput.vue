<script setup>
/* eslint-disable no-undef */
import { ref, onMounted } from 'vue'

// define options
defineOptions({ inheritAttrs: false })
// get modelValue
const modelValue = defineModel()
// define props
const props = defineProps({
  label: {
    type: String,
    default: null
  },
  css: {
    type: String,
    default: ''
  },
  errors: {
    type: Array,
    default: () => {
      ;[]
    }
  },
  autoFocus: {
    type: Boolean,
    default: false
  }
})
// set var that will hold html node
const inputRef = ref(null)
// on mounted
onMounted(() => {
  // autofocus if it's the case
  if (props.autoFocus) inputRef.value.focus()
})
</script>

<template>
  <div :class="css">
    <label v-if="label" class="block mb-2 text-sm font-medium text-sky-900">{{ label }}</label>
    <input
      ref="inputRef"
      class="bg-sky-50 border-2 border-sky-800 text-sky-900 text-sm rounded-lg focus:border-sky-500 focus:ring-0 w-full p-2"
      :value="modelValue"
      v-bind="$attrs"
      @input="modelValue = $event.target.value"
    />
    <div v-if="errors.length || true" class="text-xs text-red-600 mt-1">
      <div v-for="error of errors" :key="error.$uid">{{ error.$message }}</div>
    </div>
  </div>
</template>
