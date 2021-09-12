<template>
  <div class="container flex flex-col justify-center">
    <input v-model="color" class="absolute top-0 left-0" type="color" /><br />
    <Art
      class="w-full"
      v-if="artboard !== null"
      :artboard="artboard"
      :color="color"
      @update="onArtUpdate"
    />
  </div>
</template>

<script lang="ts">
import Art from "../components/Art.vue";
import Api from "../service/api";
import type { ArtBoard } from "../components/Art.vue";
import { onMounted, ref, inject } from "vue";

export default {
  components: { Art },
  setup(props, config) {
    const $api: Api = inject("$api");
    const artboard = ref(null);
    const color = ref("#000000");

    function serializeArtboard(artboard: ArtBoard): string {
      return JSON.stringify(artboard);
    }

    onMounted(() => {
      $api.get("/api").then((res) => {
        artboard.value = res;
      });
    });

    function onArtUpdate(artboard: ArtBoard) {
      return $api.post("/api", serializeArtboard(artboard));
    }

    return {
      artboard,
      color,
      onArtUpdate,
    };
  },
};
</script>

<style scoped></style>
