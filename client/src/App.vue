<template>
  <div class="w-full max-w-4xl mx-auto">
    <div class="lg:flex">
      <div
        class="
          min-w-0
          w-full
          flex-auto
          lg:static lg:max-h-full lg:overflow-visible
        "
      >
        <div class="w-full flex">
          <div
            class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16"
          >
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
