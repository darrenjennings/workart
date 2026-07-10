<template>
  <div class="w-content">
    <router-link
      :to="{ name: 'View', params: { date: art.key } }"
      v-for="art in data"
      class="float-left"
      :key="art.value.timestamp"
    >
      <Art
        class="w-full"
        v-if="art !== undefined"
        :artboard="art.value"
        :cell-dimension="'3px'"
        :has-grid-lines="false"
        readonly
      />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Art from "../components/Art.vue";
import { data as archiveData } from "../data/data_archive";

const props = defineProps<{
  year: string;
}>();

const data = computed(() =>
  archiveData.filter((art) => art.key.startsWith(`${props.year}-`)),
);
</script>
