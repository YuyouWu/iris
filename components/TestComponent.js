import React, {Component} from 'react';
import { Text, View, ScrollView, Image} from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

class TestComponent extends Component{
    constructor(){
        super();
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
    
    render(){
        return (
            <ScrollView>
                {this.state.postData &&
                    this.state.postData.map((post, i) => (
                        <ListItem
                            key={i}
                            title={post.data.title}
                            subtitle={post.data.subreddit + " " + post.data.name}
                            leftAvatar={{size:"large", rounded: false, source: {uri: post.data.thumbnail}}}
                            // rightSubtitle={post.data.name}
                            bottomDivider
                            titleStyle={{ color: 'white'}}
                            subtitleStyle={{ color: 'grey'}}
                            containerStyle={{ backgroundColor: 'black' }}
                        />
                    ))
                }
            </ScrollView>
        );
    }
};

export default TestComponent;