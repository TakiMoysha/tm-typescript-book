class ColumnIterator<T> implements Iterator<T> {
  private index: number;
  private done: boolean;

  constructor(private values: T[]) {
    this.index = 0;
    this.done = false;
  }

  next(): IteratorResult<T, number | undefined> {
    if (this.done) return { done: true, value: undefined };

    if (this.index === this.values.length) {
      this.done = true;
      return { done: true, value: this.index };
    }

    const value = this.values[this.index];
    this.index += 1;
    return { done: false, value };
  }
}

class Column<T> implements Iterable<T> {
  private index: number;

  constructor(private values: T[]) {
    this.index = 0;
  }

  getValues(): T[] {
    return this.values;
  }

  get length(): number {
    return this.values.length;
  }

  [Symbol.iterator](): Iterator<T> {
    return new ColumnIterator(this.values);
  }
  // getNextValue(): T {
  //   if (this.index >= this.length) {
  //     throw "Index out of bounds";
  //   }
  //   const res = this.values[this.index];
  //   this.index++;
  //   return res;
  // }
}

const column = new Column([1, 2, 3, 4, 5, 6]);
for (const value of column) console.log(value);

class BinaryTreeNode<T> {
  constructor(
    public value: T,
    public left?: BinaryTreeNode<T>,
    public right?: BinaryTreeNode<T>,
  ) { }

  get children(): BinaryTreeNode<T>[] {
    const child: BinaryTreeNode<T>[] = [];
    if (this.left) child.push(this.left);
    if (this.right) child.push(this.right);
    return child;
  }
}

class Tree<T = unknown> {
  constructor(public root: BinaryTreeNode<T>) { }
  [Symbol.iterator](): Iterator<BinaryTreeNode<T>> {
    return new BfsIterator(this.root);
  }
}

class BfsIterator<T>
  implements Iterator<BinaryTreeNode<T>, number | undefined> {
  private currentRow: BinaryTreeNode<T>[];
  private currentNodeIndex: number;
  private numberOfNodes: number;
  private done: boolean;
  constructor(root: BinaryTreeNode<T>) {
    this.currentRow = [root];
    this.currentNodeIndex = 0;
    this.numberOfNodes = 0;
    this.done = false;
  }

  next(): IteratorResult<BinaryTreeNode<T>, number | undefined> {
    if (this.done) return { done: true, value: undefined };

    if (this.currentNodeIndex >= this.currentRow.length) {
      this.currentRow = this.getNewRow();
      this.currentNodeIndex = 0;
      if (this.currentRow.length === 0) {
        this.done = true;
        return { done: true, value: this.numberOfNodes };
      }
    }
    const res: IteratorYieldResult<BinaryTreeNode<T>> = {
      done: false,
      value: this.currentRow[this.currentNodeIndex],
    };
    this.currentNodeIndex++;
    this.numberOfNodes++;
    return res;
  }

  private getNewRow(): BinaryTreeNode<T> {
    return this.currentRow.flatMap(node => node.children);
  }
}

const tree = new Tree(new BinaryTreeNode(1, new BinaryTreeNode(2), new BinaryTreeNode(3)));
for (const n of tree) console.log(n.value);
