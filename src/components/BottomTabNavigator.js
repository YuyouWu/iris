import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import StackNavigator from './StackNavigator';

const BottomTabs = createBottomTabNavigator(
    {
        StackNavigator: {
            screen: StackNavigator,
            navigationOptions: {
                title: 'Home'
            }
        }
    },
    {
        initialRouteName: 'StackNavigator'
    }
);

const Navigator = createAppContainer(BottomTabs);

class BottomTabNavigator extends React.Component {
    render() {
        return (
            <Navigator />
        );
    }
};

export default BottomTabNavigator;
