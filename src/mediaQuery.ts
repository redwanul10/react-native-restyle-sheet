import type {
  Operators,
  BreakPointMethods,
  BreakPoints,
  DynamicValues,
  Operator,
  StyleObject,
} from './types';
import { addDynamicValue } from './utill/addDynamicValue';
import { isDynamicValue } from './utill/isDynamicValue';

const generateMediaQueryMethod = (operator: Operator) => {
  return (deviceType: string): string => {
    return `@ ${deviceType} - ${operator}`;
  };
};

export const breakPointMethods: BreakPointMethods<{}> = {
  up: generateMediaQueryMethod('>'),
  down: generateMediaQueryMethod('<'),
  only: generateMediaQueryMethod('='),
};

export const dynamicOperator: Operators = {
  '>': (width, breakpoint) => {
    if (breakpoint.start === breakpoint.end) return true;
    return width >= breakpoint.start;
  },
  '<': (width, breakpoint) => {
    if (breakpoint.start === breakpoint.end) return true;
    return width <= breakpoint.end;
  },
  '=': (width, breakpoint) => {
    if (breakpoint.start === breakpoint.end) {
      return width >= breakpoint.start;
    }
    return width >= breakpoint.start && width <= breakpoint.end;
  },
};

export const isMediaQuery = (cssKey: string): boolean => cssKey.includes('@');

export const isApplicableMediaQuery = (
  cssKey: string,
  width: number,
  breakpoints: BreakPoints
): boolean => {
  const [, deviceType, , operator] = cssKey.split(' ') as [
    string,
    keyof Operators,
    string,
    keyof Operators
  ];

  const currentBreakPoint = breakpoints[deviceType as keyof BreakPoints];
  if (!currentBreakPoint) {
    throw new Error(`"${deviceType}" is not a valid breakpoint`);
  }
  if (!dynamicOperator[operator]) {
    throw new Error(
      '@@ Invalid Media Query. Please use BREAKPOINTS utility methods for Media Queries'
    );
  }
  return dynamicOperator[operator]!(width, currentBreakPoint);
};

export const processMediaQuery = (
  cssKeyy: string,
  width: number,
  breakpoints: BreakPoints,
  cssValue: object,
  dynamicValues: DynamicValues[] | any,
  cssID: string,
  rawStyle: object
): [DynamicValues[], object] => {
  if (typeof cssValue !== 'object') {
    throw new Error(
      'Invalid media query value found, Media query should e an Object'
    );
  }

  let newDynamicValues = { ...dynamicValues }; //[...dynamicValues];
  let newRawStyles = { ...rawStyle } as StyleObject;
  let mediaQueryRawStyle = {} as StyleObject;

  const isApplicable = isApplicableMediaQuery(cssKeyy, width, breakpoints);

  if (isApplicable) {
    const mediaQueryStyles = cssValue as StyleObject;
    for (const cssKey in mediaQueryStyles) {
      const element = mediaQueryStyles[cssKey];

      if (isDynamicValue(element)) {
        newDynamicValues = addDynamicValue(
          newDynamicValues,
          cssID,
          cssKey,
          element
        );
      }

      if (!isDynamicValue(element)) {
        if (newDynamicValues[cssKey]) delete newDynamicValues[cssKey];
        mediaQueryRawStyle[cssKey] = element;
      }
    }

    newRawStyles = {
      ...newRawStyles,
      [cssID]: {
        ...newRawStyles[cssID],
        ...mediaQueryRawStyle,
      },
    };
  }
  return [newDynamicValues, newRawStyles];
};
