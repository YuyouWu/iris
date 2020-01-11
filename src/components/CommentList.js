import React, { Component } from 'react';
import { Text, View, ScrollView, Image, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    renderTitle = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'grey', fontSize: 15, marginLeft: -15 }}>{this.props.comment.data.author} </Text>
                <Text style={{ color: 'grey', fontSize: 15 }}>
                    <Icon name='arrowup' color='grey'/>{this.props.comment.data.score}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <ListItem
                title={this.renderTitle()}
                subtitle={this.props.comment.data.body}
                bottomDivider
                containerStyle={{ backgroundColor: 'black' }}
                subtitleStyle={{ color: 'white', fontSize: 15, marginLeft: -15, marginRight: -15 }}
            />
        );
    }
};

export default CommentList;