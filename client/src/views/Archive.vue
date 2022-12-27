<template>
  <section title="Archive" class="w-content">
    <section>
      <h2>By Year</h2>
      <ul class="font-mono">
        <li>
          <router-link :to="{ name: 'Year', params: { year: '2022' } }"
            >2022</router-link
          >
        </li>
      </ul>
    </section>
    <section>
      <h2>By Day</h2>
      <ul class="font-mono">
        <li :key="date" v-for="date in datesISO">
          <router-link :to="{ name: 'View', params: { date } }">
            {{ date }} {{ data.find((item) => item.key == date) ? "🎨" : "" }}
          </router-link>
        </li>
      </ul>
    </section>
  </section>
</template>

<script setup lang="ts">
import { data } from "../data/data2022";
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
