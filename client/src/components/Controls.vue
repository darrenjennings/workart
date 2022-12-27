<template>
  <div class="absolute -top-10 right-0">
    <button
      title="toggle grid"
      class="my-focus-ring float-left mr-1"
      @click="toggleGridLines"
    >
      👀
    </button>
    <template v-if="hasColorPicker">
      <button
        title="Pick a random new color"
        class="my-focus-ring float-left"
        @click="recomputeColor"
      >
        <refresh-icon />
      </button>
      <ColorPicker class="my-focus-ring" v-model="selectedColor" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RefreshIcon from "../components/RefreshIcon.vue";
import ColorPicker from "../components/ColorPicker.vue";
import { randomHexColor } from "../colorUtils";

const props = withDefaults(
  defineProps<{
    hasColorPicker?: boolean;
  }>(),
  {
    hasColorPicker: false,
  }
);

const emit = defineEmits(["onColorUpdate", "onToggleGridLines"]);

const hasGridLines = ref(true);
const selectedColor = ref();

function recomputeColor() {
  selectedColor.value = randomHexColor();
  emit("onColorUpdate", selectedColor.value);
}

function toggleGridLines() {
  hasGridLines.value = !hasGridLines.value;
  emit("onToggleGridLines", hasGridLines.value);
}

// Initialize
recomputeColor();
</script>

<style scoped>
button,
input {
  height: 30px;
  width: 30px;
}
</style>
