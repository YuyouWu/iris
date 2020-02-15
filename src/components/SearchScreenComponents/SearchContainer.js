import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';

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

        //Grabbing a list of popular subreddit by default
        axios.get("https://www.reddit.com/subreddits/popular.json").then((res) => {
            this.setState({
                subreddits: res.data.data.children
            });
        });
    }

    handleChangeText = (text) => {
        const query = text;
        this.setState({
            query: query
        });
    }

    onSearchSubmit = (context) => {
        console.log(context);
        this.props.navigation.navigate('SearchResult');
        // axios.get(`https://www.reddit.com/subreddits/search/.json?q=${query}&include_over_18=on`).then((res) => {
        //     this.setState({
        //         subreddits: res.data.data.children
        //     });
        // });
    }

    onPressSubreddit = (subName) => {
        //Reset stack with currentSub param 
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'PostTileList', params: { currentSub: subName } }),
            ],
        });

        this.props.navigation.dispatch(resetAction);
    }

    //TODO: go to post view when user click on a list item 
    render() {
        return (
            <SafeAreaView style={listStyles.listBackground}>
                <ScrollView style={{ backgroundColor: 'black', height: window.height }}>
                    <Input
                        containerStyle={inputStyle.container}
                        inputStyle={inputStyle.input}
                        inputContainerStyle={inputStyle.inputContainer}
                        placeholderTextColor={inputStyle.placeHolderColor.color}
                        placeholder='Search for subreddits, posts, or users'
                        // onSubmitEditing={(e) => this.onSearchSubmit(e)}
                        onChangeText={(text) => this.handleChangeText(text)}
                    />
                    {this.state.query !== '' &&
                        <View style={{ borderRadius: 15, overflow: "hidden", marginLeft: 10, marginRight: 10 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onSearchSubmit("posts");
                                }}
                            >
                                <ListItem
                                    title={`Search posts with "${this.state.query}"`}
                                    titleStyle={listStyles.title}
                                    containerStyle={{ backgroundColor: "#262626" }}
                                    bottomDivider
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onSearchSubmit("subreddits");
                                }}
                            >
                                <ListItem
                                    title={`Search subreddits with "${this.state.query}"`}
                                    titleStyle={listStyles.title}
                                    containerStyle={{ backgroundColor: "#262626" }}
                                    bottomDivider
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onSearchSubmit("users");
                                }}
                            >
                                <ListItem
                                    title={`Search users with "${this.state.query}"`}
                                    titleStyle={listStyles.title}
                                    containerStyle={{ backgroundColor: "#262626" }}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                    {/* <Text style={{ color: 'grey', margin: 15 }}>Popular Subreddits</Text>
                    <View style={{ borderRadius: 15, overflow: "hidden", marginLeft: 10, marginRight: 10, marginBottom: 90 }}>
                        {this.state.subreddits &&
                            this.state.subreddits.map((subreddit, i) => (
                                <ListItem
                                    key={i}
                                    title={subreddit.data["display_name"]}
                                    titleStyle={listStyles.title}
                                    containerStyle={{ backgroundColor: "#262626" }}
                                    onPress={() => { this.onPressSubreddit(subreddit.data["display_name"]) }}
                                    bottomDivider
                                />
                            ))
                        }
                    </View> */}
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default SearchContainer;