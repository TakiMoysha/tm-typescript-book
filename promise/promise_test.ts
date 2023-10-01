import { sleep } from "../utils.ts";

Deno.test("Defalt Prmose behavior", async () => {
  await new Promise<number>((resolve, _reject) => {
    setTimeout(() => {
      resolve(5);
    }, 1000);
  })
    .then((_res) => {
      console.log("res-1");
      return sleep(3_000);
    })
    .then((res) => {
      console.log("res:", res);
    })
    .catch((err) => {
      console.log("err:", err);
    });
});

Deno.test("Default Promise behavior", async () => {
  const promise = new Promise<number>((resolve, _reject) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
  const promise2 = promise.then((res) => {
    console.log("res-2:", res);
  });

  await promise2
});
