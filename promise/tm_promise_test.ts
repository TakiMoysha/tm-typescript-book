import { sleep } from "../utils.ts";
import { TMPromise } from "./index.ts";

Deno.test("TM Promise behavior - sleep", async () => {
  const prom = new TMPromise<number>((resolve, _reject) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  })
    .then((res) => {
      console.log("res:", res);
    return sleep(2_000)
    })
    .catch((err) => {
      console.log("err:", err);
    });

  await prom;
});

Deno.test("TM Promise behavior - async", async () => {
  const promise = new TMPromise((resolve) => {
    resolve(5);
  }).then(console.log) // first
  console.log("asfd"); // second
})
