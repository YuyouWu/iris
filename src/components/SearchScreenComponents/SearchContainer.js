import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, TextInput, Dimensions } from 'react-native';
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
            subreddits: []
        }

        //Grabbing a list of popular subreddit by default
        axios.get("https://www.reddit.com/subreddits/popular.json").then((res) => {
            this.setState({
                subreddits: res.data.data.children
            });
        });
    }

    onSearchSubmit = (e) => {
        //TODO: Error handling
        const query = e.nativeEvent.text;
        axios.get(`https://www.reddit.com/subreddits/search/.json?q=${query}&include_over_18=on`).then((res) => {
            this.setState({
                subreddits: res.data.data.children
            });
        });
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
                        placeholder='  Search for subreddits, posts, or users'
                        onSubmitEditing={(e) => this.onSearchSubmit(e)}
                    />
                    {this.state.subreddits &&
                        this.state.subreddits.map((subreddit, i) => (
                            <ListItem
                                key={i}
                                title={subreddit.data["display_name"]}
                                titleStyle={listStyles.title}
                                containerStyle={listStyles.listBackground}
                                onPress={() => { this.onPressSubreddit(subreddit.data["display_name"]) }}
                                bottomDivider
                            />
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default SearchContainer;