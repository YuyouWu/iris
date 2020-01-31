import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import PostNavigator from './PostScreenComponents/PostNavigator';
import SearchContainer from './SearchScreenComponents/SearchContainer';
import SubredditListContainer from './SubredditScreenComponents/SubredditListContainer';

import Icon from 'react-native-vector-icons/Ionicons';
import bottomTabStyle from '../styles/bottomTabStyle';

const BottomTabs = createBottomTabNavigator(
    {   
        SubredditListContainer: {
            screen: SubredditListContainer,
            navigationOptions: {
                title: 'Subreddits',
                tabBarIcon: ({tintColor}) => <Icon name="ios-home" size={bottomTabStyle.icon.fontSize} color={tintColor}/>
            }
        },
        PostNavigator: {
            screen: PostNavigator,
            navigationOptions: {
                title: 'Posts',
                tabBarIcon: ({tintColor}) => <Icon name="ios-albums" size={bottomTabStyle.icon.fontSize} color={tintColor}/>,
            }
        },
        SearchContainer: {
            screen: SearchContainer,
            navigationOptions: {
                title: 'Search',
                tabBarIcon: ({tintColor}) => <Icon name="ios-search" size={bottomTabStyle.icon.fontSize} color={tintColor}/>
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
