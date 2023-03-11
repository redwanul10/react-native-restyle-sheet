# react-native-restyle-sheet

restyle-sheet provides flexible way to define Themeing, Dynamic styles & Media Query support for React Native

## Features

- Media Query Support
- Easy way to define themeing
- useMediaQuery hooks
- Fully typed with TypeScript

## Install

```sh
yarn add react-native-restyle-sheet
# or
npm install --save react-native-restyle-sheet
```

## Usage

1. Wrap your app in the Provider

```js
import { Provider } from 'react-native-restyle-sheet';

export default function App() {
  return (
    <Provider>
      <RestOfYourApp />
    <Provider/>
  );
}
```

2. Then use ReStyleSheet like this everywhere in your app:

```js
import { View, Text, SafeAreaView, Pressable } from 'react-native';
import { Provider, ReStyleSheet } from 'react-native-restyle-sheet';

const useStyle = ReStyleSheet(() => ({
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'red',
  },
}));

const Demo = () => {
  const { styles } = useStyle();
  return (
    <View>
      <Text style={styles.header}>Hello World</Text>
    </View>
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

## Define Themeing & Media Query

1. First we need to pass Theme & Breakpoints through Provider

```js
import { Provider } from 'react-native-restyle-sheet';

export default function App() {
  return (
      <Provider
        theme={{
          themeId: 'light',
          primaryColor: 'yellow',
        }}
        breakpoints={{
          small: 0,
          medium: 250,
          large: 510,
        }}
      >
      <RestOfYourApp />
    <Provider/>
  );
}
```

2. Then we can start using Theme & breakpoints inside ReStyleSheet

```js
import { View, Text, SafeAreaView, Pressable } from 'react-native';
import { Provider, ReStyleSheet } from 'react-native-restyle-sheet';

const useStyle = ReStyleSheet(({ theme, breakpoints }) => ({
  header: {
    backgroundColor: theme?.primaryColor,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'red',
    [breakpoints.only('large')]: {
      paddingVertical: 20,
      color: 'black',
    },
  },
}));

const Demo = () => {
  const { styles } = useStyle();
  return (
    <View>
      <Text style={styles.header}>Hello World</Text>
    </View>
  );
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
