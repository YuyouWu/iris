import React, { Component } from 'react';
import { View, Dimensions, SafeAreaView, Button } from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';

const window = Dimensions.get('window');

class PostVideo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            //TODO: add thumbnail for video
            <SafeAreaView>
                <View style={{ backgroundColor: 'black' }}>
                    <VideoPlayer
                        loop
                        autoplay
                        hideControlsOnStart
                        video={{ uri: this.props.navigation.getParam('url') }}
                        videoWidth={window.width}
                        customStyles={{
                            seekBarKnob: {
                                backgroundColor: "white"
                            },
                            seekBarProgress: {
                                backgroundColor: "white"
                            }
                        }}
                    />
                </View>
            </SafeAreaView>
        );
    }
};

export default PostVideo;