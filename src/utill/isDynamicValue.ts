export const isDynamicValue = (styleKey: string): boolean =>
  typeof styleKey === 'function';
