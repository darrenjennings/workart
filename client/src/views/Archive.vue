<template>
  <ul class="font-mono">
    <li :key="date" v-for="date in datesISO">
      <a :href="date">{{ date }}</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
function getDaysArray(start, end) {
  for (
    var arr = [], dt = new Date(start);
    dt <= end;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
}

const dates = getDaysArray(new Date("2021-09-10"), new Date());
const datesISO = dates.map((d) => d.toISOString().split("T")[0]).reverse();
</script>

<style scoped>
* {
  /* font-family: monospace !important; */
  all: revert;
}
</style>
