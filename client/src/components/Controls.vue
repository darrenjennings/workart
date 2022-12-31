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
        @click="recomputeColor(randomHexColor())"
      >
        <RefreshIcon />
      </button>
      <ColorPicker
        class="my-focus-ring"
        v-model="newColor"
        @change="onColorPickerUpdated"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import RefreshIcon from "../components/RefreshIcon.vue";
import ColorPicker from "../components/ColorPicker.vue";
import { randomHexColor } from "../colorUtils";

const props = withDefaults(
  defineProps<{
    selectedColor?: string;
    hasColorPicker?: boolean;
  }>(),
  {
    selectedColor: undefined,
    hasColorPicker: false,
  }
);

const emit = defineEmits(["onColorUpdate", "onToggleGridLines"]);

const hasGridLines = ref(true);
const newColor = ref(props.selectedColor);

function toggleGridLines() {
  hasGridLines.value = !hasGridLines.value;
  emit("onToggleGridLines", hasGridLines.value);
}

function recomputeColor(color: string) {
  newColor.value = color;
  emit("onColorUpdate", newColor.value);
}

function onColorPickerUpdated(val: Event) {
  recomputeColor((val.currentTarget as HTMLInputElement).value);
}

// handle inputs such that the color picker and the passed in selected color can
// update the color.
watch(
  () => props.selectedColor,
  () => recomputeColor(props.selectedColor)
);
watch(newColor, () => recomputeColor(newColor.value));

recomputeColor(randomHexColor());
</script>

<style scoped>
button,
input {
  height: 30px;
  width: 30px;
}
</style>
