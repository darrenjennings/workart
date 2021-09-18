<template>
  <div class="w-content font-mono">
    <section>
      <h1 class="hidden">About</h1>
      <p class="mb-10">
        A collaborative pixel art web tool for creating new art every day. The
        pixel artboard is wiped clean each day, and anyone can add pixels to the
        board. There is no guarantee your pixel will stay the same and each new
        day resets the board. After a day has passed, the art is frozen and can
        be accessed via the
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
    </section>
    <section class="mt-10">
      <h2>Shortcuts</h2>
      <div class="mt-2">
        <kbd>Cmd</kbd> + <kbd>Click</kbd> The current color will be changed to
        the cell being moused over.
      </div>
    </section>
    <div class="mt-10">
      Created with <span class="font-sans">&#10084;</span> by
      <a
        target="_blank"
        class="text-blue-600 font-bold underline"
        href="https://guuu.io"
        >Darren Jennings</a
      >
    </div>
  </div>
</template>

<style scoped>
kbd {
  background-color: #eee;
  border-radius: 3px;
  border: 1px solid #b4b4b4;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
    0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
  color: #333;
  display: inline-block;
  font-size: 0.85em;
  font-weight: 700;
  line-height: 1;
  padding: 2px 4px;
  white-space: nowrap;
}
</style>
