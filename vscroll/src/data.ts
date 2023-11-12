interface ILoadDataOpts {
  type: "simple";
  count: number;
}
export const loadData = (opts?: ILoadDataOpts) => {
  const generators = {
    simple: Array.from({ length: opts?.count || 10_000 }, (_, index) => ({
      id: Math.random().toString(36).slice(2),
      text: String(index),
    })),
  };
  const type = opts?.type || "simple";
  return generators[type];
};
