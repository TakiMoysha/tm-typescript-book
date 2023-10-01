import { sleep } from "../utils.ts";
import { TMPromise } from "./index.ts";

Deno.test("TM Promise behavior", async () => {
  const prom = new TMPromise<number>((resolve, _reject) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  })
    .then((res) => {
      console.log("res:", res);
    })
    .catch((err) => {
      console.log("err:", err);
    });

  await prom;
});
