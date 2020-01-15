import React, { Component } from 'react';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity, Linking } from 'react-native';
// import { WebView } from 'react-native-webview';
import { Divider, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import CommentList from './CommentList';

const window = Dimensions.get('window');

const RenderComments = ({ comments }) => {
    return (
        comments.length > 0 &&
        comments.map((comment, i) => {
            return (
                <CommentList
                    key={i}
                    level={-1}
                    comment={comment}
                />
            )
        })
    )
}

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: props.navigation.getParam('post').data,
            postContentData: "",
            postCommentData: [],
            selftext: "",
            imageHeight: 350,
            refreshing: false,
            showImage: false
        }

        axios.get(`https://www.reddit.com${this.state.postData.permalink}.json`).then((res) => {
            this.setState({
                postContentData: res.data[0].data.children[0].data,
                selftext: res.data[0].data.children[0].data.selftext,
                postCommentData: res.data[1].data.children.slice(0, 9) //grabbing first 10 comments for now
            });
        }).then(() => {
            this.setState({
                refreshing: false
            });
        }).catch(e => {
            console.log(e);
        });


        Image.getSize(this.state.postData.url, () => {
            this.setState({
                showImage: true
            });
        }, () => {
            this.setState({
                showImage: false
            });
        });
    }

    handleOnPress = (linkURL) => {
        this.props.navigation.navigate('PostImage', {
            linkURL: linkURL
        });
    }

    renderImage = () => {
        if (this.state.postData['post_hint'] === "image") {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.handleOnPress(this.state.postData.url);
                    }}
                    style={{
                        alignItems: 'center'
                    }}
                >
                    <Image
                        source={{ uri: this.state.postData.url }}
                        style={{ width: window.width, height: this.state.imageHeight }}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            )
        }
    }

    renderLink = () => {
        //Check if url is a link or image, check if it's a reddit link
        if (!this.state.postData['is_self'] && this.state.postData['post_hint'] === "link") {
            return (
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL(this.state.postData.url).catch((err) => {
                            console.log(err);
                        });
                    }}
                >
                    <ListItem
                        key={0}
                        title={(this.state.postData.url)}
                        leftElement={
                            <Icon
                                name="link"
                                color="white"
                                size={20}
                            />
                        }
                        titleStyle={{ color: 'white' }}
                        titleProps={{ numberOfLines: 1 }}
                        containerStyle={{ backgroundColor: '#343434', borderColor: 'white', borderRadius: 10 }}
                    />
                </TouchableOpacity>
            )
        }
    }

    render() {
        const iconSize = 30;
        return (
            <ScrollView
                style={{ backgroundColor: 'black', paddingLeft:5, paddingRight:5}}
            >
                {this.renderImage()}
                {this.renderLink()}
                <Text style={{ fontSize: 20, color: 'white', paddingTop: 5 }}>{this.state.postData.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'grey' }}>{`in r/${this.state.postData.subreddit} `}</Text>
                    <Text style={{ color: 'grey' }}>{`by ${this.state.postData.author}`}</Text>
                </View>
                <Text style={{ color: 'grey' }}>
                    <Icon name='arrowup' color='grey' />{`${this.state.postData.score}`}
                </Text>
                {this.state.selftext !== "" &&
                    <Text style={{ color: 'white' }}>
                        {this.state.selftext}
                    </Text>
                }
                <Divider style={{marginTop:10}}/>
                {/* {renderComments(this.state.postCommentData, 0)} */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop:10, marginLeft:20, marginRight:20 }}>
                    <Icon color="white" size={iconSize} name="upcircleo"/>
                    <Icon color="white" size={iconSize} name="circledowno"/>
                    <Icon color="white" size={iconSize} name="save"/>
                    <Icon color="white" size={iconSize} name="upload"/>
                </View>
                <View style={{marginTop:10}}>
                    <RenderComments comments={this.state.postCommentData} />
                </View>
            </ScrollView>
        );
    }
};

export default Post;