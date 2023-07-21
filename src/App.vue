<script setup>
import { useI18n } from 'vue-i18n'
// get i18n t
const { t } = useI18n()
</script>

<template>
  <div id="app-container" class="h-full w-full font-nunito font-light text-sky-800 p-2 md:p-12">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition
          enter-active-class="duration-500 ease-in"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-0"
          leave-from-class="opacity-0"
          leave-to-class="transform opacity-0"
        >
          <Suspense>
            <template #default>
              <component :is="Component" :key="$route.path" />
            </template>
            <template #fallback>
              <AppContainer>
                <template #content>
                  <div class="h-full flex justify-center items-center text-center">
                    {{ t('ui.label.loading') }}
                  </div>
                </template>
              </AppContainer>
            </template>
          </Suspense>
        </transition>
      </template>
    </router-view>
  </div>
</template>
