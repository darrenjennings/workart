<template>
  <table>
    <tbody>
      <tr v-for="column in columns" :key="column">
        <td
          @click.meta="pickColor"
          @click.exact="(e) => !readonly && paint(row, column, color, e.target)"
          v-for="row in rows"
          :key="row"
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
import { ref, withDefaults } from "vue";
import type { Ref } from "vue";

const props = withDefaults(
  defineProps<{
    artboard: ArtBoard;
    color: string;
    readonly?: boolean;
  }>(),
  {
    readonly: false,
  }
);

export interface ArtBoard {
  grid: { [i: number]: { [j: number]: { color: string } } } | undefined;
  timestamp: number;
}

const emit = defineEmits(["update"]);
const columns = 20;
const rows = 20;
const board: Ref<ArtBoard> = ref({
  grid: props?.artboard.grid || {},
  timestamp: Date.now(),
});

function rgbToHex(r: string, g: string, b: string) {
  const hex = (i: string) => parseInt(i).toString(16);
  return "#" + hex(r) + hex(g) + hex(b);
}

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
table {
  min-width: 600px;
  width: 600px;
}
td {
  display: table-cell;
  border: 1px solid darkgrey;
  width: 30px;
  height: 30px;
  overflow: hidden;
}
</style>
