import React, { Component } from 'react';
import { View, Dimensions, SafeAreaView, Button, Text } from 'react-native';
import VideoPlayer from 'react-native-video-controls';

const window = Dimensions.get('window');

class PostVideo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            //TODO: add thumbnail for video
            <SafeAreaView>
                <View
                    style={{
                        backgroundColor: 'black',
                        width: window.width,
                        height: window.height
                    }}
                >
                    <VideoPlayer
                        source={{
                            uri: this.props.videoURL
                        }}
                        resizeMode="contain"
                        disableBack={true}
                        style={{
                            width: window.width,
                            height: window.height
                        }}
                    />
                </View>
            </SafeAreaView>
        );
    }
};

export default PostVideo;