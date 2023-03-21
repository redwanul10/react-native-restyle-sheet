import React from 'react';
import { Button, Text } from 'react-native';
import { ReStyleSheet, toggleTheme } from './theme';

const useStyle = ReStyleSheet(({ theme, breakpoints }) => ({
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 16,
    backgroundColor: theme.colors.primary,
    color: 'white',
    textAlign: 'center',
    [breakpoints.only('large')]: {
      backgroundColor: 'green',
    },
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    color: (props) => props.activeColor,
  },
}));

export default function ReStyleSheetExample() {
  const [color, setColor] = React.useState('#DF2E38');
  const { styles, deviceType } = useStyle({ activeColor: color }, true);

  const isLargeDevice = deviceType === 'large';

  const toggleColor = () => {
    setColor(color === '#DF2E38' ? 'black' : '#DF2E38');
  };

  return (
    <>
      <Text style={styles.title}>React Native </Text>
      <Text style={styles.title}>re-size codesandbox window</Text>

      <Text style={styles.subtitle}>Device size {deviceType}</Text>
      {isLargeDevice && (
        <Text style={styles.subtitle}>only visible for large device</Text>
      )}

      <Button onPress={toggleColor} title="toggle color" />
      <Button onPress={toggleTheme} title="toggle THEME" />
    </>
  );
}
