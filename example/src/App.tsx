import * as React from 'react';

import { View, Text, SafeAreaView, Pressable } from 'react-native';
import { Provider, ReStyleSheet } from 'rn-re-stylesheet';

const useStyle = ReStyleSheet(({ theme, breakpoints }) => ({
  header: {
    backgroundColor: theme.primaryColor,
    color: (props) => props.activeColor,
    fontWeight: 'bold',
    [breakpoints?.only('large')]: {
      // backgroundColor: 'yellow',
      // color: 'black',
      paddingVertical: 50,
    },
  },
}));

const Demo = () => {
  const [toggleColor, setToggleColor] = React.useState(false);
  const { styles, deviceType } = useStyle(
    { activeColor: toggleColor ? 'black' : 'white' },
    true
  );

  // let between = useMediaQuery({ min: 500, max: 700 });

  return (
    <View>
      <Text style={styles.header}>
        Demo is: {deviceType}
        {/* {between ? 'yes' : 'no'} */}
      </Text>
      <Pressable onPress={() => setToggleColor(!toggleColor)}>
        <Text>Toggle color</Text>
      </Pressable>
    </View>
  );
};

export default function App() {
  const [toggleTheme, setToggleTheme] = React.useState(false);
  return (
    <SafeAreaView>
      <Provider
        theme={{
          themeId: toggleTheme ? 'dark' : 'light',
          primaryColor: toggleTheme ? 'green' : 'yellow',
        }}
        breakpoints={{
          small: 0,
          medium: 250,
          large: 510,
        }}
      >
        <View style={{}}>
          <Text>Result is: </Text>
          <Pressable onPress={() => setToggleTheme(!toggleTheme)}>
            <Text>Toggle Theme</Text>
          </Pressable>
          <Demo />
        </View>
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
