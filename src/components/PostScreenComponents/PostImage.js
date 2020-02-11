import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const window = Dimensions.get('window');

class PostImage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ReactNativeZoomableView
                maxZoom={1.5}
                minZoom={1}
                zoomStep={0.5}
                initialZoom={1}
                bindToBorders={true}
            >
                <Image
                    source={{ uri: this.props.navigation.getParam('linkURL') }}
                    style={{ width: window.width, height: window.height }}
                    resizeMode='contain'
                />
            </ReactNativeZoomableView>
        );
    }
};

export default PostImage;