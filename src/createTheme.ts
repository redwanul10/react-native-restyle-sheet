import type { breakpoint, StyleProps } from './types';
import ReStyleSheet from './ReStyleSheet';

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

export const createTheme = <T extends { breakpoints: object; theme: object }>(
  _theme: T
): ReStyleSheet<T> => {
  return ReStyleSheet;
};
