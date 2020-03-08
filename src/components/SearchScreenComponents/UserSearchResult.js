import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { StackActions, NavigationActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import listStyles from '../../styles/listStyle';
import inputStyle from '../../styles/inputStyle';

import axios from 'axios';

const window = Dimensions.get('window');

class UserSearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: props.route.params.query,
            isLoading: true,
            users: []
        }

        this.loadTheme();

        axios.get(`https://www.reddit.com/users/search/.json?q=${this.state.query}&include_over_18=on`).then((res) => {
            this.setState({
                users: res.data.data.children
            }, () => {
                this.setState({
                    isLoading: false
                })
            });
        });
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


    onPressUser = (userName) => {
        console.log(userName);
    }

    render() {
        return (
            <SafeAreaView style={listStyles.darkListBackground}>
                <ScrollView style={{ backgroundColor: 'black' }}>
                    <View style={{ borderRadius: 15, overflow: "hidden", margin: 10 }}>
                        {this.state.users &&
                            this.state.users.map((user, i) => (
                                <ListItem
                                    key={i}
                                    title={user.data["name"]}
                                    titleStyle={this.state.theme === "light" ? listStyles.lightTitle : listStyles.darkTitle}
                                    containerStyle={{ backgroundColor: "#262626" }}
                                    onPress={() => { this.onPressUser(user.data["name"]) }}
                                    bottomDivider
                                />
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

export default UserSearchResult;