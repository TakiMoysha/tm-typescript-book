export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}


class TMObject {
  constructor(private text: string, private level: number) {}
}

class TMObjectSetter {
  constructor(private _text: string, private _level: number) {}

  set text(value: string) {
    console.log(`Setting text to ${value}`)
    this._text = value
  }

  set level(value: number) {
    console.log(`Setting level to ${value}`)
    this._level = value
  }
}

const o = new TMObject("hello", 1);
console.log(Object.assign(o, { text: "world", level: 2 }))
const os = new TMObjectSetter("hello", 1);
console.log(Object.assign(os, { text: "world", level: 2 }))
