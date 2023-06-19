<script setup>
/* eslint-disable no-unused-vars */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import { useChecklistStore } from '@/stores/checklist.store'
import { storeToRefs } from 'pinia'
import ItemContainer from '@/components/checklist/ItemContainer.vue'

// get i18n
const { t } = useI18n()
// import locale-aware checklist
const module = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)
const checklist = module.default
// get pinia checklistStore
const {
  answers,
  currentItemIndex: index,
  getIsLastItemIndex,
  getCurrentAnswer
} = storeToRefs(useChecklistStore())
// init isLoading state
const isLoading = ref(false)
// init local answer
const localAnswer = ref(getCurrentAnswer.value)
// on answer
const onAnswer = (answer) => {
  // store answer into component variable
  localAnswer.value = answer
}
// onClick function
const onClick = () => {
  // start button spinner
  isLoading.value = true
  // update pinia checkList store answers prop
  answers.value.splice(index.value, 1, localAnswer.value)
  // increment pinia checkList store index prop
  index.value++
  // reset local answer
  localAnswer.value = null
  // stop button spinner
  isLoading.value = false
}
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.checklist.title') }}
    </template>
    <template #content>
      <transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
        mode="out-in"
        appear
      >
        <ItemContainer
          :key="index"
          :item="checklist[index]"
          :current-answer="localAnswer"
          @on-answer="onAnswer"
        />
      </transition>
    </template>
    <template #footer>
      <LoadingButton
        @click="onClick"
        v-model="isLoading"
        :disabled="localAnswer === null"
        :css="'w-full'"
      >
        {{ t('ui.button.continue') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>
