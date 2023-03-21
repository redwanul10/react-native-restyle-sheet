import type { breakpoint, indexType, StyleProps } from './types';
import ReStyleSheet from './ReStyleSheet';
import { Dimensions } from 'react-native';
import { getDevicetype } from './utill/getDeviceType';
import store from './createStore';
import initializeBreakpoints from './utill/initializeBreakpoints';
import { breakPointMethods } from './mediaQuery';

const ScreenWidth = Dimensions.get('window').width;

type ReStyleSheet<F extends { breakpoints: object; theme: object }> = <
  T extends (theme: breakpoint<F>) => StyleProps
>(
  styleFunc: T
) => (
  props?: any,
  size?: boolean | undefined
) => {
  styles: { [key in keyof ReturnType<T>]?: Object };
  deviceType: String;
};

let activeMediaQuery = '';

export const createStyleSheet = <
  T extends {
    breakpoints: { [key: indexType]: number };
    theme: { [key: indexType]: any };
  }
>({
  breakpoints,
  theme,
}: T): {
  changeTheme: (cb: (id: string) => object) => void;
  ReStyleSheet: ReStyleSheet<T>;
} => {
  if (__DEV__) {
    validateArg(theme, breakpoints);
  }

  /**
   * Event Listener
   */
  Dimensions.addEventListener('change', ({ window }) => {
    let device = getDevicetype(window.width, breakpoints);
    if (device !== activeMediaQuery) {
      //
      activeMediaQuery = device;
      store.store.setState((state: object) => ({
        ...state,
        width: window.width,
        device,
      }));
    }
  });

  // Set Initial State
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
      // default Theme ID
      themeId: theme?.themeId || '@random',
      ...theme,
    },
  });

  const changeTheme = (themeCallback: (id: string) => object): void => {
    const currentStore = store.store.getState() as any;
    const newTheme = themeCallback(currentStore.theme.themeId);
    store.store.setState((state: object) => ({
      ...state,
      theme: {
        ...newTheme,
      },
    }));
  };

  return {
    ReStyleSheet,
    changeTheme,
  };
};

const validateArg = (theme: any, breakpoint: any) => {
  if (!theme && !breakpoint) {
    throw new Error(
      "'theme' & 'breakpoints' both are required for creating style sheet"
    );
  }
  if (!theme) {
    throw new Error("'theme' is required for creating style sheet");
  }

  if (!breakpoint) {
    throw new Error("'breakpoint' is required for creating style sheet");
  }

  if (Object.prototype.toString.call(theme) !== '[object Object]') {
    throw new Error("Invalid 'theme' type found ! 'theme' should be an object");
  }

  if (Object.prototype.toString.call(theme) !== '[object Object]') {
    throw new Error(
      "Invalid 'breakpoint' type found ! 'breakpoint' should be an object"
    );
  }
};
