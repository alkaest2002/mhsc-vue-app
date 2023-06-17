<template>
  <div id="app-container" class="h-full w-full bg-zinc-50 font-nunito font-light p-6">
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
        <template #fallback>Loading...</template>
      </Suspense>
    </router-view>
  </div>
</template>
