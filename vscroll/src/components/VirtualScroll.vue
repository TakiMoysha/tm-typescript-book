<script setup lang="ts">
import { state } from "@/state";
import { onMounted, ref, computed, watch, reactive } from "vue";
const props = defineProps(["title", "reverse"]);

// reverse
watch(
  () => props.reverse,
  () => {
    console.log("REVERSE");
    data.reverse();
  },
);

// simple vscroll consts
const itemHeight = 30;
const containerHeight = 1200; // computed from viewport
const overscan = 5;

// data
import { loadData } from "@/data";
const data = loadData();
// virtual scrolling
const scrollTop = ref(0);
const scrollElementRef = ref<HTMLDivElement>(null);
const totalListHeight = computed(() => itemHeight * data.length);

const itemsToRender = computed(() => {
  const rangeStart = scrollTop.value;
  const rangeEnd = rangeStart + containerHeight;
  const _startIndex = Math.floor(rangeStart / itemHeight);
  const _endIndex = Math.ceil(rangeEnd / itemHeight);
  let startIndex = _startIndex < 0 ? 0 : _startIndex;
  // let startIndex = Math.max(_startIndex, 0);
  let endIndex = _endIndex > data.length - 1 ? data.length - 1 : _endIndex;
  // let endIndex = Math.min(endIndex, data.length - 1);
  return data.slice(startIndex, endIndex + 1);
});
const handlerScroll = () => {
  scrollTop.value = scrollElementRef.value?.scrollTop;
  state.setScrollTop(scrollTop.value);
};
</script>

<template>
  <div>
    <h2>{{ props.title }}</h2>
    <span>{{ totalListHeight }}</span>
    <div class="table-responsive-lg" ref="scrollElementRef" @scroll="handlerScroll"
      :style="{ height: '73vh', overflow: 'auto', border: '1px inset black' }">
      <div :style="{ height: totalListHeight + 'px', }">

        <table class="table table-striped table-sm" style="position: sticky; top: 0px;">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Header</th>
              <th scope="col">Header</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in itemsToRender" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.id }}</td>
              <td>{{ item.text }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
