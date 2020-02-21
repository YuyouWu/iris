import React, { Component } from 'react';
import { Image, TouchableOpacity, View, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListItem } from 'react-native-elements';
import Modal from "react-native-modal";
import GallerySwiper from "react-native-gallery-swiper";

import PostVideo from "./PostVideo";

import listStyles from '../../styles/listStyle';

class PostThumbNail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showImageModal: false,
            showVideoModal: false,
            showDownloadModal: false,
            imageURL: '',
            videoURL: '',
            animationOut: 'fadeOut'
        }
    }

    //Show Image Modal
    displayImageModal = (url) => {
        this.setState({
            showImageModal: true,
            imageURL: url
        });
    }

    //Show Video Modal
    displayVideoModal = (url) => {
        this.setState({
            showVideoModal: true,
            videoURL: url
        });

    }

    //Show PostLinkView and display a web page
    navigateToLink = (url) => {
        this.props.navigation.navigate('PostLinkView', {
            url: url
        });
    }

    //navigate to post for self post
    navigateToPost = () => {
        this.props.navigation.navigate('Post', {
            post: this.props.post
        });
    }

    //Open url in external app 
    //Ex. youtube
    openLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err));
    }

    renderThumbNail = () => {
        //Youtube Video
        if (this.props.post.data.media && this.props.post.data.media.type && this.props.post.data.media.type.indexOf("youtube") > -1) {
            return (
                <TouchableOpacity onPress={() => this.openLink(this.props.linkURL)}>
                    <Image
                        source={{ uri: this.props.thumbnailURL }}
                        style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden' }}
                    />
                </TouchableOpacity>
            )
        }

        //Display video if preview video/gif exist
        //TODO: sometimes NSFW video doesnt provide a valid thumbnail URL
        if (this.props.preview && this.props.preview['reddit_video_preview']) {
            if (this.props.post.data['over_18']) {
                return (
                    <TouchableOpacity onPress={() => this.displayVideoModal(this.props.preview['reddit_video_preview']['hls_url'])}>
                        <Icon
                            name="alert-circle-outline"
                            color="white"
                            size={60}
                            style={{ width: 100, height: 100, textAlign: 'center', textAlignVertical: 'center' }}
                        />
                    </TouchableOpacity>
                )
            }
            return (
                <TouchableOpacity onPress={() => this.displayVideoModal(this.props.preview['reddit_video_preview']['hls_url'])}>
                    <Image
                        source={{ uri: this.props.thumbnailURL }}
                        style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden' }}
                    />
                </TouchableOpacity>
            )
        }

        //Display video for Reddit Video
        if (this.props.secureMedia && this.props.secureMedia['reddit_video']) {
            if (this.props.post.data['over_18']) {
                return (
                    <TouchableOpacity onPress={() => this.displayVideoModal(this.props.secureMedia['reddit_video']['hls_url'])}>
                        <Icon
                            name="alert-circle-outline"
                            color="white"
                            size={60}
                            style={{ width: 100, height: 100, textAlign: 'center', textAlignVertical: 'center' }}
                        />
                    </TouchableOpacity>
                )
            }
            return (
                <TouchableOpacity onPress={() => this.displayVideoModal(this.props.secureMedia['reddit_video']['hls_url'])}>
                    <Image
                        source={{ uri: this.props.thumbnailURL }}
                        style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden' }}
                    />
                </TouchableOpacity>
            )
        }

        //Open the post if it's a self post
        if (this.props.thumbnailURL === "self" || this.props.post.data['is_self']) {
            return (
                <TouchableOpacity onPress={() => this.navigateToPost()}>
                    <Icon
                        name="text-subject"
                        color="white"
                        size={60}
                        style={{ width: 100, height: 100, textAlign: 'center', textAlignVertical: 'center' }}
                    />
                </TouchableOpacity>
            );
        }

        //TODO: nsfw thumbnails are hidden
        if (this.props.thumbnailURL.includes("http")) {
            if (this.props.post.data['over_18'] && this.props.postHint === 'image') {
                return (
                    <TouchableOpacity onPress={() => this.displayImageModal(this.props.linkURL)}>
                        <Icon
                            name="alert-circle-outline"
                            color="white"
                            size={60}
                            style={{ width: 100, height: 100, textAlign: 'center', textAlignVertical: 'center' }}
                        />
                    </TouchableOpacity>
                )
            }
            if (this.props.postHint === 'link') {
                //Navigate to a link
                return (
                    <TouchableOpacity onPress={() => this.navigateToLink(this.props.linkURL)}>
                        <Image
                            source={{ uri: this.props.thumbnailURL }}
                            style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden' }}
                        />
                    </TouchableOpacity>
                )
            } else {
                return (
                    <TouchableOpacity onPress={() => this.displayImageModal(this.props.linkURL)}>
                        <Image
                            source={{ uri: this.props.thumbnailURL }}
                            style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden' }}
                        />
                    </TouchableOpacity>
                )
            }
        }

        //Return link
        return (
            <TouchableOpacity onPress={() => this.navigateToLink(this.props.linkURL)}>
                <Icon
                    name="link"
                    color="white"
                    size={60}
                    style={{ width: 100, height: 100, textAlign: 'center', textAlignVertical: 'center' }}
                />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View>
                <Modal
                    isVisible={this.state.showImageModal}
                    style={{ margin: 0 }}
                    animationIn="fadeInUp"
                    animationOut={this.state.animationOut}
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropOpacity={1}
                    onBackButtonPress={() => {
                        this.setState({
                            showImageModal: false
                        });
                    }}
                >
                    <View
                        style={{ flex: 1 }}
                    >
                        <Modal
                            isVisible={this.state.showDownloadModal}
                            animationIn="fadeIn"
                            animationOut={this.state.animationOut}
                            animationInTiming={200}
                            animationOutTiming={200}
                            backdropOpacity={0.3}
                            onBackdropPress={() => {
                                this.setState({
                                    showDownloadModal: false
                                });
                            }}
                            onBackButtonPress={() => {
                                this.setState({
                                    showDownloadModal: false
                                });
                            }}
                        >
                            <View style={{ overflow: 'hidden', borderRadius: 10 }}>
                                <ListItem
                                    titleStyle={listStyles.title}
                                    containerStyle={{ backgroundColor: "#1a1a1a" }}
                                    title="Save Image"
                                    onPress={() => {
                                        console.log("download");
                                    }}
                                />
                            </View>
                        </Modal>

                        <GallerySwiper
                            images={[
                                {
                                    url: this.state.imageURL
                                }
                            ]}
                            onSwipeUpReleased={(e) => {
                                this.setState({
                                    showImageModal: false,
                                    animationOut: "slideOutUp"
                                });
                            }}
                            onSwipeDownReleased={(e) => {
                                this.setState({
                                    showImageModal: false,
                                    animationOut: "slideOutDown"
                                });
                            }}
                            onLongPress={(e) => {
                                this.setState({
                                    showDownloadModal: true
                                });
                            }}
                        />
                    </View>
                </Modal>
                <Modal
                    isVisible={this.state.showVideoModal}
                    style={{ margin: 0 }}
                    animationIn="fadeInUp"
                    animationOut="fadeOut"
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropOpacity={1}
                    swipeDirection={["up", "down"]}
                    onSwipeComplete={() => {
                        this.setState({
                            showVideoModal: false
                        });
                    }}
                    onBackButtonPress={() => {
                        this.setState({
                            showVideoModal: false
                        });
                    }}
                >
                    <PostVideo videoURL={this.state.videoURL} />
                </Modal>
                {this.renderThumbNail()}
            </View>
        );
    }
};

export default PostThumbNail;