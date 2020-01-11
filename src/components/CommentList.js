import React, {Component} from 'react';
import { Text, View, ScrollView, Image, RefreshControl} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

class CommentList extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <ListItem
                title={this.props.comment.data.author}
                subtitle={this.props.comment.data.body}
                bottomDivider
                containerStyle={{ backgroundColor: 'black' }}
                titleStyle={{ color: 'grey', fontSize: 15, marginLeft:-15, marginRight:-15}}
                subtitleStyle={{ color: 'white', fontSize: 15, marginLeft:-15, marginRight:-15 }}
            />
        );
    }
};

export default CommentList;