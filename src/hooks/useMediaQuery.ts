import { createContext, useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import store from '../createStore';

import shallowEqual from '../utill/shallowEqual';

export const ProviderContext = createContext({});

const detectCustomMediaQuery = (
  width: number,
  min: number,
  max: number
): boolean => {
  if (width > min && width < max) {
    return true;
  }
  if (width > min && !max) {
    return true;
  }
  if (width < max && !min) {
    return true;
  }
  return false;
};

type Props = {
  min?: number;
  max?: number;
};

const useMediaQuery = (props: Props): string | boolean => {
  // const { device } = useContext<any>(ProviderContext);
  const device: any = store.useStore(
    (state: any) => state.device,
    (prev: any, current: any) => {
      if (props) return true;
      return shallowEqual(prev, current);
    }
  );
  const listenerRef = useRef<any>();
  const [isActive, setIsActive] = useState<boolean>(false);
  const isActiveRef = useRef(false);

  useEffect(() => {
    if (props?.min || props?.max) {
      const width = Dimensions.get('window').width;
      let result = detectCustomMediaQuery(
        width,
        props?.min || 0,
        props.max || 0
      );
      setIsActive(result);

      if (listenerRef?.current?.remove) listenerRef.current?.remove();
      listenerRef.current = Dimensions.addEventListener(
        'change',
        ({ window }) => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          let result = detectCustomMediaQuery(
            window.width,
            props.min || 0,
            props.max || 0
          );
          if (result !== isActiveRef.current) {
            setIsActive(result);
            isActiveRef.current = result;
          }
        }
      );
    }
    return () => listenerRef?.current?.remove();
  }, [props?.min, props?.max]);

  return props ? isActive : device;
};

export default useMediaQuery;
