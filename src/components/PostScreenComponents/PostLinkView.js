import React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const PostLinkView = (props) => {
    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
                <WebView source={{ uri: props.route.params.url}} />
        </SafeAreaView>
    );
};

export default PostLinkView;