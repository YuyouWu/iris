import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import axios from 'axios';

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

    //TODO: go to post view when user click on a list item 
    render() {
        return (
            <ScrollView>
                <Input
                    placeholder='Search for subreddits'
                    onSubmitEditing={(e) => this.onSearchSubmit(e)}
                />
                {this.state.subreddits &&
                    this.state.subreddits.map((subreddit, i) => (
                        <ListItem
                            key={i}
                            title={subreddit.data.display_name}
                        />
                    ))
                }
            </ScrollView>
        );
    }
};

export default SearchContainer;