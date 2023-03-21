import React from 'react';
import { Text, View } from 'react-native';
import { ReStyleSheet } from './theme';

export default function ResponsiveBox() {
  const { styles } = useStyles();
  return (
    <>
      <View style={styles.container}>
        <View style={[styles.col, styles.col1]}>
          <Text style={styles.boxText}>COL 1</Text>
        </View>
        <View style={[styles.col, styles.col2]}>
          <Text style={styles.boxText}>COL 2</Text>
        </View>
        <View style={[styles.col, styles.col3]}>
          <Text style={styles.boxText}>COL 3</Text>
        </View>
        <View style={[styles.col, styles.col4]}>
          <Text style={styles.boxText}>COL 4</Text>
        </View>
      </View>
    </>
  );
}

const useStyles = ReStyleSheet(({ breakpoints, theme }) => ({
  col: {
    width: '100%',
    backgroundColor: 'red',
    paddingVertical: 20,
    marginBottom: 5,
    [breakpoints.only('medium')]: {
      width: '50%',
    },
    [breakpoints.only('large')]: {
      width: '25%',
    },
  },

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  boxText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  col1: {
    backgroundColor: theme.colors.primary,
  },
  col2: {
    backgroundColor: theme.colors.secondary,
  },
  col3: {
    backgroundColor: theme.colors.tertiary,
  },
  col4: {
    backgroundColor: theme.colors.quatenary,
  },
}));
