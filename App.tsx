import React, { useEffect, useState } from 'react';
import {
  View
} from 'react-native';
import AuthScreen from './src/screens/AuthScreen';


function App(): React.JSX.Element {

  //Shows first screen as a authentication screen

  return (
    <View style={{ height: '100%' }}>
      <AuthScreen />
    </View>
  );
}

export default App;
