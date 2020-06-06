/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import BottomTabNavigator from './src/components/BottomTabNavigator';


//TODO: Store theme obj into AsyncStorage if it's not done yet 
//Retrive theme obj if it's there and set theme in styles files

class App extends React.Component {
  saveSetting = async () => {
    try {
      await AsyncStorage.setItem('@theme', 'dark')
    } catch (e) {
      console.log(e);
    }
  }

  initSetting = async () => {
    try {
      const theme = await AsyncStorage.getItem('@theme');
      if (theme === null) {
        this.saveSetting();
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    this.initSetting();
    return (
      <BottomTabNavigator />
    )
  }
}

export default App;
