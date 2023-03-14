import React from 'react';
import { Text, View } from 'react-native';
import { ReStyleSheet, useMediaQuery } from 'react-native-restyle-sheet';

const useStyle = ReStyleSheet(() => ({
  container: {
    backgroundColor: 'green',
    width: 250,
    height: 100,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 20,
  },
  paragraph: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
}));

export default function HooksExample() {
  const { styles } = useStyle();
  const size = useMediaQuery();
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>from Hooks {size}</Text>
    </View>
  );
}
