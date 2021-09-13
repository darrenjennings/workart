<template>
  <div class="container flex justify-center">
    <Art
      class="w-full"
      v-if="artboard !== null"
      :artboard="artboard"
      :color="color"
      readonly
    />
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute } from "vue-router";

import Art from "../components/Art.vue";
import Api from "../service/api";
import type { ArtBoard } from "../components/Art.vue";
import { onMounted, ref, inject } from "vue";

export default {
  components: { Art },
  setup(props, config) {
    const route = useRoute();
    const $api = inject<Api>("$api");
    const artboard = ref<ArtBoard | null>(null);
    const color = ref("#000000");

    onMounted(() => {
      $api.get(`/api/${route.params.date}`).then((res) => {
        artboard.value = res;
      });
    });

    return {
      artboard,
      color,
    };
  },
};
</script>
