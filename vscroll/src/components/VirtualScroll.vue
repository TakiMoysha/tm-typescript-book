<script setup lang="ts">
import { onMounted, ref } from "vue";
const props = defineProps(["title"]);

// virtual scrolling
const scrollTop = ref(0);
const setScrollTop =  ref(0);
const scrollElementRef = ref<HTMLDivElement>(null);

onMounted(() => {
  window.scrollTo(0, 0);
});

</script>

<template>
  <div>
    <h2>{{ props.title }}</h2>
    <table></table>
  </div>
</template>
