<template>
  <div>
    <input
      class="
        focus:ring-blue-600
        focus:ring-4
        focus:ring-offset-2
        focus:ring-opacity-75
        transition
        duration-200
        ease-in-out
      "
      type="color"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
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
  height: 30px;
  width: 30px;
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
