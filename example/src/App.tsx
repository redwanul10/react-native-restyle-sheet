import * as React from 'react';

import { SafeAreaView } from 'react-native';
import { Provider } from 'react-native-restyle-sheet';
import HooksExample from './HooksExample';
import ReStyleSheetExample from './ReStyleSheetExample';

export default function App() {
  return (
    <SafeAreaView>
      <Provider
        theme={{
          themeId: 'darkTheme',
          primaryBgColor: '#37306B',
        }}
        breakpoints={{
          small: 0,
          medium: 500,
          large: 800,
        }}
      >
        <ReStyleSheetExample />
        <HooksExample />
      </Provider>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   box: {
//     width: 60,
//     height: 60,
//     marginVertical: 20,
//   },
// });

// Media Query support
// Define Dynamic Styles without inline css
// Uses Material Ui Syntax for stying
// Custom Media Query
// themeing

// custom breakpoint validation
//  useMediaQuery() hooks

/**
 *  If multiple breakpoints are applicable similar to css rule the bottom breakpoint will get priority
 *  For example we are in a "small" device so here "[breakpoints.only('small')]" & "[breakpoints.down('medium')]" both are applicable
 */

//  # react-native-restyle-sheet

//  restyle-sheet provides flexible way to define Themeing, Dynamic styles & Media Query support for React Native

//  ## Features

//  - Media Query Support
//  - Easy way to define themeing
//  - useMediaQuery hooks
//  - Fully typed with TypeScript

//  ## Install

//  ```sh
//  yarn add react-native-restyle-sheet
//  # or
//  npm install --save react-native-restyle-sheet
//  ```

//  ## Usage

//  1. Wrap your app in the Provider

//  ```js
//  import { Provider } from 'react-native-restyle-sheet';

//  export default function App() {
//    return (
//      <Provider>
//        <RestOfYourApp />
//      <Provider/>
//    );
//  }
//  ```

//  2. Then use ReStyleSheet like this everywhere in your app:

//  ```js
//  import { View, Text, SafeAreaView, Pressable } from 'react-native';
//  import { Provider, ReStyleSheet } from 'react-native-restyle-sheet';

//  const useStyle = ReStyleSheet(() => ({
//    header: {
//      fontWeight: 'bold',
//      fontSize: 20,
//      color: 'red',
//    },
//  }));

//  const Demo = () => {
//    const { styles } = useStyle();
//    return (
//      <View>
//        <Text style={styles.header}>Hello World</Text>
//      </View>
//    );
//  };
//  ```

//  ## Define Themeing & Media Query

//  1. First we need to pass Theme & Breakpoints through Provider

//  ```js
//  import { Provider } from 'react-native-restyle-sheet';

//  export default function App() {
//    return (
//        <Provider
//          theme={{
//            themeId: 'light',
//            primaryColor: 'yellow',
//          }}
//          breakpoints={{
//            small: 0,
//            medium: 250,
//            large: 510,
//          }}
//        >
//        <RestOfYourApp />
//      <Provider/>
//    );
//  }
//  ```

//  2. Then we can start using Theme & breakpoints inside ReStyleSheet

//  ```js
//  import { View, Text, SafeAreaView, Pressable } from 'react-native';
//  import { Provider, ReStyleSheet } from 'react-native-restyle-sheet';

//  const useStyle = ReStyleSheet(({ theme, breakpoints }) => ({
//    header: {
//      backgroundColor: theme?.primaryColor,
//      fontWeight: 'bold',
//      fontSize: 20,
//      color: 'red',
//      [breakpoints.only('large')]: {
//        paddingVertical: 20,
//        color: 'black',
//      },
//    },
//  }));

//  const Demo = () => {
//    const { styles } = useStyle();
//    return (
//      <View>
//        <Text style={styles.header}>Hello World</Text>
//      </View>
//    );
//  };
//  ```

//  ## Override Media Query
//  If multiple breakpoints are applicable similar to css rule the bottom breakpoint will get priority. \
//  For example we are in a **"small"** device so here **[breakpoints.only('small')]** & **[breakpoints.down('medium')]** both are applicable

//  ```js
//  // Example 1
//  const useStyle = ReStyleSheet(({ breakpoints }) => ({
//    header: {
//      backgroundColor: 'black',
//      [breakpoints.only('large')]: {
//        backgroundColor: 'red',
//      },
//      [breakpoints.only('small')]: {
//        backgroundColor: 'green',
//      },
//      // in "small" device header background will be "blue"
//      [breakpoints.down('medium')]: {
//        backgroundColor: 'blue',
//      },
//    },
//  }));

//  // Example 2
//  const useStyle = ReStyleSheet(({ breakpoints }) => ({
//    header: {
//      backgroundColor: 'black',
//      [breakpoints.only('large')]: {
//        backgroundColor: 'red',
//      },
//      [breakpoints.down('medium')]: {
//        backgroundColor: 'blue',
//      },
//      // in "small" device header background will be "green"
//      [breakpoints.only('small')]: {
//        backgroundColor: 'green',
//      },
//    },
//  }));
//  ```

/**
 * we can pass any dynamic values in useStyle hooks returned by ReStyleSheet
 */
