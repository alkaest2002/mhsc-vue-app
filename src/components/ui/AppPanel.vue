<template>
  <div class="h-full m-auto flex max-w-[960px] bg-zinc-100">
    <div class="w-full p-6 flex flex-col border-2 rounded-lg border-zinc-200 overflow-auto">
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
