<template>
  <section class="font-mono justify-start w-content">
    <p class="mb-10">
      A collaborative pixel art web tool for creating new art every day. The
      pixel artboard is wiped clean each day, and anyone can add pixels to the
      board. There is no guarantee your pixel will stay the same and each new
      day resets the board. After a day has passed, the art is frozen and can be
      accessed via the
      <router-link
        class="text-blue-600 font-bold underline"
        :to="{ name: 'Archive' }"
        >archive</router-link
      >. Code is hosted on GitHub
      <a
        target="_blank"
        class="text-blue-600 font-bold underline"
        href="https://github.com/darrenjennings/workart"
        >here</a
      >.
    </p>
    <div class="mb-2">
      Created with <span class="font-sans">&#10084;</span> by
      <a
        target="_blank"
        class="text-blue-600 font-bold underline"
        href="https://guuu.io"
        >Darren Jennings</a
      >
    </div>
  </section>
</template>
