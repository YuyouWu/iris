import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';

import postTileStackStyle from '../../styles/postTileStackStyle';

import SettingContainer from './SettingContainer';

const RenderSettingStack = () => {
    const SettingStack = createStackNavigator();

    return (
        <SettingStack.Navigator
            initialRouteName="Settings"
            screenOptions={{
                headerStyle: postTileStackStyle.headerStyle,
                headerTintColor: postTileStackStyle.headerTintColor.color,
                cardStyle: postTileStackStyle.cardStyle,
                headerTitleStyle: postTileStackStyle.headerTitleStyle,
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

export default RenderSettingStack;