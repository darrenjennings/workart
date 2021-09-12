<template>
  <div class="container flex justify-center">
    <Art
      v-if="artboard !== null"
      :artboard="artboard"
      :color="color"
      @update="onArtUpdate"
    />
    <input v-model="color" type="color" />
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
    const color = ref("black");

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
