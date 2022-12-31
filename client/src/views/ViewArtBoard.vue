<template>
  <div class="absolute flex justify-center">
    <Art
      v-if="data !== undefined"
      :artboard="data"
      readonly
      :hasGridLines="hasGridLines"
    />
    <div v-if="error">
      <b>{{ error.status }}</b>
      <span class="font-thin px-2">|</span
      ><span>{{
        error.statusText ||
        (error.status == "404" ? "Not found." : "There was an error.")
      }}</span>
    </div>
    <Controls @onToggleGridLines="(toggled) => (hasGridLines = toggled)" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import useRequest from "../composables/useRequest";

import Art from "../components/Art.vue";
import Controls from "../components/Controls.vue";
import type { ArtBoard } from "../components/Art.vue";

export default {
  components: { Art, Controls },
  setup() {
    const route = useRoute();
    const hasGridLines = ref(true);
    const { data, error } = useRequest<ArtBoard>(`/api/${route.params.date}`);

    return {
      data,
      error,
      hasGridLines,
    };
  },
};
</script>
