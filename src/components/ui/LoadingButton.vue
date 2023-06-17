<script setup>
/* eslint-disable no-undef, vue/no-setup-props-destructure */
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

const modelValue = defineModel()
const props = defineProps({ css: { type: String } })
const computedCss = computed(() => `${props.css} ${modelValue.value ? 'is-loading' : ''}`)
</script>

<template>
  <button
    class="inline-block h-10 bg-indigo-500 hover:bg-indigo-700 text-white py-2 px-4 rounded text-center"
    :class="computedCss"
    v-bind="$attrs"
    @click="modelValue = true"
  >
    <slot />
  </button>
</template>
