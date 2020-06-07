import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import Display from 'react-native-display';
import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from '@react-navigation/native';

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
            <SafeAreaView style={{
                backgroundColor: this.props.theme.colors.tileBackground
            }}>
                <ScrollView style={{
                    backgroundColor: this.props.theme.colors.containerBackground,
                    height: window.height
                }}>
                    <SearchBar
                        containerStyle={{
                            backgroundColor: this.props.theme.colors.tileBackground,
                            borderBottomColor: this.props.theme.colors.tileBackground
                        }}
                        inputStyle={{ color: this.props.theme.colors.primaryText }}
                        inputContainerStyle={{
                            backgroundColor: this.props.theme.colors.inputBackground,
                            borderRadius: 10,
                            marginTop: 10,
                            marginBottom: 10
                        }}
                        placeholderTextColor={styles.placeHolder.color}
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
                        <View style={styles.listContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onSearchPosts();
                                }}
                            >
                                <ListItem
                                    title={`Search posts with "${this.state.query}"`}
                                    titleStyle={{color: this.props.theme.colors.primaryText}}
                                    containerStyle={{backgroundColor: this.props.theme.colors.tileBackground}}
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
                                    titleStyle={{color: this.props.theme.colors.primaryText}}
                                    containerStyle={{backgroundColor: this.props.theme.colors.tileBackground}}
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
                                    titleStyle={{color: this.props.theme.colors.primaryText}}
                                    containerStyle={{backgroundColor: this.props.theme.colors.tileBackground}}
                                />
                            </TouchableOpacity>
                        </View>
                    </Display>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default function (props) {
    const theme = useTheme();
    return <SearchContainer {...props} theme={theme} />
}

const styles = StyleSheet.create({
    listContainer: {
        borderRadius: 10,
        overflow: "hidden",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    placeHolder: {
        color: '#b3b3b3'
    }
})

