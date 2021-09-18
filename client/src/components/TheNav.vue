<template>
  <nav class="flex w-content font-mono">
    <ol class="flex my-4">
      <li>
        <router-link :to="{ name: 'Home' }">Home</router-link>
      </li>
      <li class="ml-4">
        <router-link :to="{ name: 'Archive' }">Archive</router-link>
      </li>
      <li class="ml-4">
        <router-link :to="{ name: 'About' }">About</router-link>
      </li>
    </ol>
  </nav>
</template>
