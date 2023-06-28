<template>
  <div class="h-full m-auto flex max-w-[576px] min-w-[350px] min-h-[500px]">
    <div class="w-full flex flex-col rounded-lg p-4 gap-2">
      <div v-if="$slots.title">
        <h1 class="text-2xl font-bold mb-3">
          <slot name="title" />
        </h1>
      </div>
      <div class="grow flex flex-col overflow-scroll">
        <slot name="content" />
      </div>
      <div>
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
