import { sleep } from "../utils.ts";

Deno.test("Defalt Prmose behavior - sleep", async () => {
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

Deno.test("Default Promise behavior - vars", async () => {
  const promise = new Promise<number>((resolve, _reject) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
  const promise2 = promise.then((res) => {
    console.log("res-2:", res);
  });

  await promise2;
});

Deno.test("Default Promise behavior - args", async () => {
  await new Promise<number>((resolve, _reject) => {
    setTimeout(() => {
      resolve(3_000);
    }, 1000);
  })
    .then(
      (res) => {
        console.log("res:", res);
      },
      (err) => {
        console.log("err:", err);
      },
    )
    .catch(console.error);
});

Deno.test("Default Promise behavior - async", async () => {
  // not implemented
  Promise.resolve(5).then(console.log); // first
  console.log("asfd"); // second
});
