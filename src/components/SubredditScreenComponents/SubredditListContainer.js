import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import axios from 'axios';

class SubredditListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscription: []
        }
    }

    onPressSubreddit = (subName) => {
        this.props.navigation.navigate("PostNavigator", {
            currentSub: subName
        });
    }

    render() {
        return (
            <ScrollView>
                <Input
                    placeholder='Filter'
                />
                <ListItem
                    key="home"
                    title="Home"
                    bottomDivider
                />
                <ListItem
                    key="popular"
                    title="Popular"
                    bottomDivider
                    onPress = {() => {this.onPressSubreddit("popular")}}
                />
                <ListItem
                    key="all"
                    title="All"
                    bottomDivider
                    onPress = {() => {this.onPressSubreddit("all")}}
                />
                <Text style={{marginTop:15, marginLeft: 10}}>Subscription</Text>
            </ScrollView>
        );
    }
};

export default SubredditListContainer;