import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import SearchContainer from './SearchScreenComponents/SearchContainer';
import SubredditListContainer from './SubredditScreenComponents/SubredditListContainer';
import PostTileList from '../components/PostScreenComponents/PostTileList';
import Post from '../components/PostScreenComponents/Post';
import PostImage from '../components/PostScreenComponents/PostImage';
import PostVideo from '../components/PostScreenComponents/PostVideo';
import PostLinkView from '../components/PostScreenComponents/PostLinkView';

import bottomTabStyle from '../styles/bottomTabStyle';

const NavStack = createStackNavigator(
    {
        PostTileList: {
            screen: PostTileList,
            navigationOptions: ({ navigation }) => {
                let currentSub = 'all'
                if (navigation.getParam('currentSub')) {
                    currentSub = navigation.getParam('currentSub');
                }
                return ({
                    title: `r/${currentSub}`
                });
            }
        },
        Post: Post,
        PostImage: {
            screen: PostImage,
            tabBarVisible: false
        },
        PostVideo: PostVideo,
        PostLinkView: PostLinkView
    },
    {
        initialRouteName: 'PostTileList',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#1a1a1a',
            },
            headerTitleStyle: {
                color: 'white'
            }
        }
    }
);

NavStack.navigationOptions = ({ navigation }) => {
    const routeName = navigation.state.routes[navigation.state.index].routeName;
    if (routeName === "PostVideo" || routeName === "PostImage" || routeName === "PostLinkView") {
        return {
            tabBarVisible: false,
        }
    }
}

const BottomTabs = createBottomTabNavigator(
    {
        SubredditListContainer: {
            screen: SubredditListContainer,
            navigationOptions: {
                title: 'Subreddits',
                tabBarIcon: ({ tintColor }) => <Icon name="ios-home" size={bottomTabStyle.icon.fontSize} color={tintColor} />
            }
        },
        PostNavigator: {
            screen: NavStack,
            navigationOptions: {
                title: 'Posts',
                tabBarIcon: ({ tintColor }) => <Icon name="ios-albums" size={bottomTabStyle.icon.fontSize} color={tintColor} />,
            }
        },
        SearchContainer: {
            screen: SearchContainer,
            navigationOptions: {
                title: 'Search',
                tabBarIcon: ({ tintColor }) => <Icon name="ios-search" size={bottomTabStyle.icon.fontSize} color={tintColor} />
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
