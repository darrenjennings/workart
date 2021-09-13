<template>
  <div class="absolute top-0 left-0">
    <input v-model="color" type="color" />
  </div>
  <Art
    :key="artboard.timestamp"
    class="w-full"
    v-if="artboard !== null"
    :artboard="artboard"
    :color="color"
    @update="onArtUpdate"
  />
</template>

<script lang="ts">
import Art from "../components/Art.vue";
import Api from "../service/api";
import type { ArtBoard } from "../components/Art.vue";
import { onMounted, ref, inject } from "vue";

export default {
  components: { Art },
  setup() {
    const $api = inject<Api>("$api");
    const artboard = ref<ArtBoard | null>(null);
    const color = ref("#000000");

    onMounted(() => {
      $api?.get("/api").then((res) => {
        artboard.value = res;
      });
    });

    async function onArtUpdate(x: number, y: number, color: string) {
      const board = await $api?.post("/api", {
        x,
        y,
        color,
      });
      artboard.value = {
        grid: board.grid,
        timestamp: Date.now(),
      };
    }

    return {
      artboard,
      color,
      onArtUpdate,
    };
  },
};
</script>

<style scoped></style>
