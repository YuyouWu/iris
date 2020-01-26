import React, { Component } from 'react';
import { Text, View, ScrollView, StatusBar, SafeAreaView, RefreshControl, ActivityIndicator } from 'react-native';
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
            subreddit: 'all'
        }

        this.getPost();
    }

    getPost = () => {
        axios.get(`https://old.reddit.com/r/${this.state.subreddit}/.json`).then((res) => {
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
        //Get last post id
        const lastPostID = this.state.posts[this.state.posts.length - 1].data.name;
        //Fetch 25 more post after the last post 
        axios.get(`https://old.reddit.com/r/${this.state.subreddit}/.json?count=25&after=${lastPostID}`).then((res) => {
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

    shouldComponentUpdate(props,state) {
        const currentSub = props.navigation.getScreenProps().currentSub;
        if(currentSub && state.subreddit !== currentSub){
            this.setState({
                subreddit: currentSub
            }, () => {
                this.onRefresh();
            });
        } 
        return true;    
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: "black" }}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                        }
                        contentContainerStyle={{ backgroundColor: 'black' }}
                        scrollEventThrottle={50}
                        onScroll={({ nativeEvent }) => {
                            if (this.isCloseToBottom(nativeEvent) && this.state.isLoadingMorePost === false) {
                                this.setState({
                                    isLoadingMorePost: true
                                });
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
                                        if (!this.state.isLoadingMorePost) {
                                            this.props.navigation.navigate('Post', {
                                                post: post
                                            });
                                        }
                                    }}
                                />
                            ))
                        }

                        {this.state.isLoadingMorePost ? (
                            <ListItem
                                stye={{ padding: 10 }}
                                containerStyle={{ backgroundColor: 'black' }}
                                title={<ActivityIndicator stye={{ width: 50, height: 50, paddingTop: 10 }} size="large" color="white" />}
                            />
                        ) : (
                                <ListItem
                                    stye={{ padding: 10, width: 50, height: 50 }}
                                    containerStyle={{ backgroundColor: 'black' }}
                                />
                            )
                        }
                    </ScrollView>
            </SafeAreaView>
        );
    }
};

export default PostTileList;