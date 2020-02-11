import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';

import listStyles from '../../styles/listStyle';
import inputStyle from '../../styles/inputStyle';

import axios from 'axios';

const window = Dimensions.get('window');

class SearchResult extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <SafeAreaView style={listStyles.listBackground}>
                <ScrollView style={{ backgroundColor: 'black', height: window.height }}>
                    <Text> This is the search result view</Text>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default SearchResult;