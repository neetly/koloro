const Storage = {
  getItem: <Value = unknown>(key: string) => {
    try {
      const value = localStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value) as Value;
      }
    } catch {} // eslint-disable-line no-empty
    return null;
  },

  setItem: <Value = unknown>(key: string, value: Value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {} // eslint-disable-line no-empty
  },
};

export { Storage };
