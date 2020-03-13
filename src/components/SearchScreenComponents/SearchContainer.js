import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import Display from 'react-native-display';
import AsyncStorage from '@react-native-community/async-storage';

import listStyles from '../../styles/listStyle';
import inputStyle from '../../styles/inputStyle';

import axios from 'axios';

const window = Dimensions.get('window');

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subreddits: [],
            query: ''
        }

        this.loadTheme();

        //Grabbing a list of popular subreddit by default
        axios.get("https://www.reddit.com/subreddits/popular.json").then((res) => {
            this.setState({
                subreddits: res.data.data.children
            });
        });
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

    handleChangeText = (text) => {
        const query = text;
        this.setState({
            query: query
        });
    }

    onSearchPosts = () => {
        this.props.navigation.navigate('PostSearchResult', {
            query: this.state.query
        });
    }

    onSearchSubreddits = () => {
        this.props.navigation.navigate('SubredditSearchResult', {
            query: this.state.query,
            onPressSubreddit: (subName) => this.onPressSubreddit(subName)
        });
    }

    onSearchUsers = () => {
        this.props.navigation.navigate('UserSearchResult', {
            query: this.state.query
        });
    }

    onPressSubreddit = (subName) => {
        //Reset stack with currentSub param 
        const resetAction = CommonActions.reset({
            index: 0,
            actions: [
                CommonActions.navigate({ routeName: 'PostTileList', params: { currentSub: subName } }),
            ],
        });

        this.props.navigation.dispatch(resetAction);
    }

    //TODO: go to post view when user click on a list item 
    render() {
        return (
            <SafeAreaView style={this.state.theme === "light" ? listStyles.listContainerBackground : listStyles.darkListBackground}>
                <ScrollView style={{
                    backgroundColor: this.state.theme === "light" ? listStyles.listContainerBackground.backgroundColor
                        :
                        listStyles.darkListBackground.backgroundColor, height: window.height
                }}>
                    <SearchBar
                        containerStyle={this.state.theme === "light" ? inputStyle.lightContainer : inputStyle.darkContainer}
                        inputStyle={inputStyle.input}
                        inputContainerStyle={this.state.theme === "light" ? inputStyle.lightInputContainer : inputStyle.darkInputContainer}
                        placeholderTextColor={inputStyle.placeHolderColor.color}
                        placeholder='Search for subreddits, posts, or users'
                        onChangeText={(text) => this.handleChangeText(text)}
                        value={this.state.query}
                    />
                    <Display
                        enable={this.state.query !== ''}
                        enterDuration={200}
                        exitDuration={200}
                        exit="fadeOutDown"
                        enter="fadeInUp"
                    >
                        <View style={listStyles.listContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onSearchPosts();
                                }}
                            >
                                <ListItem
                                    title={`Search posts with "${this.state.query}"`}
                                    titleStyle={this.state.theme === "light" ? listStyles.lightTitle : listStyles.darkTitle}
                                    containerStyle={this.state.theme === "light"  ? listStyles.lightListItem : listStyles.darkListItem}
                                    bottomDivider
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onSearchSubreddits();
                                }}
                            >
                                <ListItem
                                    title={`Search subreddits with "${this.state.query}"`}
                                    titleStyle={this.state.theme === "light" ? listStyles.lightTitle : listStyles.darkTitle}
                                    containerStyle={this.state.theme === "light"  ? listStyles.lightListItem : listStyles.darkListItem}
                                    bottomDivider
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onSearchUsers();
                                }}
                            >
                                <ListItem
                                    title={`Search users with "${this.state.query}"`}
                                    titleStyle={this.state.theme === "light" ? listStyles.lightTitle : listStyles.darkTitle}
                                    containerStyle={this.state.theme === "light"  ? listStyles.lightListItem : listStyles.darkListItem}
                                />
                            </TouchableOpacity>
                        </View>
                    </Display>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default SearchContainer;