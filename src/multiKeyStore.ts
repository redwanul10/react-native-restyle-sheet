import type { Config } from './types';

class multiKeyStore {
  cache: any;

  constructor() {
    this.cache = new Map();
  }

  set(key1: any, key2: any, value: Config) {
    let subCache = this.cache.get(key1);

    if (!subCache) {
      subCache = new Map();
      this.cache.set(key1, subCache);
    }

    subCache.set(key2, value);
  }
  get(key1: any, key2: any) {
    const subCache = this.cache.get(key1);
    return subCache ? subCache.get(key2) : undefined;
  }
  delete(key1: any, key2: any) {
    const subCache = this.cache.get(key1);
    subCache.delete(key2);
  }

  clear() {
    this.cache.clear();
  }
}

export default multiKeyStore;
