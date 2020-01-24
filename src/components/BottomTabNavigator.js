import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import PostNavigator from './PostScreenComponents/PostNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomTabs = createBottomTabNavigator(
    {
        PostNavigator: {
            screen: PostNavigator,
            navigationOptions: {
                title: 'Posts',
                tabBarIcon: <Icon name="ios-albums" style={{color:"white"}} size={24}/>
            }
        }
    },
    {
        initialRouteName: 'PostNavigator',
        tabBarOptions: {
            activeTintColor: '#bfbfbf',
            style:{
                backgroundColor: '#1a1a1a'
            }
        }
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
