import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const window = Dimensions.get('window');

class PostLinkView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {{width:window.width, height:window.height}}>
                <WebView source={{ uri: this.props.navigation.getParam('url') }}/>
            </View>
        );
    }
};

export default PostLinkView;