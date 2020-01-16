import React, { Component } from 'react';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';
import { Divider, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import CommentList from './CommentList';

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
            beginningCommentIdx: 0,
            endCommentIdx: 15
        }

        axios.get(`https://www.reddit.com${this.state.postData.permalink}.json`).then((res) => {
            this.setState({
                postContentData: res.data[0].data.children[0].data,
                selftext: res.data[0].data.children[0].data.selftext,
                allComments: res.data[1].data.children,
                postCommentData: res.data[1].data.children.slice(this.state.beginningCommentIdx, this.state.endCommentIdx)
            });
        }).then(() => {
            this.setState({
                fetchingData: false
            });
        }).catch(e => {
            console.log(e);
        });


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

    loadMoreComments = () => {
        console.log("loading comments")
        this.setState({
            beginningCommentIdx: this.state.beginningCommentIdx + 15,
            endCommentIdx: this.state.endCommentIdx + 15
        }, () => {
            let currentComments = this.state.postCommentData;
            let newComments;
            if (this.state.endCommentIdx > this.state.allComments.length) {
                newComments = this.state.allComments.slice(this.state.beginningCommentIdx, this.state.allComments.length);
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
                    <View>
                        <CommentList
                            key={i}
                            level={0}
                            comment={comment}
                        />
                    </View>
                )
            })
        )
    }


    handleOnPress = (linkURL) => {
        this.props.navigation.navigate('PostImage', {
            linkURL: linkURL
        });
    }

    renderImage = () => {
        if (this.state.postData['post_hint'] === "image") {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.handleOnPress(this.state.postData.url);
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
                        Linking.openURL(this.state.postData.url).catch((err) => {
                            console.log(err);
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
                                name="link"
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
            <ScrollView
                style={{ backgroundColor: 'black', paddingLeft: 10, paddingRight: 10 }}
                onScroll={({ nativeEvent }) => {
                    if (this.isCloseToBottom(nativeEvent) && this.state.fetchingData === false) {
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
                    <Icon name='arrowup' color='grey' />{`${this.state.postData.score}`}
                </Text>
                {this.state.selftext !== "" && (
                    <Text style={{ color: 'white' }}>
                        {this.state.selftext}
                    </Text>
                )}
                <Divider style={{ marginTop: 10 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginLeft: 20, marginRight: 20 }}>
                    <Icon color="white" size={iconSize} name="upcircleo" />
                    <Icon color="white" size={iconSize} name="circledowno" />
                    <Icon color="white" size={iconSize} name="save" />
                    <Icon color="white" size={iconSize} name="upload" />
                </View>
                <View style={{ marginTop: 10 }}>
                    {this.renderComments(this.state.postCommentData)}
                    <ActivityIndicator stye={{ width: 50, height: 50, paddingTop: 10 }} size="large" color="white" />
                </View>
            </ScrollView>
        );
    }
};

export default Post;