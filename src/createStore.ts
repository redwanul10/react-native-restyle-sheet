import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector';
import shallowEqual from './utill/shallowEqual';

const initStore = (initialState: object) => {
  let state = initialState;
  const listeners = new Set();

  const getState = () => {
    return state;
  };

  const setState = (stateOrCb: any) => {
    state = typeof stateOrCb === 'function' ? stateOrCb(state) : stateOrCb;
    listeners.forEach((listener: any) => listener());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { state, setState, getState, subscribe };
};

const createStore = (initialState: object) => {
  const store = initStore(initialState);
  const useStore = (selector?: any, shEqueal?: any) => {
    return useSyncExternalStoreWithSelector(
      store.subscribe,
      store.getState,
      store.getState,
      selector,
      shEqueal || shallowEqual
    );
  };
  return { useStore, store };
};

const store = createStore({});

export default store;
