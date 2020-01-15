import React, { Component } from 'react';
import { Text, View, ScrollView, Image, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const CommentList = ({ comment, level }) => {
    level++;
    const marginLeft = level * 10;

    const renderAuthor = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'grey', fontSize: 15}}>{comment.data.author} </Text>
                <Text style={{ color: 'grey', fontSize: 15 }}>
                    <Icon name='arrowup' color='grey' />{comment.data.score}
                </Text>
            </View>
        )
    }

    const replies = comment.data.replies;

    return (
        <View>
            <ListItem
                title={renderAuthor()}
                subtitle={comment.data.body}
                bottomDivider
                containerStyle={{ backgroundColor: 'black', marginLeft: marginLeft }}
                subtitleStyle={{ color: 'white', fontSize: 15}}
            />
            {replies !== undefined &&
                replies !== "" &&
                replies.data.children.length > 0 &&
                replies.data.children.map((reply, i) => {
                    return (
                        <CommentList key={i} comment={reply} level={level} />
                    )
                })
            }
        </View>
    );
}

export default CommentList;