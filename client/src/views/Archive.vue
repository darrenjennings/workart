<template>
  <ul class="font-mono">
    <li :key="date" v-for="date in datesISO">
      <router-link :to="{ name: 'View', params: { date } }">
        {{ date }}
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
function getDaysArray(start: Date, end: Date) {
  const arr = [];
  for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
}

const dates = getDaysArray(new Date("2021-09-11"), new Date());
const datesISO = dates.map((d) => d.toISOString().split("T")[0]).reverse();
</script>

<style scoped>
* {
  all: revert;
}
</style>
