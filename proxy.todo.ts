const target = {
  server: {},
  client: {},
};

const handler = {
  get(target, prop, receiver) {
    if (prop in target.server) {
      return target.server[prop];
    } else if (prop in target.client) {
      return target.client[prop];
    }
  }
};

const proxyTarget = new Proxy(target, handler);

const newTarget = {}

// bad
proxyTarget.value = newTarget;

// good
// work with reactive component, proxy component, nested component
Object.assign(proxyTarget, newTarget)

