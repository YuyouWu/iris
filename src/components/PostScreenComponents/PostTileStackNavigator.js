import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import PostTileList from './PostTileList';
import Post from './Post';
import PostImage from './PostImage';
import PostVideo from './PostVideo';
import PostLinkView from './PostLinkView';

import postTileStackStyle from '../../styles/postTileStackStyle';

const PostTileStack = createStackNavigator();
class RenderPostTileStack extends Component {
    constructor() {
        super();
        this.state = {
            theme: "dark",
        }
        this.loadTheme();
    }

    loadTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('@theme');
            this.setState({
                theme
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <PostTileStack.Navigator
                initialRouteName="PostTileList"
                screenOptions={{
                    gestureEnabled: true,
                    gestureDirection: "horizontal",
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    transitionSpec: {
                        open: TransitionSpecs.TransitionIOSSpec,
                        close: TransitionSpecs.TransitionIOSSpec,
                    }
                }}
            >
                <PostTileStack.Screen
                    name="PostTileList"
                    component={PostTileList}
                    options={({ route }) => {
                        let currentSub = 'all'
                        if (route.params?.currentSub) {
                            currentSub = route.params.currentSub;
                        }
                        return ({
                            title: `r/${currentSub}`
                        })
                    }}
                />
                <PostTileStack.Screen
                    name="Post"
                    component={Post}
                />
                <PostTileStack.Screen
                    name="PostImage"
                    component={PostImage}
                    options={{
                        headerShown: false
                    }}
                />
                <PostTileStack.Screen
                    name="PostVideo"
                    component={PostVideo}
                    options={{
                        headerShown: false
                    }}
                />
                <PostTileStack.Screen
                    name="PostLinkView"
                    component={PostLinkView}
                    options={{
                        title: "Link"
                    }}
                />
            </PostTileStack.Navigator>
        )
    }
}

export default RenderPostTileStack;