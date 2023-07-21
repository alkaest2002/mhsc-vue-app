<script setup>
/* eslint-disable no-unused-vars */
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import { useChecklistStore } from '@/stores/checklist.store'
import { storeToRefs } from 'pinia'
import ItemContainer from '@/components/checklist/ItemContainer.vue'
import ItemCounter from '@/components/checklist/ItemCounter.vue'
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
        <ItemCounter :answers="answers" :index="index" />
      </div>
    </template>
    <template #content>
      <transition name="fade" mode="out-in">
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
