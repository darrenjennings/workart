<template>
  <nav class="flex">
    <ol class="flex my-4">
      <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
      <li class="ml-4">
        <router-link :to="{ name: 'Archive' }">Archive</router-link>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
nav {
  width: 600px;
}
</style>
