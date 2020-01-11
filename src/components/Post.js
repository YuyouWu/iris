import React, {Component} from 'react';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity} from 'react-native';
import { WebView } from 'react-native-webview';
import { Icon } from 'react-native-elements';
import axios from 'axios';

const window = Dimensions.get('window');

class Post extends Component{
    constructor(props){
        super(props);
        this.state={
            postData: props.navigation.getParam('post').data,
            postContentData: "",
            postCommentData: "",
            imageHeight: 350,
            refreshing: false,
            showImage: false
        }
        axios.get(`https://www.reddit.com${this.state.postData.permalink}.json`).then((res) => {
            this.setState({
                postContentData: res.data[0].data.children[0].data,
                postCommentData: res.data[1].data.children
            });
        }).then(() => {
            this.setState({
                refreshing: false
            });
        }).catch(e => {
            console.log(e);
        });
    }

    handleOnPress = (linkURL) => {
        this.props.navigation.navigate('PostImage', {
            linkURL: linkURL
        });
    }

    renderImage = () => {
        Image.getSize(this.state.postData.url, ()=>{
            this.setState({
                showImage: true
            });
        }, () => {
            this.setState({
                showImage: false
            });
        })
        if(this.state.showImage){
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
                style = {{backgroundColor: 'black', padding:10}}
            >
                {this.renderImage()}
                <Text style={{fontSize:18, color: 'white', paddingTop:5}}>{this.state.postData.title}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'grey'}}>{`in r/${this.state.postData.subreddit} `}</Text>
                    <Text style={{color: 'grey'}}>{`by ${this.state.postData.author}`}</Text>
                </View>
                {this.state.postContentData.selftext !== "" &&
                    <Text style={{color: 'white'}}>{this.state.postContentData.selftext}</Text>                
                }
            </ScrollView>
        );
    }
};

export default Post;