import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import postTileStackStyle from '../../styles/postTileStackStyle';

import SettingContainer from './SettingContainer';
const SettingStack = createStackNavigator();

class RenderSettingStack extends Component {
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
            <SettingStack.Navigator
                initialRouteName="Settings"
                screenOptions={{
                    headerStyle: this.state.theme === "light" ? postTileStackStyle.lightHeaderStyle : postTileStackStyle.darkHeaderStyle,
                    headerTintColor: this.state.theme === "light" ? postTileStackStyle.lightHeaderTintColor.color : postTileStackStyle.darkHeaderTintColor.color,
                    cardStyle: this.state.theme === "light" ? postTileStackStyle.lightCardStyle : postTileStackStyle.darkCardStyle,
                    headerTitleStyle: this.state.theme === "light" ? postTileStackStyle.lightHeaderTitleStyle : postTileStackStyle.darkHeaderTitleStyle,
                    gestureEnabled: true,
                    gestureDirection: "horizontal",
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    transitionSpec: {
                        open: TransitionSpecs.TransitionIOSSpec,
                        close: TransitionSpecs.TransitionIOSSpec,
                    }
                }}
            >
                <SettingStack.Screen
                    name="Settings"
                    component={SettingContainer}
                />
            </SettingStack.Navigator>
        )
    }
}

export default RenderSettingStack;