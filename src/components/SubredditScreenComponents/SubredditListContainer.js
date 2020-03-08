import React, { Component } from 'react';
import { ScrollView, SafeAreaView, View, Text, Dimensions } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';


import listStyles from '../../styles/listStyle';
import inputStyle from '../../styles/inputStyle';

const window = Dimensions.get('window');

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
                <ScrollView style={{ backgroundColor: 'black', height: '100%' }}>
                    <View style={this.state.theme === "light" ? listStyles.lightListBackground : listStyles.darkListBackground}>
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
                                titleStyle={this.state.theme === "light" ? listStyles.lightTitle : listStyles.darkTitle}
                                containerStyle={{ backgroundColor: "#262626" }}
                                bottomDivider
                            />
                            <ListItem
                                key="popular"
                                title="Popular"
                                titleStyle={this.state.theme === "light" ? listStyles.lightTitle : listStyles.darkTitle}
                                containerStyle={{ backgroundColor: "#262626" }}
                                bottomDivider
                                onPress={() => { this.onPressSubreddit("popular") }}
                            />
                            <ListItem
                                key="all"
                                title="All"
                                titleStyle={this.state.theme === "light" ? listStyles.lightTitle : listStyles.darkTitle}
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