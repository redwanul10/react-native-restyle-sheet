import type { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type StyleObject = {
  [key: indexType]: any;
};

export type DynamicType<Type> = {
  [key in keyof Type as key]: ((props: object) => any) | Type[key];
};

export type indexType = string | number | symbol;

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Operator = '>' | '<' | '=';
export type Media = `@ ${Size} - ${Operator}`;

export interface DynamicValues {
  key: string;
  dynamic: (props: object) => any;
}

type Breakpoint = {
  start: number;
  end: number;
};

export type BreakPoints = {
  [key in Size]: Breakpoint;
};

export type Operators = {
  [key in Operator]?: (width: number, breakpoint: Breakpoint) => boolean;
};

type BrMethodTypes = 'up' | 'down' | 'only';
export type BreakPointMethods = {
  [key in BrMethodTypes]: (deviceType: string) => string;
};

export type Config = {
  dynamicValues: DynamicValues[];
  styles: object;
};

export type Query = {
  [key: indexType]:
    | RNStyle
    | string
    | number
    | ((options: { [key: indexType]: any }) => any);
};

type theme = {
  [key: indexType]: any;
};
export type breakpoint = {
  breakpoints: BreakPointMethods;
  theme: theme;
};

type RNStyle = ViewStyle & TextStyle & ImageStyle;
type mergeRnstyle = Query & RNStyle;

export type TestStylesType2 = {
  [key: indexType]: {
    [key in keyof mergeRnstyle]?: mergeRnstyle[key] extends RNStyle
      ? RNStyle | ((options: { [key: indexType]: any }) => any)
      : mergeRnstyle[key] | ((options: { [key: indexType]: any }) => any);
  };
};
