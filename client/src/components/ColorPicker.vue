<template>
  <input
    type="color"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script lang="ts">
export default {
  props: ["modelValue"],
  emits: ["update:modelValue"],
};
</script>

<style scoped>
input {
  border-radius: 10%;
  border: 1px solid darkgrey;
  outline: none;
  -webkit-appearance: none;
}
input::-webkit-color-swatch-wrapper {
  padding: 0;
}
input::-webkit-color-swatch {
  border: none;
  border-radius: 10%;
}
</style>
