((global) => {
  const store = {};

  const devideEventName = (eventName = '') => {
    const arr = eventName.split('.');
    return {
      et: arr.shift(),
      ns: arr,
    };
  };

  const notIncludesAllNames = (ns, storeNs) => (
    ns.some(nameSpace => !storeNs.includes(nameSpace))
  );

  global.pubsub = {
    sub(eventName, fn) {
      const { et, ns } = devideEventName(eventName);
      if (!et) return;
      ns.fn = fn;
      store[et] = store[et] || [];
      store[et].push(ns);
    },

    unsub(eventName) {
      const { et, ns } = devideEventName(eventName);
      Object.keys(store).forEach((key) => {
        if (et && key !== et) return;
        store[key] = store[key].filter(storeNs => notIncludesAllNames(ns, storeNs));
      });
    },

    pub(eventName, ...args) {
      const { et, ns } = devideEventName(eventName);
      if (!et || !store[et]) return;
      store[et].forEach((storeNs) => {
        if (notIncludesAllNames(ns, storeNs)) return;
        storeNs.fn.apply(global, args); // faster than spread operator
      });
    },
  };
})(this);
