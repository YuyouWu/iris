import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { StackActions, NavigationActions } from '@react-navigation/native';
import Display from 'react-native-display';

import listStyles from '../../styles/listStyle';
import inputStyle from '../../styles/inputStyle';

import axios from 'axios';

const window = Dimensions.get('window');

class SettingContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={listStyles.listBackground}>
                <ScrollView style={{ backgroundColor: 'black', height: window.height, marginTop: 10 }}>
                    <View style={listStyles.listContainer}>
                        <TouchableOpacity>
                            <ListItem
                                title="Theme"
                                titleStyle={listStyles.title}
                                containerStyle={{ backgroundColor: "#262626" }}
                                bottomDivider
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default SettingContainer;