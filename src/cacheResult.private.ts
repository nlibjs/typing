export const cacheResult = <T>(fn: () => T): (() => T) => {
  let cached: { value: T } | undefined;
  return () => {
    if (cached) {
      return cached.value;
    }
    const value = fn();
    cached = { value };
    return value;
  };
};
