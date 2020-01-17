import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Video from 'react-native-video';

const window = Dimensions.get('window');

class PostVideo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{backgroundColor:'black'}}>
                <Video 
                    source={{ uri: this.props.navigation.getParam('url') }} 
                    style={{ width: window.width, height: window.height }}
                    resizeMode="contain"
                    controls={true}
                />
            </View>
        );
    }
};

export default PostVideo;