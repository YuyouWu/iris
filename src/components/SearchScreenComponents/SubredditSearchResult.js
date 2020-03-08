import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

import listStyles from '../../styles/listStyle';

class SubredditSearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: props.route.params.query,
            isLoading: true,
            subreddits: []
        }
        axios.get(`https://www.reddit.com/subreddits/search/.json?q=${this.state.query}&include_over_18=on`).then((res) => {
            this.setState({
                subreddits: res.data.data.children
            }, () => {
                this.setState({
                    isLoading: false
                })
            });
        });
    }

    onPressSubreddit = (subName) => {
        this.props.navigation.navigate('PostTileList', {
            currentSub: subName
        });
    }

    render() {
        return (
            <SafeAreaView style={listStyles.darkListBackground}>
                <ScrollView style={{ backgroundColor: 'black' }}>
                    <View style={{ borderRadius: 15, overflow: "hidden", margin: 10 }}>
                        {this.state.subreddits &&
                            this.state.subreddits.map((subreddit, i) => (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => { this.onPressSubreddit(subreddit.data["display_name"]) }}
                                >
                                    <ListItem
                                        title={subreddit.data["display_name"]}
                                        titleStyle={listStyles.title}
                                        subtitle={subreddit.data["public_description"]}
                                        subtitleStyle={{ color: "grey" }}
                                        containerStyle={{ backgroundColor: "#262626" }}
                                        bottomDivider
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </View>

                    {this.state.isLoading &&
                        <ListItem
                            containerStyle={listStyles.darkListBackground}
                            title={<ActivityIndicator stye={{ width: 50, height: 50, paddingTop: 10 }} size="large" color="white" />}
                        />
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default SubredditSearchResult;