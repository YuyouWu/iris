import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import PostNavigator from './PostScreenComponents/PostNavigator';
import SearchContainer from './SearchScreenComponents/SearchContainer';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomTabs = createBottomTabNavigator(
    {
        PostNavigator: {
            screen: PostNavigator,
            navigationOptions: {
                title: 'Posts',
                tabBarIcon: ({tintColor}) => <Icon name="ios-albums" size={24} color={tintColor}/>,
            }
        },
        SearchContainer: {
            screen: SearchContainer,
            navigationOptions: {
                title: 'Search',
                tabBarIcon: ({tintColor}) => <Icon name="ios-search" size={24} color={tintColor}/>
            }
        }

    },
    {
        initialRouteName: 'PostNavigator',
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'grey',
            style: {
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
