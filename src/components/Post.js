import React, {Component} from 'react';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

const window = Dimensions.get('window');

class Post extends Component{
    constructor(props){
        super(props);
        this.state={
            postData: props.navigation.getParam('post').data,
            imageHeight: 350
        }
    }

    handleOnPress = (linkURL) => {
        this.props.navigation.navigate('PostImage', {
            linkURL: linkURL
        });
    }

    renderImage = () => {
        if(!this.state.postData['is_video']){
            return(
                <TouchableOpacity
                    onPress={()=>{
                        this.handleOnPress(this.state.postData.url);
                    }}
                >
                    <Image
                        source={{uri: this.state.postData.url}}
                        style={{width: window.width, height: this.state.imageHeight}} 
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            )
        }
    }
    
    render(){
        return (
            <ScrollView
                contentContainerStyle = {{backgroundColor: 'black'}}
            >
                {this.renderImage()}
                <Text style={{fontSize:18, color: 'white'}}>{this.state.postData.title}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'grey'}}>{`in r/${this.state.postData.subreddit} `}</Text>
                    <Text style={{color: 'grey'}}>{`by ${this.state.postData.author}`}</Text>
                </View>
            </ScrollView>
        );
    }
};

export default Post;