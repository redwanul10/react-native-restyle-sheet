export const getDevicetype = (width: number, breakpoints: any): string => {
  let br = '';

  for (const key in breakpoints) {
    if (breakpoints.hasOwnProperty(key)) {
      if (width >= breakpoints[key]) {
        br = key;
      }
    }
  }

  return br;
};
