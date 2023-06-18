<template>
  <div class="h-full m-auto flex max-w-[960px] bg-zinc-100">
    <div class="w-full flex flex-col rounded-lg overflow-auto p-4">
      <div>
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
