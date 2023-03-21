import { createStyleSheet } from 'react-native-restyle-sheet';

export const lightTheme = {
  themeId: 'light',
  colors: {
    main: 'green',
    primary: '#00235B',
    secondary: '#E21818',
    tertiary: '#FFDD83',
    quatenary: '#98DFD6',
  },
};

const breakpoints = {
  small: 0,
  medium: 500,
  large: 800,
};

export const { ReStyleSheet, changeTheme } = createStyleSheet({
  theme: lightTheme,
  breakpoints,
});

const darkTheme = {
  themeId: 'dark',
  colors: {
    main: 'red',
    primary: '#19A7CE',
    secondary: '#F6F1F1',
    tertiary: '#146C94',
    quatenary: '#000000',
  },
};
export const toggleTheme = () => {
  changeTheme((themId) => (themId === 'dark' ? lightTheme : darkTheme));
};
