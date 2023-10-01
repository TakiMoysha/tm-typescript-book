import { isPromiseLike, sleep } from "../utils.ts";

type initializer<T> = (resolve: Resolve<T>, reject: Reject) => void;

type AnyFunction = (...args: any[]) => any;
type Resolve<T> = (value: T) => void;
type Reject = (reason?: any) => void;

type Status = "fulfilled" | "rejected" | "pending";

export class TMPromise<T> {
  callbacks: [
    AnyFunction | undefined,
    AnyFunction | undefined,
    Resolve<T>,
    Reject,
  ][] = [];
  status: Status = "pending";
  value: T | null = null;
  error?: any;

  constructor(initializer: initializer<T>) {
    initializer(this.resolve, this.reject);
  }

  then = (thenCb?: (value: T) => void, catchCb?: (reason?: any) => void) => {
    const promise = new TMPromise((resolve, reject) => {
      this.callbacks.push([thenCb, catchCb, resolve, reject]);
    });
    this.process();
    return promise;
  };

  catch = (catchCb?: (reason?: any) => void) => {
    const promise = new TMPromise((resolve, reject) => {
      this.callbacks.push([undefined, catchCb, resolve, reject]);
    });
    this.process();
    return promise;
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
    }

    const cbs = this.callbacks;
    this.callbacks = [];

    cbs.forEach(([thenCb, catchCb, resolve, reject]) => {
      try {
        if (this.status === "fulfilled") {
          const value = thenCb ? thenCb(this.value) : this.value;
          resolve(value);
        } else {
          const reason = catchCb ? catchCb(this.error) : this.error;
          reject(reason);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
}
