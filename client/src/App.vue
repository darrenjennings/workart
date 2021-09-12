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
        <div class="w-full flex justify-center">
          <main
            class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16"
          >
            <nav class="w-800px mx-auto flex flex-row">
              <ol class="flex my-4">
                <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
                <li class="ml-4">
                  <router-link :to="{ name: 'Archive' }">Archive</router-link>
                </li>
              </ol>
            </nav>
            <div class="container flex justify-center">
              <router-view />
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.w-800px {
  width: 600px;
}
</style>
