<template>
  <div class="absolute" v-if="grid !== undefined">
    <Art
      :artboard="grid"
      :active-cell="activeCell"
      :color="selectedColor"
      :hasGridLines="hasGridLines"
      @update="onArtUpdate"
    />
    <Controls
      has-color-picker
      :selected-color="selectedColor"
      @onColorUpdate="(color) => (selectedColor = color)"
      @onToggleGridLines="(toggled) => (hasGridLines = toggled)"
    />
  </div>
</template>

<script lang="ts">
import { ref, inject, computed } from "vue";
import Art from "../components/Art.vue";
import Controls from "../components/Controls.vue";
import Api from "../service/api";
import type { ArtBoard } from "../components/Art.vue";

import useRequest, { updateCache } from "../composables/useRequest";
import { getDefaultDateFormat } from "../dateUtils";
import { randomHexColor } from "../colorUtils";

export default {
  components: { Art, Controls },
  setup() {
    const selectedColor = ref(randomHexColor());
    const hasGridLines = ref(true);
    const activeCell = ref([]);
    const $api = inject<Api>("$api");
    const { data, error } = useRequest<ArtBoard>(`/api`, {
      shouldRetryOnError: false,
      dedupingInterval: 1000,
      revalidateOnFocus: true,
    });

    async function onArtUpdate(color: string, x?: number, y?: number) {
      // If only color is incoming, then we can just update the selected color
      if (x === undefined && y === undefined) {
        selectedColor.value = color;
        return;
      }

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
      activeCell.value = [x, y];
    }

    const grid = computed<ArtBoard | null>(() => {
      return data.value ?? { grid: null, timestamp: Date.now() };
    });

    return {
      grid,
      error,
      selectedColor,
      hasGridLines,
      activeCell,
      onArtUpdate,
    };
  },
};
</script>
