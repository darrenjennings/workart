<template>
  <div class="container flex justify-center">
    <Art
      class="w-full"
      v-if="data !== undefined"
      :artboard="data"
      :color="color"
      readonly
    />
    <div v-if="error">
      <b>{{ error.status }}</b>
      <span class="font-thin px-2">|</span><span>{{ error.statusText }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import useRequest from "../composables/useRequest";

import Art from "../components/Art.vue";
import type { ArtBoard } from "../components/Art.vue";

export default {
  components: { Art },
  setup(props, config) {
    const route = useRoute();
    const color = ref("#000");

    const { data, error } = useRequest<ArtBoard>(`/api/${route.params.date}`);

    return {
      data,
      error,
      color,
    };
  },
};
</script>
