/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';

import StackNavigator from './src/components/StackNavigator';
import BottomTabNavigator from './src/components/BottomTabNavigator';

const App: () => React$Node = () => {
  return (
      <BottomTabNavigator/>
  );
};

export default App;
