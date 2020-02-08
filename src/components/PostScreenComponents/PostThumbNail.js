import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";

import PostImage from './PostImage';

class PostThumbNail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showImage: false,
            imageURL: ''
        }
    }

    //show image 
    //TODO: rename to show image 
    navigateToImage = (linkURL) => {
        // this.props.navigation.navigate('PostImage', {
        //     linkURL: linkURL
        // });
        this.setState({ 
            imageURL: linkURL
        }, () => {
            this.setState({
                showImage: true
            });
        })
    }

    //show web view of link
    navigateToLink = (url) => {
        this.props.navigation.navigate('PostLinkView', {
            url: url
        });
    }

    //navigate to video 
    navigateToVideo = (url) => {
        this.props.navigation.navigate('PostVideo', {
            url: url
        });
    }

    //navigate to post for self post
    navigateToPost = () => {
        this.props.navigation.navigate('Post', {
            post: this.props.post
        });
    }

    renderThumbNail = () => {
        //Display video if preview video/gif exist
        //TODO: sometimes NSFW video doesnt provide a valid thumbnail URL
        if (this.props.preview && this.props.preview['reddit_video_preview']) {
            if (this.props.post.data['over_18']) {
                return (
                    <TouchableOpacity onPress={() => this.navigateToVideo(this.props.preview['reddit_video_preview']['fallback_url'])}>
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
                <TouchableOpacity onPress={() => this.navigateToVideo(this.props.preview['reddit_video_preview']['fallback_url'])}>
                    <Image
                        source={{ uri: this.props.thumbnailURL }}
                        style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden' }}
                    />
                </TouchableOpacity>
            )
        }
        //Display video if reddit video exist
        if (this.props.secureMedia && this.props.secureMedia['reddit_video']) {
            if (this.props.post.data['over_18']) {
                return (
                    <TouchableOpacity onPress={() => this.navigateToVideo(this.props.secureMedia['reddit_video']['fallback_url'])}>
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
                <TouchableOpacity onPress={() => this.navigateToVideo(this.props.secureMedia['reddit_video']['fallback_url'])}>
                    <Image
                        source={{ uri: this.props.thumbnailURL }}
                        style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden' }}
                    />
                </TouchableOpacity>
            )
        }

        if (this.props.thumbnailURL === "self" || this.props.post.data['is_self']) {
            //TODO: if this is a self post open Post component 
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
                    <TouchableOpacity onPress={() => this.navigateToImage(this.props.linkURL)}>
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
                    <TouchableOpacity onPress={() => this.navigateToImage(this.props.linkURL)}>
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
                {this.renderThumbNail()}
                <Modal
                    isVisible={this.state.showImage}
                    onBackdropPress={() => this.setState({ showImage: false })}
                    onBackButtonPress={() => this.setState({ showImage: false })}
                    onSwipeComplete={() => this.setState({ showImage: false })}
                    swipeDirection={["up", "down"]}
                    hideModalContentWhileAnimating={true}
                    useNativeDriver={true}
                    style={{margin:0}}
                >
                    <PostImage url={this.state.imageURL}/>
                </Modal>
            </View>
                );
            }
        };
        
export default PostThumbNail;