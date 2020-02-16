import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Input, ListItem } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import PostThumbNail from '../PostScreenComponents/PostThumbNail';
import listStyles from '../../styles/listStyle';

import axios from 'axios';

const window = Dimensions.get('window');

class PostSearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: props.navigation.getParam('query'),
            isLoading: true,
            posts: []
        }

        axios.get(`https://www.reddit.com/search/.json?q=${this.state.query}&sort=relevance&t=all&include_over_18=on`).then((res) => {
            this.setState({
                posts: res.data.data.children
            }, () => {
                this.setState({
                    isLoading: false
                })
            });
        });
    }

    renderPostSubtitle = (subreddit, score) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'grey' }}>
                    {subreddit}
                </Text>
                <Text style={{ color: 'grey', marginLeft: 15 }}>
                    <Icon name='ios-arrow-round-up' color='grey' size={15} /> {score}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <SafeAreaView style={listStyles.listBackground}>
                <ScrollView style={{ backgroundColor: 'black' }}>
                    {this.state.posts &&
                        this.state.posts.map((post, i) => (
                            <ListItem
                                key={i}
                                title={post.data.title}
                                subtitle={this.renderPostSubtitle(post.data.subreddit, post.data.score)}
                                topDivider
                                titleStyle={listStyles.title}
                                containerStyle={listStyles.listBackground}
                                leftElement={
                                    <PostThumbNail
                                        preview={post.data.preview}
                                        secureMedia={post.data['secure_media']}
                                        linkURL={post.data.url}
                                        postHint={post.data['post_hint']}
                                        thumbnailURL={post.data.thumbnail}
                                        navigation={this.props.navigation}
                                        post={post}
                                    />
                                }
                                onPress={() => {
                                    this.props.navigation.navigate('Post', {
                                        post: post
                                    });
                                }}
                            />
                        ))
                    }
                    {this.state.isLoading &&
                        <ListItem
                            containerStyle={listStyles.listBackground}
                            title={<ActivityIndicator stye={{ width: 50, height: 50, paddingTop: 10 }} size="large" color="white" />}
                        />
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default PostSearchResult;