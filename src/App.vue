<script setup>
import { useI18n } from 'vue-i18n'
// get i18n t
const { t } = useI18n()
</script>

<template>
  <div id="app-container" class="h-full w-full font-nunito font-light text-sky-800 p-2 md:p-12">
    <router-view v-slot="{ Component }">
      <Suspense>
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
          <component :is="Component" />
        </transition>
        <template #fallback>
          <div class="h-full m-auto flex max-w-[576px] min-w-[375px]">
            <div class="w-full flex flex-col rounded-lg overflow-auto p-4">
              <div class="grow">
                {{ t('ui.label.loading') }}
              </div>
            </div>
          </div>
        </template>
      </Suspense>
    </router-view>
  </div>
</template>
