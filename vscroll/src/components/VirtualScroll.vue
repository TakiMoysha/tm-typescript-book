<script setup lang="ts">
import { state } from "@/state";
import { onMounted, ref, computed, watch, reactive } from "vue";
const props = defineProps(["title", "reverse"]);

// reverse // todo: wip
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

const proxyEntriesToRender = computed(() => {
  const rangeStart = scrollTop.value;
  const rangeEnd = rangeStart + containerHeight;
  const _startIndex = Math.floor(rangeStart / itemHeight);
  const _endIndex = Math.ceil(rangeEnd / itemHeight);
  let startIndex = _startIndex < 0 ? 0 : _startIndex;
  // let startIndex = Math.max(_startIndex, 0);
  let endIndex = _endIndex > data.length - 1 ? data.length - 1 : _endIndex;
  // let endIndex = Math.min(endIndex, data.length - 1);
  const virtualEntries = [];
  for (let index = startIndex; index <= endIndex; index++) {
    virtualEntries.push({
      index,
      offsetTop: index * itemHeight,
    });
  }
  return virtualEntries;
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
      <div :style="{ height: totalListHeight + 'px' }">
        <table class="table table-striped table-sm" style="position: sticky; top: 0px">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Body</th>
              <th scope="col">Real id</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prx of proxyEntriesToRender" :key="prx.index">
              <td>{{ data[prx.index].id }}</td>
              <td>{{ data[prx.index].text }}</td>
              <td>{{ prx }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
