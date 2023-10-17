// private context
const getProtectedClass = (init_name) => {
  let private_name = init_name;
  class _ProtectedClass {
    constructor() {}
    get name() {
      return private_name;
    }
    set name(value) {
      if (typeof value === "string" && value.length > 8) {
        private_name = value;
        return;
      }
      console.error("Invalid name: ", value);
    }
  }

  return _ProtectedClass;
};

const ProtectClass = getProtectedClass("a;lsdkfj;s");
const instance = new ProtectClass();
console.log(instance.name)
instance.name = "asdf"
console.log(instance.name)
