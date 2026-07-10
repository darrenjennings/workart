<template>
  <section title="Archive" class="w-content">
    <section>
      <h2>By Year</h2>
      <ul class="font-mono">
        <li :key="year" v-for="year in years">
          <router-link :to="{ name: 'Year', params: { year } }">
            {{ year }}
          </router-link>
        </li>
      </ul>
    </section>
    <section>
      <h2>By Day</h2>
      <ul class="font-mono">
        <li :key="date" v-for="date in datesISO">
          <router-link :to="{ name: 'View', params: { date } }">
            {{ date }} {{ dataDates.has(date) ? "🎨" : "" }}
          </router-link>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { data } from "../data/data_archive";

function getDaysArray(start: Date, end: Date) {
  const arr = [];
  for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
}

const dataDates = new Set(data.map((item) => item.key));
const years = computed(() =>
  [...new Set(data.map((item) => item.key.split("-")[0]))].sort().reverse(),
);
const dates = getDaysArray(new Date("2021-09-11"), new Date());
const datesISO = dates.map((d) => d.toISOString().split("T")[0]).reverse();
</script>

<style scoped>
* {
  all: revert;
}
</style>
