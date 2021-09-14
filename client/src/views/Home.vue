<template>
  <div class="absolute top-0 left-0">
    <input v-model="color" type="color" />
  </div>
  <Art
    v-if="grid"
    :key="grid.timestamp"
    class="w-full"
    :artboard="grid"
    :color="color"
    @update="onArtUpdate"
  />
</template>

<script lang="ts">
import { ref, inject, computed } from "vue";
import Art from "../components/Art.vue";
import Api from "../service/api";
import type { ArtBoard } from "../components/Art.vue";
import useRequest, { updateCache } from "../composables/useRequest";
import { getDefaultDateFormat } from "../dateUtils";

export default {
  components: { Art },
  setup() {
    const color = ref("#000000");
    const $api = inject<Api>("$api");
    const { data, error } = useRequest<ArtBoard>(`/api`);

    async function onArtUpdate(x: number, y: number, color: string) {
      const board = await $api?.post("/api", {
        x,
        y,
        color,
      });

      // update the caches
      updateCache(`/api`, {
        grid: board.grid,
        timestamp: Date.now(),
      });
      updateCache(`/api/${getDefaultDateFormat(new Date())}`, {
        grid: board.grid,
        timestamp: Date.now(),
      });
    }

    const grid = computed<ArtBoard>(() => {
      return data.value ?? { grid: {}, timestamp: Date.now() };
    });

    return {
      grid,
      color,
      onArtUpdate,
    };
  },
};
</script>

<style scoped></style>
