<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
const props = defineProps(["title"]);

//state
import { state } from "@/state";

// data
import { loadData } from "@/data";
const data = loadData();
// virtual scrolling
const scrollTop = ref(0);
const setScrollTop = ref(0);
const scrollElementRef = ref<HTMLDivElement>(null);

const computedScrollTop = computed(() => {
  return scrollTop.value;
});

onMounted(() => {
  window.scrollTo(0, 0);
});
(() => {
  console.log(scrollTop)
  state.debugValue = {
    scrollTop: computedScrollTop.value,
    setScrollTop: setScrollTop.value,
  };
})
</script>

<template>
  <div>
    <h2>{{ props.title }}</h2>
    <div class="table-responsive-lg" :style="{ height: '73vh', overflow: 'auto', border: '1px inset black' }">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Header</th>
            <th scope="col">Header</th>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="(item, index) in data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.text }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
