import React, {Component} from 'react';
import { Text, View, ScrollView, Image} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import axios from 'axios';

class Post extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <ScrollView>
                <Text>{this.props.navigation.getParam('postTitle')}</Text>
                <Text>{this.props.navigation.getParam('postSubreddit')}</Text>
            </ScrollView>
        );
    }
};

export default Post;