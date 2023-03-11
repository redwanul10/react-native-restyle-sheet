import React, { useEffect, useState } from 'react';
import { breakPointMethods } from './mediaQuery';
import initializeBreakpoints, {
  BreakpointDetail,
} from './utill/initializeBreakpoints';
import useMediaQueryDetector from './hooks/useMediaQueryDetector';
import store from './createStore';
import { getDevicetype } from './utill/getDeviceType';
import { Dimensions } from 'react-native';
import type { indexType } from './types';

type Props = {
  breakpoints: { [key: indexType]: number };
  theme?: {
    themeId?: string;
    [key: indexType]: any;
  };
  children: JSX.Element;
};

const ScreenWidth = Dimensions.get('window').width;

const ResponsiveProvider = ({ breakpoints, theme, children }: Props) => {
  const [detailBreakPoints, setDetailBreakPoints] =
    useState<null | BreakpointDetail>(null);

  useMediaQueryDetector({
    defaultBreakPoints: breakpoints,
  });

  useEffect(() => {
    setDetailBreakPoints(initializeBreakpoints(breakpoints));

    store.store.setState({
      device: getDevicetype(ScreenWidth, breakpoints),
      width: ScreenWidth,
      defaultBreakPoints: breakpoints,
      breakpoints: {
        ...initializeBreakpoints(breakpoints),
      },
      breakPointMethods: {
        ...breakPointMethods,
      },
      theme: {
        themeId: theme?.themeId || '@random',
        ...theme,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    store.store.setState((state: any) => ({
      ...state,
      theme: { ...state.theme, ...theme },
    }));
  }, [theme]);

  return <>{detailBreakPoints && children}</>;
};

export default ResponsiveProvider;
