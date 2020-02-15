import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

import listStyles from '../../styles/listStyle';

class SubredditSearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: props.navigation.getParam('query'),
            subreddits: []
        }
        axios.get(`https://www.reddit.com/subreddits/search/.json?q=${this.state.query}&include_over_18=on`).then((res) => {
            this.setState({
                subreddits: res.data.data.children
            });
        });
    }

    onPressSubreddit = (subName) => {
        // const resetAction = StackActions.reset({
        //     index: 0,
        //     actions: [
        //         NavigationActions.navigate({ routeName: 'PostTileList', params: { currentSub: subName } }),
        //     ],
        // });

        this.props.navigation.navigate('PostTileList', {
            currentSub: subName
        });
    }

    render() {
        return (
            <SafeAreaView style={listStyles.listBackground}>
                <ScrollView style={{ backgroundColor: 'black' }}>
                    <View style={{ borderRadius: 15, overflow: "hidden", margin: 10 }}>
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
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default SubredditSearchResult;