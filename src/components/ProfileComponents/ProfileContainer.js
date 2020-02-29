import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { StackActions, NavigationActions } from '@react-navigation/native';
import Display from 'react-native-display';

import listStyles from '../../styles/listStyle';
import inputStyle from '../../styles/inputStyle';

import axios from 'axios';


class ProfileContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <Text>This is the Profile Container</Text>
            </SafeAreaView>
        );
    }
};

export default ProfileContainer;