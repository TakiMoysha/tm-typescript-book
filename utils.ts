export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));


export function isPromiseLike<T>(obj: any): obj is PromiseLike<T> {
  return obj && typeof obj.then === "function";
}
