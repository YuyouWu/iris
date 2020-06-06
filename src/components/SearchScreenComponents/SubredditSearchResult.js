import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class SubredditSearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: props.route.params.query,
            isLoading: true,
            subreddits: [],
            theme: 'dark'
        }

        this.loadTheme();

        axios.get(`https://www.reddit.com/subreddits/search/.json?q=${this.state.query}&include_over_18=on`).then((res) => {
            this.setState({
                subreddits: res.data.data.children
            }, () => {
                this.setState({
                    isLoading: false
                })
            });
        });
    }

    onPressSubreddit = (subName) => {
        this.props.navigation.navigate('PostTileList', {
            currentSub: subName
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

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={{ backgroundColor: this.props.theme.colors.containerBackgound }}>
                    <View style={{ borderRadius: 15, overflow: "hidden", margin: 10 }}>
                        {this.state.subreddits &&
                            this.state.subreddits.map((subreddit, i) => (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => { this.onPressSubreddit(subreddit.data["display_name"]) }}
                                >
                                    <ListItem
                                        title={subreddit.data["display_name"]}
                                        titleStyle={{color: this.props.theme.colors.primaryText}}
                                        subtitle={subreddit.data["public_description"]}
                                        subtitleStyle={{ color: "grey" }}
                                        containerStyle={this.props.theme.colors.tileBackground}
                                        bottomDivider
                                    />
                                </TouchableOpacity>
                            ))
                        }
                    </View>

                    {this.state.isLoading &&
                        <ListItem
                            containerStyle={{ backgroundColor: this.props.theme.colors.containerBackgound }}
                            title={<ActivityIndicator stye={{ width: 50, height: 50, paddingTop: 10 }} size="large" color={this.props.theme.colors.primaryText} />}
                        />
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default function (props) {
    const theme = useTheme();
    return <SubredditSearchResult {...props} theme={theme} />
}
