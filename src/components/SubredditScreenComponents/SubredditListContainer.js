import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import axios from 'axios';

class SubredditListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subreddits: []
        }
    }

    render() {
        return (
            <View>
                <Text>This is the subreddit list comoponent</Text>
                <Text>It will show the list of subreddits the user is subscribed to</Text>
            </View>
        );
    }
};

export default SubredditListContainer;