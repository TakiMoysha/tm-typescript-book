type State = {
  openModal: boolean;
  entity: {
    id: string;
    name: string;
  };
};
type Properties = keyof State;

function someFn(arg1: boolean, arg2: Record<string, unknown>) {}
type SomeFnArgs = Parameters<typeof someFn>;
