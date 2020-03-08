import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, Dimensions, TouchableHighlight } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import Modal from "react-native-modal";
import { StackActions, NavigationActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import listStyles from '../../styles/listStyle';
import inputStyle from '../../styles/inputStyle';

const window = Dimensions.get('window');

class SettingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showThemeModal: false
        }
    }

    saveSetting = async (theme) => {
        try {
            await AsyncStorage.setItem('@theme', theme)
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        return (
            <SafeAreaView style={listStyles.darkListBackground}>
                <ScrollView style={{ backgroundColor: 'black', height: window.height, marginTop: 10 }}>
                    <View style={listStyles.listContainer}>
                        <TouchableHighlight
                            onPress={() => this.setState({
                                showThemeModal: true
                            })}
                        >
                            <ListItem
                                title="Theme"
                                titleStyle={listStyles.title}
                                containerStyle={{ backgroundColor: "#262626" }}
                                bottomDivider
                            />
                        </TouchableHighlight>
                        <Modal
                            isVisible={this.state.showThemeModal}
                            onBackdropPress={() => this.setState({
                                showThemeModal: false
                            })}
                            onBackButtonPress={() => this.setState({
                                showThemeModal: false
                            })}
                            useNativeDriver={true}
                            animationInTiming={100}
                            animationIn="fadeIn"
                            animationOut="fadeOut"
                        >
                            <View style={{ overflow: 'hidden', borderRadius: 10 }}>
                                <TouchableHighlight
                                    onPress={()=> {
                                        this.saveSetting("light");
                                        this.setState({
                                            showThemeModal: false
                                        });
                                    }}
                                >
                                    <ListItem
                                        titleStyle={listStyles.title}
                                        containerStyle={{ backgroundColor: "#1a1a1a" }}
                                        title="Light"
                                    />
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={()=> {
                                        this.saveSetting("dark");
                                        this.setState({
                                            showThemeModal: false
                                        });
                                    }}
                                >
                                    <ListItem
                                        titleStyle={listStyles.title}
                                        containerStyle={{ backgroundColor: "#1a1a1a" }}
                                        title="Dark"
                                    />
                                </TouchableHighlight>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default SettingContainer;