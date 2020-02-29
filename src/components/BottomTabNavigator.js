import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
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
import SettingContainer from '../components/SettingScreenComponents/SettingContainer';
import ProfileContainer from '../components/ProfileComponents/ProfileContainer';

import bottomTabStyle from '../styles/bottomTabStyle';

// PostTileStack.navigationOptions = ({ navigation }) => {
//     const routeName = navigation.state.routes[navigation.state.index].routeName;
//     if (routeName === "PostVideo" || routeName === "PostImage" || routeName === "PostLinkView") {
//         return {
//             tabBarVisible: false,
//         }
//     }
// }

const SearchStack = createStackNavigator();

function RenderSearchStack() {
    return (
        <SearchStack.Navigator
            initialRouteName="SearchContainer"
            screenOptions={{
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
                }
            }}
        >
            <SearchStack.Screen
                name="SearchContainer"
                component={SearchContainer}
                options={{
                    headerShown: false
                }}
            />
            <SearchStack.Screen
                name="UserSearchResult"
                title="User Search Result"
                component={UserSearchResult}
            />
            <SearchStack.Screen
                name="PostSearchResult"
                title="Post Search Result"
                component={PostSearchResult}
            />
            <SearchStack.Screen
                name="Posts"
                component={Post}
            />
            <SearchStack.Screen
                name="SubredditSearchResult"
                title="Subreddit Search Result"
                component={SubredditSearchResult}
            />
        </SearchStack.Navigator>
    );
}

const PostTileStack = createStackNavigator();

function RenderPostTileStack() {
    return (
        <PostTileStack.Navigator
            initialRouteName="PostTileList"
            screenOptions={{
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

const BottomTabs = createBottomTabNavigator();

class BottomTabNavigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <BottomTabs.Navigator
                    initialRouteName="Posts"
                    tabBarOptions={{
                        activeTintColor: "white",
                        inactiveTintColor: 'grey',
                        style: {
                            backgroundColor: '#1a1a1a'
                        }
                    }}
                >
                    <BottomTabs.Screen
                        name="Subreddits"
                        component={SubredditListContainer}
                        options={{
                            title: "Subreddits",
                            tabBarIcon: ({ color }) => <Icon name="ios-home" size={bottomTabStyle.icon.fontSize} color={color} />
                        }}
                    />
                    <BottomTabs.Screen
                        name="Posts"
                        component={RenderPostTileStack}
                        options={{
                            title: "Posts",
                            tabBarIcon: ({ color }) => <Icon name="ios-albums" size={bottomTabStyle.icon.fontSize} color={color} />
                        }}
                    />
                    <BottomTabs.Screen
                        name="Profile"
                        component={ProfileContainer}
                        options={{
                            title: "Profile",
                            tabBarIcon: ({ color }) => <Icon name="md-person" size={bottomTabStyle.icon.fontSize} color={color} />
                        }}
                    />
                    <BottomTabs.Screen
                        name="Search"
                        component={RenderSearchStack}
                        options={{
                            title: "Search",
                            tabBarIcon: ({ color }) => <Icon name="ios-search" size={bottomTabStyle.icon.fontSize} color={color} />
                        }}
                    />
                    <BottomTabs.Screen
                        name="Setting"
                        component={SettingContainer}
                        options={{
                            title: "Setting",
                            tabBarIcon: ({ color }) => <Icon name="md-settings" size={bottomTabStyle.icon.fontSize} color={color} />
                        }}
                    />
                </BottomTabs.Navigator>
            </NavigationContainer>
        );
    }
};

export default BottomTabNavigator;
