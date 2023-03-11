import type { indexType } from '../types';

export type BreakpointDetail = {
  [key: indexType]: { start?: number; end?: number };
};
let defaultBreakPoints = {};

const initializeBreakpoints = (breakpoints: {
  [key: indexType]: number;
}): BreakpointDetail => {
  const configuredBreakpoints: BreakpointDetail = {};

  Object.keys({ ...defaultBreakPoints, ...breakpoints }).map(
    (key, index, arr) => {
      const nextBreakPointKey = arr[index + 1];
      const start = index === 0 ? 0 : breakpoints[key];
      const end = (breakpoints[nextBreakPointKey as any] as any) - 1 || start;

      configuredBreakpoints[key] = { start, end };
    }
  );

  return configuredBreakpoints;
};

export default initializeBreakpoints;
