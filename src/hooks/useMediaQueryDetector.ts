import { useEffect, useRef } from 'react';
import { Dimensions } from 'react-native';
import type { indexType } from 'src/types';
import store from '../createStore';
import { getDevicetype } from '../utill/getDeviceType';
import initializeBreakpoints from '../utill/initializeBreakpoints';

const useMediaQueryDetector = (data: {
  defaultBreakPoints: {
    [key: indexType]: number;
  };
}) => {
  let activeMediaQuery = useRef('');
  let listenerRef = useRef<any>({});

  useEffect(() => {
    let currentWidth = Dimensions.get('window').width;
    store.store.setState((state: object) => ({
      ...state,
      width: currentWidth,
      device: getDevicetype(currentWidth, data.defaultBreakPoints),
      defaultBreakPoints: data.defaultBreakPoints,
      breakpoints: {
        ...initializeBreakpoints(data.defaultBreakPoints),
      },
    }));
  }, [data.defaultBreakPoints]);

  useEffect(() => {
    if (listenerRef?.current?.remove) listenerRef?.current?.remove();
    listenerRef.current = Dimensions.addEventListener(
      'change',
      ({ window }) => {
        let device = getDevicetype(window.width, data.defaultBreakPoints);
        if (device !== activeMediaQuery.current) {
          // setActiveDevice({ width: window.width, device });
          activeMediaQuery.current = device;
          store.store.setState((state: object) => ({
            ...state,
            width: window.width,
            device,
          }));
        }
      }
    );
    return () => listenerRef?.current?.remove();
  }, [data.defaultBreakPoints]);
};

export default useMediaQueryDetector;
