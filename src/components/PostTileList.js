import React, { Component } from 'react';
import { Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

import PostThumbNail from './PostThumbNail';

class PostTileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            postCount: 0,
            isLoadingMorePost: false,
            refreshing: false,
        }
        this.getPost();
    }

    getPost = () => {
        axios.get('https://old.reddit.com/r/all/.json').then((res) => {
            this.setState({
                posts: res.data.data.children
            });
        }).then(() => {
            this.setState({
                refreshing: false
            });
        });
    }

    loadMorePost = () => {
        this.setState({
            isLoadingMorePost: true,
            // postCount: this.state.postCount + 25
        });

        //Get last post id
        const lastPostID = this.state.posts[this.state.posts.length - 1].data.name;
        axios.get(`https://old.reddit.com/r/all/.json?count=50&after=${lastPostID}`).then((res) => {
            let currentPosts = this.state.posts;
            const newPosts = res.data.data.children;
            currentPosts.push.apply(currentPosts, newPosts);
            this.setState({
                posts: currentPosts,
                isLoadingMorePost: false
            });
        });
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 200;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    onRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.getPost();
        });
    }

    renderPostSubtitle = (subreddit, score) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'grey' }}>
                    {subreddit + " "}
                </Text>
                <Text style={{ color: 'grey' }}>
                    <Icon name='arrowup' color='grey' /> {score}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                }
                contentContainerStyle={{ backgroundColor: 'black' }}
                scrollEventThrottle={50}
                onScroll={({ nativeEvent }) => {
                    if (this.isCloseToBottom(nativeEvent)) {
                        this.loadMorePost();
                    }
                }}
            >
                {this.state.posts &&
                    this.state.posts.map((post, i) => (
                        <ListItem
                            key={i}
                            title={post.data.title}
                            subtitle={this.renderPostSubtitle(post.data.subreddit, post.data.score)}
                            bottomDivider
                            titleStyle={{ color: 'white' }}
                            containerStyle={{ backgroundColor: 'black' }}
                            leftElement={<PostThumbNail thumbnailURL={post.data.thumbnail} linkURL={post.data.url} postHint={post.data['post_hint']} navigation={this.props.navigation} />}
                            onPress={() => {
                                if (!this.state.isLoadingMorePost) {
                                    this.props.navigation.navigate('Post', {
                                        post: post
                                    });
                                }
                            }}
                        />
                    ))
                }

                <ListItem
                    stye={{ padding: 10 }}
                    containerStyle={{ backgroundColor: 'black' }}
                    title={<ActivityIndicator stye={{ width: 50, height: 50, paddingTop: 10 }} size="large" color="white" />}
                />

            </ScrollView>
        );
    }
};

export default PostTileList;