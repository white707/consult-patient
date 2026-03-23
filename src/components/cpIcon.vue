<script setup lang="ts">
defineProps({
  name: {
    type: String,
  },
})
</script>
<template>
  <svg aria-hidden="true" class="cp-icon">
    <use :href="`#icon-${name}`" />
  </svg>
</template>
<style scoped lang="scss">
.cp-icon {
  width: 1em;
  height: 1em;
}
</style>
