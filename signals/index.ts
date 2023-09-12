interface ISignal<Value> {
  value: Value;
}

interface IComputedSignal<Value> {
  readonly value: Value;
}

interface EffectCallback {
  isActive: boolean;
  isRunning: boolean;
  deps: Signal<unknown>[];
  (): void;
}

let runningEffect: EffectCallback | null = null;

class Signal<Value> implements ISignal<Value> {
  private savedValue: Value;
  private deps = new Set<EffectCallback>();

  constructor(value: Value) {
    this.savedValue = value;
  }

  get value() {
    this.addDependency();
    return this.savedValue;
  }

  set value(newValue: Value) {
    if (Object.is(newValue, this.savedValue)) return;
    this.savedValue = newValue;
    this.runDependencies();
  }

  protected addDependency() {
    if (!runningEffect) return;

    this.deps.add(runningEffect);
    runningEffect.deps.push(this);
  }

  protected runDependencies() {
    const depsToRun = { ...this.deps };
    depsToRun.forEach((cb) => cb());
  }

  removeDependency(cb: EffectCallback) {
    this.deps.delete(cb);
  }
}

export function signal<Value>(value: Value): ISignal<Value> {
  return new Signal(value);
}

export function effect(callback: VoidFunction) {
  const effectCb: EffectCallback = () => {
    if (effectCb.isRunning || !effectCb.isActive) return;

    effectCb.deps.forEach((signal) => signal.removeDependency(effectCb));

    effectCb.isRunning = true;
    const previousEffect = runningEffect;
    runningEffect = effectCb;

    try {
      callback();
    } catch (e) {
      console.log("an error happened inside effect: ", e);
      throw e;
    } finally {
      runningEffect = previousEffect;
      effectCb.isRunning = false;
    }
  };

  effectCb.deps = [];
  effectCb.isRunning = false;
  effectCb.isActive = true;
  effectCb();

  return () => {
    effectCb.isActive = false;
    effectCb.deps.forEach((signal) => signal.removeDependency(effectCb));
    effectCb.deps.length = 0;
  };
}

class ComputedSignal<Value> extends Signal<Value> {
  private _compute: () => Value;
  private _value: Value;
  private _isDirty = true;
  private _disposeEffect: VoidFunction | null = null;

  constructor(compute: () => Value) {
    super(undefined as Value);
    this._compute = compute;
  }

  override get value() {
    if (this._isDirty) this.updateEffectValue();
    this.addDependency();
    return this._value;
  }

  private updateEffectValue() {
    return effect(() => {
      if (this._isDirty) {
        this._value = this._compute();
        this._isDirty = false;
      } else {
        this._isDirty = true;
        this._disposeEffect?.();
        this.runDependencies();
      }
    });
  }
}

export function computed<Value>(compute: () => Value): IComputedSignal<Value> {
  return new ComputedSignal(compute);
}
