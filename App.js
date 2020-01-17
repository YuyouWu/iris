/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PostTileList from './src/components/PostTileList';
import Post from './src/components/Post';
import PostImage from './src/components/PostImage';
import PostVideo from './src/components/PostVideo';

const AppNavigator = createStackNavigator(
  {
    PostTileList: PostTileList,
    Post: Post,
    PostImage: PostImage,
    PostVideo: PostVideo
  },
  {
    initialRouteName: 'PostTileList',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(AppNavigator);

const App: () => React$Node = () => {
  return (
    <AppContainer/>
    // <>
    //   <StatusBar barStyle="dark-content" />
    //   <SafeAreaView>
    //     <AppContainer/>
    //   </SafeAreaView>
    // </>
  );
};

export default App;
