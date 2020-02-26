import React, { Component } from 'react';
import { ScrollView, SafeAreaView, View, Text, Dimensions } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';

import listStyles from '../../styles/listStyle';
import inputStyle from '../../styles/inputStyle';

const window = Dimensions.get('window');

class SubredditListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscription: []
        }
    }

    onPressSubreddit = (subName) => {
        this.props.navigation.navigate('PostTileList', {
            currentSub: subName
        });
}

    render() {
        return (
            <SafeAreaView style={listStyles.listBackground}>
                <ScrollView style={{backgroundColor: 'black', height: window.height}}>
                    <View style={listStyles.listBackground}>
                        <Input
                            containerStyle={inputStyle.container}
                            inputStyle={inputStyle.input}
                            inputContainerStyle={inputStyle.inputContainer}
                            placeholderTextColor={inputStyle.placeHolderColor.color}
                            placeholder='Filter Subreddits'
                        />
                        <ListItem
                            key="home"
                            title="Home"
                            titleStyle={listStyles.title}
                            containerStyle={listStyles.listBackground}
                            bottomDivider
                        />
                        <ListItem
                            key="popular"
                            title="Popular"
                            titleStyle={listStyles.title}
                            containerStyle={listStyles.listBackground}
                            bottomDivider
                            onPress={() => { this.onPressSubreddit("popular") }}
                        />
                        <ListItem
                            key="all"
                            title="All"
                            titleStyle={listStyles.title}
                            containerStyle={listStyles.listBackground}
                            bottomDivider
                            onPress={() => { this.onPressSubreddit("all") }}
                        />
                        <Text style={listStyles.title}>Subscription</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default SubredditListContainer;