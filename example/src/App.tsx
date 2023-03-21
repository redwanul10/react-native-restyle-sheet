import * as React from 'react';

import { SafeAreaView } from 'react-native';
import HooksExample from './HooksExample';
import ResponsiveBox from './responsiveBox';
import ReStyleSheetExample from './ReStyleSheetExample';

export default function App() {
  return (
    <SafeAreaView>
      <ReStyleSheetExample />
      <ResponsiveBox />
      <HooksExample />
    </SafeAreaView>
  );
}
