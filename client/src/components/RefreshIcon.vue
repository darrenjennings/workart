<template>
  <svg
    class="fill-current"
    :width="props.width"
    :height="props.height"
    viewBox="0 -1 16 16"
    id="refresh-16px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M35.854,7.146a.5.5,0,0,0-.708,0L34,8.293V8a7,7,0,1,0-7,7,.5.5,0,0,0,0-1,6,6,0,1,1,6-6v.293L31.854,7.146a.5.5,0,0,0-.708.708l2,2a.518.518,0,0,0,.163.109.5.5,0,0,0,.382,0,.518.518,0,0,0,.163-.109l2-2A.5.5,0,0,0,35.854,7.146Z"
      transform="translate(-20 -1)"
    />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    height?: string;
    width?: string;
  }>(),
  {
    height: "20px",
    width: "20px",
  }
);
</script>
