function destructFunc() {
  return {
    first: 1,
    second: 2
  }
} 

const { first, second }: { first: number, second: number} = destructFunc();

