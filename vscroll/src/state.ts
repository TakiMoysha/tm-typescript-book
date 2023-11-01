import { reactive, ref } from "vue";

export const state = reactive({
  debugValue: {
    scrollTop: 0,
  },
  setScrollTop: (scrollTop: number) => {
    state.debugValue.scrollTop = scrollTop;
  }
})

export const useState = (value: any) => {
  const _value = ref(value);
  const setter = (newValue: any) => {
    _value = newValue
  };
  return [
    value,
    setter
  ]
}
