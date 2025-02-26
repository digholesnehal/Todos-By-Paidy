import React, { useEffect, useState } from 'react';
import {
  View
} from 'react-native';
import AuthScreen from './src/screens/AuthScreen';
import TodosScreen from './src/screens/TodosScreen';


function App(): React.JSX.Element {

  return (
    <View style={{ height: '100%' }}>
      {/* <AuthScreen /> */}
      <TodosScreen />
    </View>
  );
}

export default App;
