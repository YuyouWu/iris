import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import SubredditListContainer from './SubredditScreenComponents/SubredditListContainer';
import PostTileList from '../components/PostScreenComponents/PostTileList';
import Post from '../components/PostScreenComponents/Post';
import PostImage from '../components/PostScreenComponents/PostImage';
import PostVideo from '../components/PostScreenComponents/PostVideo';
import PostLinkView from '../components/PostScreenComponents/PostLinkView';
import SearchContainer from '../components/SearchScreenComponents/SearchContainer';
import UserSearchResult from '../components/SearchScreenComponents/UserSearchResult';
import PostSearchResult from '../components/SearchScreenComponents/PostSearchResult';
import SubredditSearchResult from '../components/SearchScreenComponents/SubredditSearchResult';

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
            navigationOptions: {
                headerShown: false,
            }
        },
        PostVideo: {
            screen: PostVideo,
            navigationOptions: {
                headerShown: false,
            }
        },
        PostLinkView: {
            screen: PostLinkView,
            navigationOptions: {
                title: "Link"
            }
        }
    },
    {
        initialRouteName: 'PostTileList',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#1a1a1a',
            },
            headerTintColor: 'white',
            cardStyle: {
                backgroundColor: 'black'
            },
            headerTitleStyle: {
                color: 'white'
            },
            gestureEnabled: true,
            gestureDirection: "horizontal",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
            },
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

const SearchStack = createStackNavigator(
    {
        SearchContainer: {
            screen: SearchContainer,
            navigationOptions: {
                headerShown: false
            }
        },
        UserSearchResult: {
            screen: UserSearchResult,
            navigationOptions: {
                title: "User Search Result"
            }
        },
        PostSearchResult: {
            screen: PostSearchResult,
            navigationOptions: {
                title: "Post Search Result"
            }
        },
        SubredditSearchResult: {
            screen: SubredditSearchResult,
            navigationOptions: {
                title: "Subreddit Search result"
            }
        }
    }, {
    initialRouteName: 'SearchContainer',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#1a1a1a',
        },
        headerTintColor: 'white',
        cardStyle: {
            backgroundColor: 'black'
        },
        headerTitleStyle: {
            color: 'white'
        },
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
        },
    }
}
);

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
        SearchStack: {
            screen: SearchStack,
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
