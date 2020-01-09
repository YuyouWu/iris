import React, { Component } from 'react';
import { Image, Linking, TouchableOpacity } from 'react-native';

class PostThumbNail extends Component {
    constructor(props) {
        super(props);
    }

    handleOnClick = (linkURL) => {
        Linking.openURL(linkURL).catch((err) => {
            console.log(err);
        });
    }

    renderThumbNail = () => {
        if (this.props.imageURI === "self" || this.props.imageURI === "default" || this.props.imageURI === "image") {
            //TODO: if this is a self post open Post component 
            return (
                <TouchableOpacity onPress={() => this.handleOnClick(this.props.linkURL)}>
                    <Image
                        source={require('../images/text.png')}
                        style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden' }}
                    />
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity onPress={() => this.handleOnClick(this.props.linkURL)}>
                <Image
                    source={{ uri: this.props.imageURI }}
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