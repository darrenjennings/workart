<template>
  <div class="container flex justify-center">
    <Art v-if="artboard !== null" :artboard="artboard" @update="onArtUpdate" />
  </div>
</template>

<script setup lang="ts">
import Art from "../components/Art.vue";
import type { ArtBoard } from "../components/Art.vue";
import { onMounted, ref } from "vue-demi";

const artboard = ref(null);

function serializeArtboard(artboard: ArtBoard): string {
  return JSON.stringify(artboard);
}

onMounted(() => {
  fetch("/api")
    .then((res) => res.json())
    .then((res) => {
      artboard.value = res;
    });
});

function onArtUpdate(artboard: ArtBoard) {
  fetch("/api", {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
    body: serializeArtboard(artboard),
  });
}
</script>

<style scoped></style>
