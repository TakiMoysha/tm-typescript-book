// url_test.ts
import { handler } from "./index.ts";

Deno.test("full", () => {
  const body = { id: 1, name: "test", age: 8, repo: 1481 };
  handler(body)
});

Deno.test("half", () => {
  const body = { id: 1, name: "test" };
  handler(body)
});

Deno.test("single", () => {
  const body = { repo: 1481 };
  handler(body)
});

