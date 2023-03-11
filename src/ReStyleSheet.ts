import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import store from './createStore';
import multiKeyStore from './multiKeyStore';
import {
  isMediaQuery as detectMediaQuery,
  processMediaQuery,
} from './mediaQuery';
import type {
  DynamicValues,
  BreakPoints,
  Config,
  breakpoint,
  TestStylesType2,
  indexType,
  BreakPointMethods,
  StyleObject,
} from './types';
import shallowEqual from './utill/shallowEqual';

export const isDynamicValue = (styleKey: string): boolean =>
  typeof styleKey === 'function';

export const addDynamicValue = (
  dynamicValues: DynamicValues[] | any,
  key: string,
  cssKey: string,
  cssValue: () => any
): DynamicValues[] | any => {
  dynamicValues[cssKey] = {
    key: `${key}.${cssKey}`,
    dynamic: cssValue,
  };
  return dynamicValues;
};

const processStyles = (
  styles: StyleObject,
  width: number,
  breakpoints: BreakPoints
): { dynamicValues: DynamicValues[]; rawStyle: StyleObject } => {
  let dynamicValues = {}; //[];
  let rawStyle: StyleObject = {};

  Object.keys(styles).forEach((cssID) => {
    const subStyle = styles[cssID];
    let foundMediaQuery = false;

    Object.keys(subStyle).forEach((cssKey) => {
      const cssValue = subStyle[cssKey];
      const isMediaQuery = detectMediaQuery(cssKey);

      if (isDynamicValue(cssValue)) {
        dynamicValues = addDynamicValue(dynamicValues, cssID, cssKey, cssValue);
      }

      if (!isMediaQuery && typeof cssValue === 'object') {
        throw new Error(`Invalid style found Cant't use object in '${cssKey}'`);
      }

      if (!isMediaQuery && foundMediaQuery) {
        // throw new Error(`invalid shape`);

        console.warn(
          `Please define "${cssKey}" above media-query styles because that can override your Media-Query styles`
        );
      }

      if (isMediaQuery) {
        const [updatedDynamicValues, updatedRawStyle] = processMediaQuery(
          cssKey,
          width,
          breakpoints,
          cssValue,
          dynamicValues,
          cssID,
          rawStyle
        );

        rawStyle = updatedRawStyle;
        dynamicValues = updatedDynamicValues;

        if (!foundMediaQuery) foundMediaQuery = true;
      }

      if (!isMediaQuery) {
        if (!rawStyle[cssID]) {
          rawStyle[cssID] = {
            [cssKey]: subStyle[cssKey],
          };
        } else {
          rawStyle[cssID] = {
            ...rawStyle[cssID],
            [cssKey]: subStyle[cssKey],
          };
        }
      }
    });
  });

  // dynamicValues = Object.values(dynamicValues);

  return { dynamicValues: Object.values(dynamicValues), rawStyle };
};

const applyDynamicValues = (styleConfig: Config, props: object) => {
  const { dynamicValues, styles } = styleConfig;
  const copyStyle: StyleObject = { ...styles };

  for (let index = 0; index < dynamicValues.length; index++) {
    const element = dynamicValues[index] as DynamicValues;
    const [selector, cssKey] = element?.key.split('.');

    copyStyle[selector as indexType] = [
      copyStyle[selector as indexType],
      { [cssKey as indexType]: element?.dynamic(props) },
    ];
  }

  return copyStyle;
};

const createObserable = (
  data: { theme: object; breakPointMethods: BreakPointMethods },
  onAccess: (property: string) => void
) => {
  let options = {};

  Object.defineProperty(options, 'theme', {
    get() {
      onAccess('theme');
      return data.theme;
    },
    enumerable: true,
    configurable: true,
  });

  Object.defineProperty(options, 'breakpoints', {
    get() {
      onAccess('breakpoints');
      return data.breakPointMethods;
    },
    enumerable: true,
    configurable: true,
  });
  return options;
};

const init = (
  styleFunc: (options: any) => any,
  data: any,
  width: number,
  accessed: any
): Config => {
  let options = createObserable(data, (property) => {
    if (!accessed.current[property]) accessed.current[property] = true;
  });

  const styles = styleFunc(options);

  // ======= STEP 1 =========
  // GET ALL THE APPLICABLE RAW STYLE & DYNAMIC VALUE
  // FROM STYLES BASED ON MEDIA QUERIES
  const { rawStyle, dynamicValues } = processStyles(
    styles,
    width,
    data.breakpoints
  );

  // ======= STEP 2 =========
  // CREATE STYLE SHEET WITH RAW STYLE
  var cloneRawstyle = StyleSheet.create(rawStyle);

  const config = {
    dynamicValues,
    styles: cloneRawstyle,
  };

  return config;
};

const customShallowEqual = (
  prev: any,
  current: any,
  accessed: any,
  size: boolean | undefined
) => {
  let theme = accessed.current.theme;
  let breakpoint = accessed.current.breakpoints || size;

  if (!theme && !breakpoint) {
    return true;
  }

  if (theme && !breakpoint) {
    let oldProps = {
      theme: prev.theme,
      breakpoints: prev.defaultBreakPoints,
    };

    let newProps = {
      theme: current.theme,
      breakpoints: current.defaultBreakPoints,
    };

    return shallowEqual(oldProps, newProps);
  }

  if (!theme && breakpoint) {
    let oldProps = {
      device: prev.device,
      breakpoints: prev.defaultBreakPoints,
    };

    let newProps = {
      device: current.device,
      breakpoints: current.defaultBreakPoints,
    };
    return shallowEqual(oldProps, newProps);
  }
  return shallowEqual(prev, current);
};

const ReStyleSheet = <T extends (theme: breakpoint) => TestStylesType2>(
  styleFunc: T
): ((
  props?: any,
  size?: boolean | undefined
) => {
  styles: { [key in keyof ReturnType<T>]?: Object };
  deviceType: String;
}) => {
  const useStyle = (props: any = {}, size: boolean | undefined) => {
    let accessed = useRef<string | { theme?: boolean; breakpoints?: boolean }>(
      'pending'
    );

    const data = store.useStore(
      (state: object) => state,
      (prev: object, current: object) =>
        customShallowEqual(prev, current, accessed, size)
    ) as any;

    let activeMediaQuery = useRef('');
    let styleConfig = useRef<Config>({ dynamicValues: [], styles: {} });
    let CACHE = useRef(new multiKeyStore());

    let prevProps = useRef('');
    let prevThemeId = useRef('');
    let finalStyle = useRef({});
    const { width, device } = data;

    const cacheStyleConfig = CACHE.current.get(data.theme.themeId, device);
    if (accessed.current === 'pending') accessed.current = {};

    if (!cacheStyleConfig) {
      const config = init(styleFunc, data, width, accessed);
      CACHE.current.set(data.theme.themeId, device, config);
      styleConfig.current = config;
    } else {
      styleConfig.current = cacheStyleConfig;
    }

    const isPropsOrThemeOrDeviceTypeChanged =
      prevProps.current !== JSON.stringify(props) ||
      prevThemeId.current !== data.theme.themeId ||
      activeMediaQuery.current !== device;

    if (isPropsOrThemeOrDeviceTypeChanged) {
      finalStyle.current = applyDynamicValues(styleConfig.current, props);
      prevProps.current = JSON.stringify(props);
      prevThemeId.current = data.theme.themeId;
      activeMediaQuery.current = device;
    }

    return { styles: finalStyle.current, deviceType: device };
  };

  return useStyle;
};

export default ReStyleSheet;
