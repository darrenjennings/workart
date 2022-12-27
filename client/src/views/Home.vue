<template>
  <div class="absolute" v-if="grid !== undefined">
    <Art
      :artboard="grid"
      :active-cell="activeCell"
      :color="selectedColor"
      @update="onArtUpdate"
    />
    <div class="absolute -top-10 right-0">
      <button class="my-focus-ring float-left mr-2" @click="recomputeColor">
        <refresh-icon />
      </button>
      <ColorPicker class="my-focus-ring" v-model="selectedColor" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, inject, computed } from "vue";
import Art from "../components/Art.vue";
import ColorPicker from "../components/ColorPicker.vue";
import Api from "../service/api";
import type { ArtBoard } from "../components/Art.vue";
import RefreshIcon from "../components/RefreshIcon.vue";
import useRequest, { updateCache } from "../composables/useRequest";
import { getDefaultDateFormat } from "../dateUtils";
import { randomHexColor } from "../colorUtils";

export default {
  components: { Art, ColorPicker, RefreshIcon },
  setup() {
    const selectedColor = ref(randomHexColor());
    const activeCell = ref([]);
    const $api = inject<Api>("$api");
    const { data, error } = useRequest<ArtBoard>(`/api`, {
      shouldRetryOnError: false,
      dedupingInterval: 1000,
      revalidateOnFocus: true,
    });

    function recomputeColor() {
      selectedColor.value = randomHexColor();
    }

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
      recomputeColor,
      activeCell,
      onArtUpdate,
    };
  },
};
</script>
