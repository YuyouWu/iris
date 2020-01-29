/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';

import BottomTabNavigator from './src/components/BottomTabNavigator';


//TODO: Store theme obj into AsyncStorage if it's not done yet 
//Retrive theme obj if it's there and set theme in styles files

const App: () => React$Node = () => {
  return (
      <BottomTabNavigator/>
  );
};

export default App;
