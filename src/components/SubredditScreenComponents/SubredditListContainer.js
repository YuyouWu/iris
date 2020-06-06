import React, { Component } from 'react';
import { ScrollView, SafeAreaView, View, Text, Dimensions, StyleSheet } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { useTheme } from '@react-navigation/native';

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
            <SafeAreaView>
                <ScrollView style={{
                    backgroundColor: this.props.theme.colors.containerBackground,
                    height: window.height
                }}>
                    <SearchBar
                        containerStyle={{
                            backgroundColor: this.props.theme.colors.tileBackground,
                            borderBottomColor: this.props.theme.colors.tileBackground
                        }}
                        inputStyle={{ color: this.props.theme.colors.primaryText }}
                        inputContainerStyle={{
                            backgroundColor: this.props.theme.colors.inputBackground,
                            borderRadius: 10,
                            marginTop: 10,
                            marginBottom: 10
                        }}
                        placeholderTextColor={styles.placeHolder}
                        placeholder='Search for subreddits, posts, or users'
                        onChangeText={(text) => this.handleChangeText(text)}
                        value={this.state.query}
                    />

                    <View style={styles.listContainer}>
                        <ListItem
                            key="home"
                            title="Home"
                            titleStyle={{ color: this.props.theme.colors.primaryText }}
                            containerStyle={{ backgroundColor: this.props.theme.colors.tileBackground }}
                            bottomDivider
                        />
                        <ListItem
                            key="popular"
                            title="Popular"
                            titleStyle={{ color: this.props.theme.colors.primaryText }}
                            containerStyle={{ backgroundColor: this.props.theme.colors.tileBackground }}
                            bottomDivider
                            onPress={() => { this.onPressSubreddit("popular") }}
                        />
                        <ListItem
                            key="all"
                            title="All"
                            titleStyle={{ color: this.props.theme.colors.primaryText }}
                            containerStyle={{ backgroundColor: this.props.theme.colors.tileBackground }}
                            onPress={() => { this.onPressSubreddit("all") }}
                        />
                    </View>
                    <Text style={{ color: this.props.theme.colors.primaryText }}>Subscription</Text>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default function (props) {
    const theme = useTheme();
    return <SubredditListContainer {...props} theme={theme} />
}

const styles = StyleSheet.create({
    listContainer: {
        borderRadius: 10,
        overflow: "hidden",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    placeHolder: {
        color: '#b3b3b3'
    }
})
