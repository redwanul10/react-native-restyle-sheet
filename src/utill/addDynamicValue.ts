import type { DynamicValues } from 'src/types';

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
