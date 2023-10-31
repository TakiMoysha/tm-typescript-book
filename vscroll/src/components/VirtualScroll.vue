<script setup lang="ts">
const props = defineProps(["title"]);
</script>

<template>
  <div>
    <h2>{{ props.title }}</h2>
    <p>Hello, this is my v-scroll</p>
  </div>
</template>
