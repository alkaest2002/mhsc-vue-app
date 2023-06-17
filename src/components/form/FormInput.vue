<script setup>
/* eslint-disable no-unused-vars, no-undef */
import { ref, onMounted } from 'vue'

defineOptions({ inheritAttrs: false })

const modelValue = defineModel()

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

const inputRef = ref(null)

onMounted(() => {
  // autofocus if it's the case
  if (props.autoFocus) inputRef.value.focus()
})
</script>

<template>
  <div :class="css">
    <label v-if="label" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
      label
    }}</label>
    <input
      ref="inputRef"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :value="modelValue"
      v-bind="$attrs"
      @input="modelValue = $event.target.value"
    />
    <div v-if="errors.length || true" class="text-xs text-red-600 mt-1">
      <div v-for="error of errors" :key="error.$uid">{{ error.$message }}</div>
    </div>
  </div>
</template>
