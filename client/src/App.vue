<template>
  <main class="pt-10">
    <TheNav class="mx-auto" />
    <div class="flex justify-center">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts" setup>
import TheNav from "./components/TheNav.vue";
</script>
