<script setup>
/* eslint-disable no-unused-vars */
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import { useChecklistStore } from '@/stores/checklist.store'
import { storeToRefs } from 'pinia'
import ItemContainer from '@/components/checklist/ItemContainer.vue'

// get router
const router = useRouter()
// get i18n t
const { t } = useI18n()
// import locale-aware checklist
const module = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)
const checklist = module.default
// get pinia checklistStore props and actions
const {
  answers,
  currentItemIndex: index,
  getIsLastItemIndex,
  getCurrentAnswer
} = storeToRefs(useChecklistStore())
// init isLoading state
const isLoading = ref(false)
// init local answer variable
const localAnswer = ref(getCurrentAnswer.value)

// on answer
const onClickAnswer = (answer) => {
  // store answer into local answer variable
  localAnswer.value = answer
}

// on click button function
const onClickContinue = () => {
  // start spinner
  isLoading.value = true
  // update pinia checkList store answers prop
  answers.value.splice(index.value, 1, localAnswer.value)
  // in case this is the last item
  if (getIsLastItemIndex.value) {
    // go to qrcode view
    return router.push({ name: 'qrcode-generate' })
  }
  // increment pinia checkList store index prop
  index.value++
  // reset local answer variable
  localAnswer.value = getCurrentAnswer.value
  // stop spinner
  isLoading.value = false
}

// stop spinner jaust before unmount
onBeforeUnmount(() => (isLoading.value = false))
</script>

<template>
  <AppContainer>
    <template #title>
      <div class="flex justify-between">
        <span>
          {{ t('views.checklist.title') }}
        </span>
        <span class="text-sky-800 leading-tight text-1xl text-base flex items-center">
          <span
            class="text-base bg-sky-800 text-white px-1 border-2 border-sky-800 rounded-l w-[40px] text-center"
            >{{ index + 1 }}</span
          >
          <span
            class="text-base bg-sky-100 tbg-sky-800 px-1 border-2 border-sky-800 rounded-r w-[40px] text-center"
            >{{ answers.length }}</span
          >
        </span>
      </div>
    </template>
    <template #content>
      <transition
        enter-active-class="duration-300 ease-in"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-ut"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
        mode="out-in"
        appear
      >
        <ItemContainer
          :key="index"
          :item="checklist[index]"
          :current-answer="localAnswer"
          @click="onClickAnswer"
        />
      </transition>
    </template>
    <template #footer>
      <LoadingButton
        @click="onClickContinue"
        :is-loading="isLoading"
        :disabled="localAnswer === null"
        :css="'w-full'"
      >
        {{ t('ui.button.continue') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>
