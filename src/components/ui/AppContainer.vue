<template>
  <div class="h-full m-auto flex max-w-[576px]">
    <div class="w-full flex flex-col rounded-lg p-4 gap-2 overflow-scroll">
      <div v-if="$slots.title">
        <h1 class="text-2xl font-bold mb-3">
          <slot name="title" />
        </h1>
      </div>
      <div class="grow">
        <slot name="content" />
      </div>
      <div>
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
