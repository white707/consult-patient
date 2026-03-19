<script setup lang="ts">
import { reactive } from 'vue'
const arr = reactive({
  a: 1,
  b: 2,
})
console.log(arr.a)
console.log(arr.b)
</script>
<template>{{ arr.a }}{{ arr.b }}</template>
<style scoped></style>
