import { reactive } from "vue";

export const state = reactive<{
  debugValue: { [key: string]: number | boolean };
  setScrollTop: (scrollTop: number) => void;
}>({
  debugValue: {
    scrollTop: 0,
  },
  setScrollTop: (scrollTop: number) => {
    state.debugValue.scrollTop = scrollTop;
  },
});

// export const useState = (value: any) => {
//   const _value = ref(value);
//   const setter = (newValue: any) => {
//     _value.value = newValue
//   };
//   return [
//     value,
//     setter
//   ]
// }
