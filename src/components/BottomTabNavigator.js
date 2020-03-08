import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, CardStyleInterpolators, TransitionSpecs } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

import SubredditListContainer from './SubredditScreenComponents/SubredditListContainer';
import Post from '../components/PostScreenComponents/Post';
import SearchContainer from '../components/SearchScreenComponents/SearchContainer';
import UserSearchResult from '../components/SearchScreenComponents/UserSearchResult';
import PostSearchResult from '../components/SearchScreenComponents/PostSearchResult';
import SubredditSearchResult from '../components/SearchScreenComponents/SubredditSearchResult';
import SettingStackNavigator from '../components/SettingScreenComponents/SettingStackNavigator';
import PostTileStackNavigator from '../components/PostScreenComponents/PostTileStackNavigator';
import ProfileContainer from '../components/ProfileComponents/ProfileContainer';

import bottomTabStyle from '../styles/bottomTabStyle';
import postTileStackStyle from '../styles/postTileStackStyle';

const SearchStack = createStackNavigator();

function RenderSearchStack() {
    return (
        <SearchStack.Navigator
            initialRouteName="SearchContainer"
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

const BottomTabs = createBottomTabNavigator();

class BottomTabNavigator extends React.Component {
    constructor() {
        super();
        this.state = {
            theme: "dark"
        }
        this.loadTheme();
    }

    loadTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('@theme');
            this.setState({
                theme
            })
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <NavigationContainer>
                <BottomTabs.Navigator
                    initialRouteName="Posts"
                    tabBarOptions={{
                        activeTintColor: this.state.theme === "light" ? bottomTabStyle.lightActiveTintColor.color : bottomTabStyle.darkActiveTintColor.color,
                        inactiveTintColor: bottomTabStyle.inactiveTintColor.color,
                        style: this.state.theme === "light" ? bottomTabStyle.lightTabBar : bottomTabStyle.darkTabBar,
                        keyboardHidesTabBar: true
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
                        component={PostTileStackNavigator}
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
                        name="Settings"
                        component={SettingStackNavigator}
                        options={{
                            title: "Settings",
                            tabBarIcon: ({ color }) => <Icon name="md-settings" size={bottomTabStyle.icon.fontSize} color={color} />
                        }}
                    />
                </BottomTabs.Navigator>
            </NavigationContainer>
        );
    }
};

export default BottomTabNavigator;
