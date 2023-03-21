![svgviewer-png-output (1)](https://user-images.githubusercontent.com/22383818/224547367-bea84225-e1b9-45cd-aa5d-a59372ba7cb9.jpeg)

# react-native-restyle-sheet

[![npm version](https://img.shields.io/npm/v/react-native-restyle-sheet)](https://www.npmjs.com/package/react-native-restyle-sheet)
![GitHub](https://img.shields.io/github/license/redwanul10/react-native-restyle-sheet)
![npm](https://img.shields.io/npm/dw/react-native-restyle-sheet)

restyle-sheet provides flexible way to define Theming, Dynamic styles & Media Query support for React Native

## Features

- Media Query Support
- Easy way to define Dynamic Style & Theming (No inline style)
- useMediaQuery hooks
- Fully typed with TypeScript

https://user-images.githubusercontent.com/22383818/226711571-9a310e32-7e3d-499c-a04a-898028be49ec.mp4

## PlayGround

Check out the codeSandbox playGround [link](https://codesandbox.io/s/react-native-restyle-sheet-example-vh19ce)

## Install

```sh
yarn add react-native-restyle-sheet
# or
npm install --save react-native-restyle-sheet
```

## Usage

1. First We need to initialize Style Sheet  

```js
// theme.js

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
  // you can define custom device size also
};

export const { ReStyleSheet, changeTheme } = createStyleSheet({
  theme: lightTheme,
  breakpoints,
});
```

2. Then use ReStyleSheet like this anywhere in your app with theme & breakpoints:

```js
import React from 'react';
import { View, Text } from 'react-native';
import { ReStyleSheet } from './theme';

const useStyle = ReStyleSheet(({ theme, breakpoints }) => ({
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colors.tertiary,
    [breakpoints.only('medium')]: {
      color: theme.colors.primary,
    },
  },
}));

const Demo = () => {
  const { styles } = useStyle();
  return (
    <>
      <View>
        <Text style={styles.header}>Hello World</Text>
      </View>
    </>
  );
};
```

## Define dynamic style

we can pass any dynamic values in useStyle hooks returned by ReStyleSheet

```js
const useStyle = ReStyleSheet(() => ({
  header: {
    fontSize: 20,
    color: (props) => props?.activeColor,
  },
}));

const Demo = () => {
  const [color, setColor] = React.useState('red');
  const { styles } = useStyle({ activeColor: color });

  const toggleColor = () => {
    setColor(color === 'red' ? 'green' : 'red');
  };

  return (
    <View>
      <Text style={styles.header}>Hello World</Text>
      <Pressable onPress={toggleColor}>
        <Text>Toggle Color</Text>
      </Pressable>
    </View>
  );
};
```

## Change Theme

1. To change the Theme we can use **`changeTheme()`** method anywhere in our app

```js
// theme.js

import { createStyleSheet } from 'react-native-restyle-sheet';

const lightTheme = {
  themeId: 'lightTheme',
  colors: {
    ...
  },
};

const darkTheme = {
  themeId: 'darkTheme',
  colors: {
    ...
  },
};

const breakpoints = {
 ...
};

export const { ReStyleSheet, changeTheme } = createStyleSheet({
  theme: lightTheme,
  breakpoints,
});

export const toggleTheme = () => {
  changeTheme((themId) => (themId === 'darkTheme' ? lightTheme : darkTheme));
};

```


## Override Media Query

If multiple breakpoints are applicable similar to css rule the bottom breakpoint will get priority. \
For example we are in a **"small"** device so here **breakpoints.only('small')** & **breakpoints.down('medium')** both are applicable

```js
// Example 1
const useStyle = ReStyleSheet(({ breakpoints }) => ({
  header: {
    backgroundColor: 'black',
    [breakpoints.only('large')]: {
      backgroundColor: 'red',
    },
    [breakpoints.only('small')]: {
      backgroundColor: 'green',
    },
    // in "small" device header background will be "blue"
    [breakpoints.down('medium')]: {
      backgroundColor: 'blue',
    },
  },
}));

// Example 2
const useStyle = ReStyleSheet(({ breakpoints }) => ({
  header: {
    backgroundColor: 'black',
    [breakpoints.only('large')]: {
      backgroundColor: 'red',
    },
    [breakpoints.down('medium')]: {
      backgroundColor: 'blue',
    },
    // in "small" device header background will be "green"
    [breakpoints.only('small')]: {
      backgroundColor: 'green',
    },
  },
}));
```

## breakpoints API


| Methods        | Arguments           |Required  | Returns |
| ------------- |:-------------:| -------------| -------------|
| **`breakpoints.up(size)`**      | size (string) |true |MediaQuery key (string) | 
| **`breakpoints.down(size)`**      | size (string) |true | MediaQuery key (string) |
| **`breakpoints.only(size)`**      | size (string) |true | MediaQuery key (string) |



## useMediaQuery Hooks

It returns the device size based on breakpoints

```js
import { useMediaQuery } from 'react-native-restyle-sheet';

const Demo = () => {
  const devicetype = useMediaQuery()
  console.log(devicetype) // For Example: small

  ....
};
```

It also accepts custom breakpoints and returns boolean value

```js
const isTablet = useMediaQuery({ min: 400, max: 800 });
const isExtraLarge = useMediaQuery({ min: 1200 });
const isExtraSmall = useMediaQuery({ Max: 576 });

console.log(isTablet); //false
```
<!---
**NOTE:** If you are using **useMediaQuery** & **ReStyleSheet** both in same component follow the recommended usage

```js
import { useMediaQuery } from 'react-native-restyle-sheet';

const useStyle = ReStyleSheet(() => ({
  header: {
    fontSize: 20,
  },
}));

const Demo = () => {
   // Not recommended because useStyle also uses useMediaQuery under the hood
  const size = useMediaQuery();
  const { styles } = useStyle({});

  // Recommended
  const { styles, deviceType: size } = useStyle({}, true);

  // Recommended
  const { styles, deviceType: size } = useStyle({}, true);
  const isTablet = useMediaQuery({ min: 400, max: 800 });
  const isExtraLarge = useMediaQuery({ min: 1200 });
  const isExtraSmall = useMediaQuery({ Max: 576 });

  ....
};
```
-->

## License

MIT

---
