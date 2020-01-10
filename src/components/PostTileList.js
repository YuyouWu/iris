import React, {Component} from 'react';
import { Text, View, ScrollView, Image, RefreshControl} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

import PostThumbNail from './PostThumbNail';

class PostTileList extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: null,
            refreshing: false
        }
        this.getPost();
    }

    getPost = () => {
        axios.get('https://old.reddit.com/r/all/.json').then((res) => {
            this.setState({
                posts: res.data.data.children
            });
        }).then(() => {
            this.setState({
                refreshing: false
            });
        });
    }

    onRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.getPost();
        });
    }


    PostSubtitle = (subreddit, score) => {
        return(
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'grey'}}>
                    {subreddit + " "}
                </Text>
                <Text style={{color: 'grey'}}>
                    <Icon name='arrowup' color='grey'/> {score}
                </Text>
            </View>
        );
    }
    
    render(){
        return (
            <ScrollView
                refreshControl={
                <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
              }
            >
                {this.state.posts &&
                    this.state.posts.map((post, i) => (
                        <ListItem
                            key={i}
                            title={post.data.title}
                            subtitle={this.PostSubtitle(post.data.subreddit, post.data.score)}
                            bottomDivider
                            titleStyle={{ color: 'white'}}
                            containerStyle={{ backgroundColor: 'black' }}
                            leftElement={ <PostThumbNail imageURI={post.data.thumbnail} linkURL={post.data.url} navigation={this.props.navigation}/> }
                            onPress={ () => {
                                this.props.navigation.navigate('Post', {
                                    post: post
                                });
                            }}
                        />
                    ))
                }
            </ScrollView>
        );
    }
};

export default PostTileList;