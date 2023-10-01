import { sleep, isPromiseLike } from "../utils.ts";

type initializer<T> = (resolve: Resolve<T>, reject: Reject) => void;

type AnyFunction = (...args: any[]) => any;
type Resolve<T> = (value: T) => void;
type Reject = (reason?: any) => void;

type Status = "fulfilled" | "rejected" | "pending";

export class TMPromise<T> {
  thenCb: [AnyFunction, Resolve<T>][] = [];
  catchCb: [AnyFunction, Reject][] = [];
  status: Status = "pending";
  value: T | null = null;
  error?: any;

  constructor(initializer: initializer<T>) {
    initializer(this.resolve, this.reject);
  }

  then = (thenCb: (value: T) => void) => {
    return new TMPromise((resolve, reject) => {
      this.thenCb.push([thenCb, resolve]);
    });
  };

  catch = (catchCb: (reason?: any) => void) => {
    return new TMPromise((resolve, reject) => {
      this.catchCb.push([catchCb, reject]);
    });
  };

  private resolve = (value: T | PromiseLike<T>) => {
    if (isPromiseLike(value)) {
      value.then(this.resolve, this.reject);
      return;
    }

    this.status = "fulfilled";
    this.value = value;
    this.process();
  };

  private reject = (reason?: any) => {
    this.status = "rejected";
    this.error = reason;
    this.process();
  };

  private process = () => {
    if (this.status === "pending") {
      return;
    } else if (this.status === "fulfilled") {
      const thenCbs = this.thenCb;
      this.thenCb = [];
      thenCbs.forEach(([thenCb, resolve]) => {
        const value = thenCb();
      });

      // this.resolve(this.value);
    } else if (this.status === "rejected") {
      // this.reject(this.reason);
    } else {
      throw new Error("Promise is not prevented status invariant.");
    }
  };
}
