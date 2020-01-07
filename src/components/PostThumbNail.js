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

    render() {
        return (
            this.props.imageURI.indexOf('thumb') > 0 ? (
                <TouchableOpacity onPress={() => this.handleOnClick(this.props.linkURL)}>
                    <Image
                        source={{ uri: this.props.imageURI }}
                        style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden' }}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => this.handleOnClick(this.props.linkURL)}>
                    <Image
                        source={require('../images/text.png')}
                        style={{ width: 100, height: 100, borderRadius: 10, overflow: 'hidden' }}
                    />
                </TouchableOpacity>
            )
        );
    }
};

export default PostThumbNail;