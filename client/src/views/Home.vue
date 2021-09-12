<template>
  <div>
    <input v-model="color" class="absolute top-0 left-0" type="color" />
    <Art
      :key="artboard.timestamp"
      class="w-full"
      v-if="artboard !== null"
      :artboard="artboard"
      :color="color"
      @update="onArtUpdate"
    />
  </div>
</template>

<script lang="ts">
import Art from "../components/Art.vue";
import Api from "../service/api";
import type { ArtBoard } from "../components/Art.vue";
import { onMounted, ref, inject } from "vue";

export default {
  components: { Art },
  setup(props, config) {
    const $api: Api = inject("$api");
    const artboard = ref(null);
    const color = ref("#000000");

    onMounted(() => {
      $api.get("/api").then((res) => {
        artboard.value = res;
      });
    });

    async function onArtUpdate(x, y, color) {
      const board = await $api.post("/api", {
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
