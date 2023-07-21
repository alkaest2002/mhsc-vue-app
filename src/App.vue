<script setup>
import { useI18n } from 'vue-i18n'
// get i18n t
const { t } = useI18n()
</script>

<template>
  <div id="app-container" class="h-full w-full font-nunito font-light text-sky-800 p-2 md:p-12">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
          <Suspense>
            <template #default>
              <transition name="fade" mode="out-in">
                <component :is="Component" :key="$route.path" />
              </transition>
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
      </template>
    </router-view>
  </div>
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
