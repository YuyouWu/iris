import React, { Component } from 'react';
import { Image, Linking, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class PostThumbNail extends Component {
    constructor(props) {
        super(props);
    }

    handleOnClick = (linkURL) => {
        // Linking.openURL(linkURL).catch((err) => {
        //     console.log(err);
        // });

        // TODO: check if it's link or iamge
        this.props.navigation.navigate('PostImage', {
            linkURL: linkURL
        });
    }

    renderThumbNail = () => {
        console.log(this.props.thumbnailURL);
        if (this.props.thumbnailURL === "self" || this.props.thumbnailURL === "image") {
            //TODO: if this is a self post open Post component 
            return (
                <TouchableOpacity onPress={() => this.handleOnClick(this.props.linkURL)}>
                    <Icon
                        name="filetext1"
                        color="white"
                        size={60}
                        style={{ width: 100, height: 100, textAlign: 'center', textAlignVertical: 'center' }}
                    />
                </TouchableOpacity>
            );
        }
        if (this.props.thumbnailURL === "default") {
            return (
                <TouchableOpacity onPress={() => this.handleOnClick(this.props.linkURL)}>
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
            <TouchableOpacity onPress={() => this.handleOnClick(this.props.linkURL)}>
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