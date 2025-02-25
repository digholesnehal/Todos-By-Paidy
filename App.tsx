/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import TodoElement from './src/components/TodoElement';
import TodoInput from './src/components/TodoInput';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import AuthScreen from './src/screens/AuthScreen';


function App(): React.JSX.Element {

  const todoList: Array<{ id: number, title: string }> = [{ title: 'First Item', id: 0 }, { title: 'Second Item', id: 1 }, { title: 'Third Item', id: 2 }, { title: 'Fourth Item', id: 3 }];
 
  const safePadding = '5%';

  return (
    <View style={{ height: '100%' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: '900', color: '#00008B' }}> TODO:  </Text>
      </View>
      <ScrollView
        style={{backgroundColor: '#FFF'}}>
        <View
          style={{
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
          {todoList.map(({ title, id }) => TodoElement({ title, id })
          )}
        </View>
      </ScrollView>
      <TodoInput />
      {/* <AuthScreen /> */}
    </View>
  );
}

export default App;
