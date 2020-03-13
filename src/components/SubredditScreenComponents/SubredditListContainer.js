import React, { Component } from 'react';
import { ScrollView, SafeAreaView, View, Text, Dimensions } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';


import listStyles from '../../styles/listStyle';
import inputStyle from '../../styles/inputStyle';

class SubredditListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subscription: [],
            query: ''
        }
        this.loadTheme();
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

    onPressSubreddit = (subName) => {
        this.props.navigation.navigate('PostTileList', {
            currentSub: subName
        });
    }

    render() {
        return (
            <SafeAreaView style={this.state.theme === "light" ? listStyles.lightListBackground : listStyles.darkListBackground}>
                <ScrollView style={{ backgroundColor: this.state.theme === 'light' ? listStyles.listContainerBackground.backgroundColor : "black", height: '100%' }}>
                    <View style={this.state.theme === "light" ? listStyles.listContainerBackground : listStyles.darkListBackground}>
                        <SearchBar
                            containerStyle={this.state.theme === "light" ? inputStyle.lightContainer : inputStyle.darkContainer}
                            inputStyle={inputStyle.input}
                            inputContainerStyle={inputStyle.lightInputContainer}
                            placeholderTextColor={inputStyle.placeHolderColor.color}
                            placeholder='Filter Subreddits'
                            onChangeText={(text) => this.handleChangeText(text)}
                            value={this.state.query}
                        />

                        <View style={listStyles.listContainer}>
                            <ListItem
                                key="home"
                                title="Home"
                                titleStyle={this.state.theme === "light" ? listStyles.lightTitle : listStyles.darkTitle}
                                containerStyle={this.state.theme === "light" ? listStyles.lightListItem : listStyles.darkListItem}
                                bottomDivider
                            />
                            <ListItem
                                key="popular"
                                title="Popular"
                                titleStyle={this.state.theme === "light" ? listStyles.lightTitle : listStyles.darkTitle}
                                containerStyle={this.state.theme === "light" ? listStyles.lightListItem : listStyles.darkListItem}
                                bottomDivider
                                onPress={() => { this.onPressSubreddit("popular") }}
                            />
                            <ListItem
                                key="all"
                                title="All"
                                titleStyle={this.state.theme === "light" ? listStyles.lightTitle : listStyles.darkTitle}
                                containerStyle={this.state.theme === "light" ? listStyles.lightListItem : listStyles.darkListItem}
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