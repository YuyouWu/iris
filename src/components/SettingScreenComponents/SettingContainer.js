import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, Dimensions, TouchableHighlight } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import Modal from "react-native-modal";
import { StackActions, NavigationActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const window = Dimensions.get('window');

class SettingContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showThemeModal: false,
            theme: "dark"
        }
        this.loadTheme();
    }

    saveSetting = async (theme) => {
        try {
            await AsyncStorage.setItem('@theme', theme)
        } catch (e) {
            console.log(e);
        }
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

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={{
                    backgroundColor: this.props.theme.colors.containerBackground,
                    height: window.height
                }}>
                    <View style={{ borderRadius: 15, overflow: "hidden", margin: 10 }}>
                        <TouchableHighlight
                            onPress={() => this.setState({
                                showThemeModal: true
                            })}
                        >
                            <ListItem
                                title="Theme"
                                titleStyle={{ color: this.props.theme.colors.primaryText }}
                                containerStyle={{
                                    backgroundColor: this.props.theme.colors.tileBackground
                                }}
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
                                    onPress={() => {
                                        this.saveSetting("light");
                                        this.setState({
                                            showThemeModal: false
                                        });
                                    }}
                                >
                                    <ListItem
                                        titleStyle={{color: this.props.theme.colors.primaryText}}
                                        containerStyle={{
                                            backgroundColor: this.props.theme.colors.tileBackground
                                        }}
                                        title="Light"
                                    />
                                </TouchableHighlight>
                                <TouchableHighlight
                                    onPress={() => {
                                        this.saveSetting("dark");
                                        this.setState({
                                            showThemeModal: false
                                        });
                                    }}
                                >
                                    <ListItem
                                        titleStyle={{color: this.props.theme.colors.primaryText}}
                                        containerStyle={{
                                            backgroundColor: this.props.theme.colors.tileBackground
                                        }}
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

export default function (props) {
    const theme = useTheme();
    return <SettingContainer {...props} theme={theme} />
}
