<template>
  <table :class="hasGridLines ? `grid-lines` : ''">
    <tbody>
      <tr v-for="column in columns" :key="column">
        <td
          :tabindex="0"
          @click.meta="pickColor"
          @keydown.enter="
            (e) => !readonly && paint(row, column, color, e.target)
          "
          @click.exact="(e) => !readonly && paint(row, column, color, e.target)"
          v-for="row in rows"
          :key="row"
          :width="cellDimension"
          :height="cellDimension"
          :style="{
            backgroundColor:
              board.grid &&
              board.grid[row] &&
              board.grid[row][column] &&
              board.grid[row][column].color,
          }"
        ></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, watchEffect, withDefaults } from "vue";
import type { Ref } from "vue";
import { rgbToHex } from "../colorUtils";

const props = withDefaults(
  defineProps<{
    artboard: ArtBoard | null;
    color?: string;
    cellDimension?: string;
    readonly?: boolean;
    hasGridLines?: boolean;
  }>(),
  {
    color: "#000",
    cellDimension: "30px",
    readonly: false,
    hasGridLines: true,
  }
);

export type ArtBoard = {
  grid: { [i: number]: { [j: number]: { color: string } } } | undefined;
  timestamp: number;
};

const emit = defineEmits(["update"]);
const columns = 20;
const rows = 20;

const board: Ref<ArtBoard> = ref({
  grid: props?.artboard?.grid || {},
  timestamp: Date.now(),
});

watchEffect(() => {
  board.value.grid = props.artboard?.grid;
});

function pickColor(e) {
  const [r, g, b] =
    e.target.style.backgroundColor
      ?.match(/rgb\((.*)\)/)?.[1]
      .split(",")
      .filter(Boolean) || [];
  emit(
    "update",
    r && g && b ? rgbToHex(r, g, b) : "#ffffff",
    undefined,
    undefined
  );
}

function paint(x: number, y: number, color: string, el: HTMLElement) {
  const cellData = { color };
  if (board.value?.grid && !board.value?.grid[x]) {
    board.value.grid[x] = { [y]: cellData };
  } else {
    if (board.value?.grid?.[x]) {
      board.value.grid[x][y] = cellData;
    }
  }
  el.style.backgroundColor = color;
  emit("update", color, x, y);
}
</script>

<style scoped>
td {
  display: table-cell;
  overflow: hidden;
}
.grid-lines td {
  border: 1px solid darkgrey;
}
</style>
