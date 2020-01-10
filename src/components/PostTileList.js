import React, {Component} from 'react';
import { Text, View, ScrollView, Image} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import axios from 'axios';

import PostThumbNail from './PostThumbNail';

class PostTileList extends Component{
    constructor(props){
        super(props);
        this.state = {
            postData: null
        }

        axios.get('https://old.reddit.com/r/all/.json').then((res) => {
            this.setState({
                postData: res.data.data.children
            });
        }).catch(e => {
            console.log(e);
        });        
    }

    PostSubtitle = (subreddit, score) => {
        return(
            <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'grey'}}>
                    {subreddit + " "}
                </Text>
                <Text style={{color: 'grey'}}>
                    {score}
                </Text>
            </View>
        );
    }
    
    render(){
        return (
            <ScrollView>
                {this.state.postData &&
                    this.state.postData.map((post, i) => (
                        <ListItem
                            key={i}
                            title={post.data.title}
                            subtitle={this.PostSubtitle(post.data.subreddit, post.data.score)}
                            bottomDivider
                            titleStyle={{ color: 'white'}}
                            containerStyle={{ backgroundColor: 'black' }}
                            leftElement={ <PostThumbNail imageURI={post.data.thumbnail} linkURL={post.data.url}/> }
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