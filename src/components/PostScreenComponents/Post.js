import React, { Component } from 'react';
import { ScrollView, SafeAreaView, View, Image, Dimensions, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';
import { Divider, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import GallerySwiper from "react-native-gallery-swiper";
import axios from 'axios';
import CommentList from './CommentList';

import listStyles from '../../styles/listStyle';

const window = Dimensions.get('window');

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: props.navigation.getParam('post').data,
            postContentData: "",
            postCommentData: [],
            selftext: "",
            imageHeight: 350,
            fetchingData: true,
            showImage: false,
            showImageModal: false,
            animationOut: "fadeOut",
            imageURL: props.navigation.getParam('post').data.url,
            beginningCommentIdx: 0,
            endCommentIdx: 10,
            endOfComments: false,
            showSortModal: false,
            sortingParam: '?sort=confidence'
        }

        this.getPostAndComments();

        Image.getSize(this.state.postData.url, () => {
            this.setState({
                showImage: true
            });
        }, () => {
            this.setState({
                showImage: false
            });
        });
    }

    getPostAndComments = () => {
        axios.get(`https://www.reddit.com${this.state.postData.permalink}.json${this.state.sortingParam}`).then((res) => {
            this.setState({
                postContentData: res.data[0].data.children[0].data,
                selftext: res.data[0].data.children[0].data.selftext,
                allComments: res.data[1].data.children,
                //TODO optimize comments loading 
                //DO not fetch all the comments then slice 
                //Use same approach as loading posts  
                postCommentData: res.data[1].data.children.slice(this.state.beginningCommentIdx, this.state.endCommentIdx)
            });
        }).then(() => {
            this.setState({
                fetchingData: false
            });
        }).catch(e => {
            console.log(e);
        });
    }

    onRefresh = () => {
        this.setState({
            fetchingData: true
        }, () => {
            this.getPostAndComments();
        });
    }

    loadMoreComments = () => {
        const commentIncrement = 10;
        this.setState({
            beginningCommentIdx: this.state.beginningCommentIdx + commentIncrement,
            endCommentIdx: this.state.endCommentIdx + commentIncrement
        }, () => {
            let currentComments = this.state.postCommentData;
            let newComments;
            if (this.state.endCommentIdx > this.state.allComments.length) {
                newComments = this.state.allComments.slice(this.state.beginningCommentIdx, this.state.allComments.length - 1);
                this.setState({
                    endOfComments: true
                })
            } else {
                newComments = this.state.allComments.slice(this.state.beginningCommentIdx, this.state.endCommentIdx);
            }
            //TODO: handle cases when we've reached the end of comments
            currentComments.push.apply(currentComments, newComments);
            this.setState({
                postCommentData: currentComments,
            }, () => {
                this.setState({
                    fetchingData: false
                });
            });
        })
    }

    isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 200;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    renderComments = (comments) => {
        return (
            comments.length > 0 &&
            comments.map((comment, i) => {
                return (
                    <CommentList
                        key={i}
                        level={0}
                        comment={comment}
                    />
                )
            })
        )
    }

    displayImageModal = () => {
        this.setState({
            showImageModal: true
        });
    }

    displaySortModal = () => {
        this.setState({
            showSortModal: true
        });
    }

    renderImage = () => {
        if (this.state.postData['post_hint'] === "image") {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.displayImageModal();
                    }}
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={{ uri: this.state.postData.url }}
                        style={{ width: window.width, height: this.state.imageHeight }}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            )
        }
    }

    renderLink = () => {
        //Check if url is a link or image, check if it's a reddit link
        if (!this.state.postData['is_self'] && this.state.postData['post_hint'] === "link") {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('PostLinkView', {
                            url: this.state.postData.url
                        });
                    }}
                    style={{
                        paddingTop: 10
                    }}
                >
                    <ListItem
                        key={0}
                        title={(this.state.postData.url)}
                        leftElement={
                            <Icon
                                name="md-link"
                                color="white"
                                size={20}
                            />
                        }
                        titleStyle={{ color: 'white' }}
                        titleProps={{ numberOfLines: 1 }}
                        containerStyle={{ backgroundColor: '#343434', borderColor: 'white', borderRadius: 10 }}
                    />
                </TouchableOpacity>
            )
        }
    }

    render() {
        const iconSize = 30;
        return (
            <SafeAreaView style={{ backgroundColor: "black" }}>
                <Modal
                    isVisible={this.state.showImageModal}
                    style={{ margin: 0 }}
                    animationIn="fadeIn"
                    animationOut={this.state.animationOut}
                    animationInTiming={200}
                    animationOutTiming={200}
                    onBackButtonPress={() => {
                        this.setState({
                            showImageModal: false
                        });
                    }}
                >
                    <View
                        style={{ flex: 1 }}
                    >
                        <GallerySwiper
                            images={[
                                {
                                    url: this.state.imageURL
                                }
                            ]}
                            onSwipeUpReleased={() => {
                                this.setState({
                                    showImageModal: false,
                                    animationOut: "slideOutUp"
                                });
                            }}
                            onSwipeDownReleased={() => {
                                this.setState({
                                    showImageModal: false,
                                    animationOut: "slideOutDown"
                                });
                            }}
                        />
                    </View>
                </Modal>

                <Modal
                    isVisible={this.state.showSortModal}
                    animationIn="fadeIn"
                    animationOut={this.state.animationOut}
                    animationInTiming={200}
                    animationOutTiming={200}
                    onBackdropPress={() => {
                        this.setState({
                            showSortModal: false
                        });
                    }}
                    onBackButtonPress={() => {
                        this.setState({
                            showSortModal: false
                        });
                    }}
                >
                    <View style={{ overflow: 'hidden', borderRadius: 10 }}>
                        <ListItem
                            titleStyle={listStyles.title}
                            containerStyle={{ backgroundColor: "#1a1a1a" }}
                            title="Best"
                            onPress={() => {
                                this.setState({
                                    sortingParam: '?sort=confidence',
                                    showSortModal: false
                                }, () => {
                                    this.onRefresh();
                                });
                            }}
                        />
                        <ListItem
                            titleStyle={listStyles.title}
                            containerStyle={{ backgroundColor: "#1a1a1a" }}
                            title="Top"
                            onPress={() => {
                                this.setState({
                                    sortingParam: '?sort=top',
                                    showSortModal: false
                                }, () => {
                                    this.onRefresh();
                                });
                            }}
                        />
                        <ListItem
                            titleStyle={listStyles.title}
                            containerStyle={{ backgroundColor: "#1a1a1a" }}
                            title="New"
                            onPress={() => {
                                this.setState({
                                    sortingParam: '?sort=new',
                                    showSortModal: false
                                }, () => {
                                    this.onRefresh();
                                });
                            }}
                        />
                        <ListItem
                            titleStyle={listStyles.title}
                            containerStyle={{ backgroundColor: "#1a1a1a" }}
                            title="Old"
                            onPress={() => {
                                this.setState({
                                    sortingParam: '?sort=old',
                                    showSortModal: false
                                }, () => {
                                    this.onRefresh();
                                });
                            }}
                        />
                        <ListItem
                            titleStyle={listStyles.title}
                            containerStyle={{ backgroundColor: "#1a1a1a" }}
                            title="Controversial"
                            onPress={() => {
                                this.setState({
                                    sortingParam: '?sort=controversial',
                                    showSortModal: false
                                }, () => {
                                    this.onRefresh();
                                });
                            }}
                        />
                        <ListItem
                            titleStyle={listStyles.title}
                            containerStyle={{ backgroundColor: "#1a1a1a" }}
                            title="Q&A"
                            onPress={() => {
                                this.setState({
                                    sortingParam: '?sort=qa',
                                    showSortModal: false
                                }, () => {
                                    this.onRefresh();
                                });
                            }}
                        />
                    </View>
                </Modal>

                <ScrollView
                    style={{ backgroundColor: 'black', paddingLeft: 10, paddingRight: 10 }}
                    scrollEventThrottle={50}
                    onScroll={({ nativeEvent }) => {
                        if (this.isCloseToBottom(nativeEvent) && this.state.fetchingData === false && !this.state.endOfComments) {
                            this.setState({
                                fetchingData: true
                            });
                            this.loadMoreComments();
                        }
                    }}
                >
                    {this.renderImage()}
                    {this.renderLink()}
                    <Text style={{ fontSize: 20, color: 'white', paddingTop: 5 }}>{this.state.postData.title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'grey' }}>{`in r/${this.state.postData.subreddit} `}</Text>
                        <Text style={{ color: 'grey' }}>{`by ${this.state.postData.author}`}</Text>
                    </View>
                    <Text style={{ color: 'grey' }}>
                        <Icon name='md-arrow-up' color='grey' />{`${this.state.postData.score}`}
                    </Text>
                    {this.state.selftext !== "" && (
                        <Text style={{ color: 'white' }}>
                            {this.state.selftext}
                        </Text>
                    )}
                    <Divider style={{ marginTop: 10 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>
                        <Icon color="white" size={iconSize} name="md-arrow-up" />
                        <Icon color="white" size={iconSize} name="md-arrow-down" />
                        <Icon color="white" size={iconSize} name="ios-download" />
                        <Icon color="white" size={iconSize} name="md-share" />
                    </View>
                    <Divider style={{ marginTop: 10 }} />
                    {/* Render Comments*/}
                    <View>
                        {/* Sort Button */}
                        {this.state.postCommentData !== [] &&
                            <TouchableOpacity
                                style={{ margin: 15, flexDirection: 'row' }}
                                onPress={() => {
                                    this.setState({ showSortModal: true })
                                }}
                            >
                                <Text style={{ color: "grey", fontSize: 15 }}>
                                    Sort By <Icon name='md-funnel' color='grey' size={15} />
                                </Text>
                            </TouchableOpacity>
                        }
                        {!this.state.fetchingData && this.renderComments(this.state.postCommentData)}
                        {!this.state.endOfComments &&
                            <View style={{ marginTop: 10 }}>
                                <ActivityIndicator stye={{ width: 50, height: 50, paddingTop: 10 }} size="large" color="white" />
                            </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
};

export default Post;