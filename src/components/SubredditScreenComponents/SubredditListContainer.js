import React, { Component } from 'react';
import { ScrollView, SafeAreaView, View, Text, Dimensions } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';

import listStyles from '../../styles/listStyle';
import inputStyle from '../../styles/inputStyle';

const window = Dimensions.get('window');

class SubredditListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscription: [],
            query:''
        }
    }

    handleChangeText = (text) => {
        const query = text;
        this.setState({
            query: query
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
                <ScrollView style={{ backgroundColor: 'black', height: window.height }}>
                    <View style={listStyles.darkListBackground}>

                        <SearchBar
                            containerStyle={inputStyle.container}
                            inputStyle={inputStyle.input}
                            inputContainerStyle={inputStyle.inputContainer}
                            placeholderTextColor={inputStyle.placeHolderColor.color}
                            placeholder='Filter Subreddits'
                            onChangeText={(text) => this.handleChangeText(text)}
                            value={this.state.query}
                        />

                        <View style={listStyles.listContainer}>
                            <ListItem
                                key="home"
                                title="Home"
                                titleStyle={listStyles.title}
                                containerStyle={{ backgroundColor: "#262626" }}
                                bottomDivider
                            />
                            <ListItem
                                key="popular"
                                title="Popular"
                                titleStyle={listStyles.title}
                                containerStyle={{ backgroundColor: "#262626" }}
                                bottomDivider
                                onPress={() => { this.onPressSubreddit("popular") }}
                            />
                            <ListItem
                                key="all"
                                title="All"
                                titleStyle={listStyles.title}
                                containerStyle={{ backgroundColor: "#262626" }}
                                bottomDivider
                                onPress={() => { this.onPressSubreddit("all") }}
                            />
                        </View>
                        <Text style={listStyles.label}>Subscription</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default SubredditListContainer;