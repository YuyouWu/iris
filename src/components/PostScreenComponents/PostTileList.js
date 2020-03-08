import React, { Component } from 'react';
import { Text, View, ScrollView, StatusBar, SafeAreaView, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import listStyles from '../../styles/listStyle';
import modalStyle from '../../styles/modalStyle';

import { kFormatter } from '../utils/numUtils';
import PostThumbNail from './PostThumbNail';

class PostTileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "dark",
            posts: [],
            isLoadingMorePost: false,
            refreshing: true,
            showSortingOverlay: false,
            showSortingOverlayTop: false,
            sortingParam: "",
            sortingParamTop: "",
            subreddit: props.route.params?.currentSub ?? 'all'
        }
        this.loadTheme();
        this.getPost();
    }

    loadTheme = async () => {
        try {
            const theme = await AsyncStorage.getItem('@theme');
            this.setState({
                theme
            });
        } catch (e) {
            console.log(e);
        }
    }

    getPost = () => {
        axios.get(`https://old.reddit.com/r/${this.state.subreddit}/${this.state.sortingParam}/.json?${this.state.sortingParamTop}`).then((res) => {
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
        if (this.state.posts.length > 0) {
            this.setState({
                isLoadingMorePost: true
            });
            //Get last post id
            const lastPostID = this.state.posts[this.state.posts.length - 1].data.name;
            //Fetch 25 more post after the last post 
            axios.get(`https://old.reddit.com/r/${this.state.subreddit}/${this.state.sortingParam}/.json?count=25&after=${lastPostID}&${this.state.sortingParamTop}`).then((res) => {
                let currentPosts = this.state.posts;
                const newPosts = res.data.data.children;
                currentPosts.push.apply(currentPosts, newPosts);
                this.setState({
                    posts: currentPosts,
                    isLoadingMorePost: false
                });
            });
        }
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 500;
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

    renderPostSubtitle = (subreddit, score, numComments) => {
        const formattedScore = kFormatter(score);
        const pushSubredditPostTileList = StackActions.push(
            'PostTileList',
            {
                currentSub: subreddit
            }
        );

        return (
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <TouchableOpacity
                    onPress={() => {
                        if (subreddit !== this.state.subreddit) {
                            this.props.navigation.dispatch(pushSubredditPostTileList);
                        }
                    }}
                >
                    <Text style={{ color: 'grey' }}>
                        {subreddit}
                    </Text>
                </TouchableOpacity>
                <MaterialIcons name='arrow-upward' color='grey' size={18} style={{ marginLeft: 15, marginRight: 5 }} />
                <Text style={{ color: 'grey' }}>
                    {formattedScore}
                </Text>
                <MaterialIcons name='chat-bubble' color='grey' size={18} style={{ marginLeft: 15, marginRight: 5 }} />
                <Text style={{ color: 'grey' }}>
                    {numComments}
                </Text>
            </View>
        );
    }

    renderPostTitle = (title, post) => {
        return (
            <Text style={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}>
                {title}
            </Text>
        );
    }

    scrollToTop = () => {
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    }

    shouldComponentUpdate(props, state) {
        const newSub = props.route.params?.currentSub;
        const currentSub = state.subreddit;
        if (newSub && newSub !== currentSub) {
            this.setState({
                subreddit: newSub
            }, () => {
                this.onRefresh();
                this.scrollToTop();
            });
            return true;
        }
        return true;
    }

    render() {
        return (
            <SafeAreaView style={this.state.theme === "light" ? listStyles.lightListBackground : listStyles.darkListBackground}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <View style={listStyles.containerBackground}>
                    <Modal
                        isVisible={this.state.showSortingOverlay}
                        onBackdropPress={() => this.setState({
                            showSortingOverlay: false,
                            showSortingOverlayTop: false
                        })}
                        onBackButtonPress={() => this.setState({
                            showSortingOverlay: false,
                            showSortingOverlayTop: false
                        })}
                        useNativeDriver={true}
                        animationInTiming={100}
                        animationIn="fadeIn"
                        animationOut="fadeOut"
                    >
                        {this.state.showSortingOverlayTop ? (
                            <View style={{ overflow: 'hidden', borderRadius: 10 }}>
                                <ListItem
                                    titleStyle={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}
                                    containerStyle={this.state.theme === 'light'? modalStyle.lightModalContainer : modalStyle.darkModalContainer}
                                    title="Hour"
                                    onPress={() => {
                                        this.setState({
                                            sortingParam: 'top',
                                            sortingParamTop: 'sort=top&t=hour',
                                            showSortingOverlay: false,
                                            showSortingOverlayTop: false
                                        }, () => {
                                            this.onRefresh();
                                        });
                                    }}
                                />
                                <ListItem
                                    titleStyle={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}
                                    containerStyle={this.state.theme === 'light'? modalStyle.lightModalContainer : modalStyle.darkModalContainer}
                                    title="Day"
                                    onPress={() => {
                                        this.setState({
                                            sortingParam: 'top',
                                            sortingParamTop: 'sort=top&t=day',
                                            showSortingOverlay: false,
                                            showSortingOverlayTop: false
                                        }, () => {
                                            this.onRefresh();
                                        });
                                    }}
                                />
                                <ListItem
                                    titleStyle={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}
                                    containerStyle={this.state.theme === 'light'? modalStyle.lightModalContainer : modalStyle.darkModalContainer}
                                    title="Week"
                                    onPress={() => {
                                        this.setState({
                                            sortingParam: 'top',
                                            sortingParamTop: 'sort=top&t=week',
                                            showSortingOverlay: false,
                                            showSortingOverlayTop: false
                                        }, () => {
                                            this.onRefresh();
                                        });
                                    }}
                                />
                                <ListItem
                                    titleStyle={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}
                                    containerStyle={this.state.theme === 'light'? modalStyle.lightModalContainer : modalStyle.darkModalContainer}
                                    title="Month"
                                    onPress={() => {
                                        this.setState({
                                            sortingParam: 'top',
                                            sortingParamTop: 'sort=top&t=month',
                                            showSortingOverlay: false,
                                            showSortingOverlayTop: false
                                        }, () => {
                                            this.onRefresh();
                                        });
                                    }}
                                />
                                <ListItem
                                    titleStyle={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}
                                    containerStyle={this.state.theme === 'light'? modalStyle.lightModalContainer : modalStyle.darkModalContainer}
                                    title="Year"
                                    onPress={() => {
                                        this.setState({
                                            sortingParam: 'top',
                                            sortingParamTop: 'sort=top&t=year',
                                            showSortingOverlay: false,
                                            showSortingOverlayTop: false
                                        }, () => {
                                            this.onRefresh();
                                        });
                                    }}
                                />
                                <ListItem
                                    titleStyle={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}
                                    containerStyle={this.state.theme === 'light'? modalStyle.lightModalContainer : modalStyle.darkModalContainer}
                                    title="All"
                                    onPress={() => {
                                        this.setState({
                                            sortingParam: 'top',
                                            sortingParamTop: 'sort=top&t=all',
                                            showSortingOverlay: false,
                                            showSortingOverlayTop: false
                                        }, () => {
                                            this.onRefresh();
                                        });
                                    }}
                                />
                            </View>
                        ) : (
                                <View style={{ overflow: 'hidden', borderRadius: 10 }}>
                                    <ListItem
                                        titleStyle={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}
                                        containerStyle={this.state.theme === 'light'? modalStyle.lightModalContainer : modalStyle.darkModalContainer}
                                        title="Best"
                                        onPress={() => {
                                            this.setState({
                                                sortingParam: '',
                                                showSortingOverlay: false
                                            }, () => {
                                                this.onRefresh();
                                            });
                                        }}
                                    />
                                    <ListItem
                                        titleStyle={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}
                                        containerStyle={this.state.theme === 'light'? modalStyle.lightModalContainer : modalStyle.darkModalContainer}
                                        title="Hot"
                                        onPress={() => {
                                            this.setState({
                                                sortingParam: 'hot',
                                                showSortingOverlay: false
                                            }, () => {
                                                this.onRefresh();
                                            });
                                        }}
                                    />
                                    <ListItem
                                        titleStyle={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}
                                        containerStyle={this.state.theme === 'light'? modalStyle.lightModalContainer : modalStyle.darkModalContainer}
                                        title="New"
                                        onPress={() => {
                                            this.setState({
                                                sortingParam: 'new',
                                                showSortingOverlay: false
                                            }, () => {
                                                this.onRefresh();
                                            });
                                        }}
                                    />
                                    <ListItem
                                        titleStyle={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}
                                        containerStyle={this.state.theme === 'light'? modalStyle.lightModalContainer : modalStyle.darkModalContainer}
                                        title="Top"
                                        onPress={() => {
                                            this.setState({
                                                showSortingOverlayTop: true
                                            });
                                        }}
                                    />
                                    <ListItem
                                        titleStyle={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}
                                        containerStyle={this.state.theme === 'light'? modalStyle.lightModalContainer : modalStyle.darkModalContainer}
                                        title="Controversial"
                                        onPress={() => {
                                            this.setState({
                                                sortingParam: 'controversial',
                                                showSortingOverlay: false
                                            }, () => {
                                                this.onRefresh();
                                            });
                                        }}
                                    />
                                    <ListItem
                                        titleStyle={this.state.theme === 'light'? listStyles.lightTitle : listStyles.darkTitle}
                                        containerStyle={this.state.theme === 'light'? modalStyle.lightModalContainer : modalStyle.darkModalContainer}
                                        title="Rising"
                                        onPress={() => {
                                            this.setState({
                                                sortingParam: 'rising',
                                                showSortingOverlay: false
                                            }, () => {
                                                this.onRefresh();
                                            });
                                        }}
                                    />
                                </View>
                            )}
                    </Modal>

                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} tintColor="white" />
                        }
                        ref={(c) => { this.scroll = c }}
                        scrollEventThrottle={50}
                        onScroll={({ nativeEvent }) => {
                            if (this.isCloseToBottom(nativeEvent) && !this.state.isLoadingMorePost) {
                                this.loadMorePost();
                            }
                        }}
                    >
                        <TouchableOpacity
                            style={{ margin: 15, flexDirection: 'row' }}
                            onPress={() => {
                                this.setState({ showSortingOverlay: true })
                            }}
                        >
                            <Text style={{ color: "grey", fontSize: 15 }}>
                                Sort By <Icon name='md-funnel' color='grey' size={15} />
                            </Text>
                        </TouchableOpacity>

                        {this.state.posts &&
                            this.state.posts.map((post, i) => (
                                <ListItem
                                    key={i}
                                    title={this.renderPostTitle(post.data.title, post)}
                                    subtitle={this.renderPostSubtitle(post.data.subreddit, post.data.score, post.data['num_comments'])}
                                    topDivider
                                    containerStyle={this.state.theme === "light" ? listStyles.lightListBackground : listStyles.darkListBackground}
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

                        {this.state.isLoadingMorePost ? (
                            <ListItem
                                containerStyle={this.state.theme === "light" ? listStyles.lightListBackground : listStyles.darkListBackground}
                                title={<ActivityIndicator stye={{ width: 50, height: 50, paddingTop: 10 }} size="large" color="white" />}
                            />
                        ) : (
                                <ListItem
                                    title=""
                                    containerStyle={this.state.theme === "light" ? listStyles.lightListBackground : listStyles.darkListBackground}
                                />
                            )
                        }
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
};

export default PostTileList;