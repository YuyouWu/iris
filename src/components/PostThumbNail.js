import React, { Component } from 'react';
import { Image, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class PostThumbNail extends Component {
    constructor(props) {
        super(props);
    }

    //show image 
    navigateToImage = (linkURL) => {
        // TODO: check if it's link or image based on post_hint
        this.props.navigation.navigate('PostImage', {
            linkURL: linkURL
        });
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
        if (this.props.preview && this.props.preview['reddit_video_preview']) {
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
            return (
                <TouchableOpacity onPress={() => this.navigateToVideo(this.props.secureMedia['reddit_video']['fallback_url'])}>
                    <Image
                        source={{ uri: this.props.thumbnailURL }}
                        style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden' }}
                    />
                </TouchableOpacity>
            )
        }

        if (this.props.thumbnailURL === "self") {
            //TODO: if this is a self post open Post component 
            return (
                <TouchableOpacity onPress={() => this.navigateToPost()}>
                    <Icon
                        name="filetext1"
                        color="white"
                        size={60}
                        style={{ width: 100, height: 100, textAlign: 'center', textAlignVertical: 'center' }}
                    />
                </TouchableOpacity>
            );
        }
        if (this.props.postHint === "link") {
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
        return (
            <TouchableOpacity onPress={() => this.navigateToImage(this.props.linkURL)}>
                <Image
                    source={{ uri: this.props.thumbnailURL }}
                    style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden' }}
                />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            this.renderThumbNail()
        );
    }
};

export default PostThumbNail;