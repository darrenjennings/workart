<template>
  <table>
    <tbody>
      <tr v-for="column in columns" :key="column">
        <td
          @click="(e) => paint(row, column, e.target)"
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
import { ref, defineProps, defineEmits } from "vue";
import type { Ref } from "vue";

const props = defineProps<{
  artboard: ArtBoard;
  color: string;
}>();

export interface ArtBoard {
  grid: {} | undefined;
  timestamp: number;
}

const emit = defineEmits(["update"]);
const columns = 20;
const rows = 20;
const board: Ref<ArtBoard> = ref({
  grid: props?.artboard.grid || {},
  timestamp: Date.now(),
});

function paint(row: number, column: number, el: HTMLElement) {
  const payload = { color: props.color };
  if (!board.value.grid[row]) {
    board.value.grid[row] = { [column]: payload };
  } else {
    board.value.grid[row][column] = payload;
  }
  el.style.backgroundColor = props.color;
  emit("update", board.value);
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
