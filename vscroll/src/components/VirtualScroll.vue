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
const itemHeight = 40;
const containerHeight = 1200; // computed from viewport
const overscan = 5;
const scrollingDelay = 100;

// data
import { loadData } from "@/data";
const data = loadData();
// virtual scrolling
const scrollTop = ref(0);
const scrollElementRef = ref<HTMLDivElement>(null);
const isScrolling = ref(false);
const totalListHeight = computed(() => itemHeight * data.length);

let scrollingTimeoutId: number | null = null;

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
const handleScroll = () => {
  scrollTop.value = scrollElementRef.value?.scrollTop;
  state.setScrollTop(scrollTop.value);

  isScrolling.value = true;
  state.debugValue["isScrolling"] = true;

  if (typeof scrollingTimeoutId === "number") {
    clearTimeout(scrollingTimeoutId);
  }

  scrollingTimeoutId = setTimeout(() => {
    isScrolling.value = false;
    state.debugValue["isScrolling"] = false;
  }, scrollingDelay); 
};
</script>

<template>
  <div>
    <h2>{{ props.title }}</h2>
    <span>{{ totalListHeight }}</span>
    <div class="table-responsive-lg" ref="scrollElementRef" @scroll="handleScroll" :style="{
      height: '73vh',
      overflow: 'auto',
      border: '1px inset black',
    }">
      <div :style="{ height: totalListHeight + 'px' }">
        <table class="table table-striped table-sm" style="position: sticky; top: 0px">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Num</th>
              <th scope="col">Proxy</th>
              <th scope="col">Object</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prx of proxyEntriesToRender" :key="prx.index"
              style="{ height: itemHeight + 'px'}">
              <template v-if="isScrolling">
                <td v-if="isScrolling">Scrolling...</td>
                <td v-if="isScrolling"></td>
                <td v-if="isScrolling"></td>
                <td v-if="isScrolling"></td>
              </template>
              <template v-else>
                <td>{{ data[prx.index].id }}</td>
                <td>{{ data[prx.index].text }}</td>
                <td>{{ prx }}</td>
                <td>{{ data[prx.index] }}</td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
