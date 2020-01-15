import React, { Component } from 'react';
import { Text, View, ScrollView, Image, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const CommentList = ({ comment, level }) => {
    level++;
    const containerMarginLeft = level * 10;
    const commentMarginLeft = -10;

    let commentColor = 'grey'
    switch (level) {
        case 0:
            commentColor = 'blue';
            break;
        case 1:
            commentColor = 'purple';
            break;
        case 2:
            commentColor = 'red';
            break;
        case 3:
            commentColor = 'orange';
            break;
        case 4:
            commentColor = 'yellow';
            break;
        default:
            commentColor = 'green';
    }


    const renderAuthor = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'grey', fontSize: 15, marginLeft: commentMarginLeft }}>{comment.data.author} </Text>
                <Text style={{ color: 'grey', fontSize: 15 }}>
                    <Icon name='arrowup' color='grey' />{comment.data.score}
                </Text>
            </View>
        )
    }

    const replies = comment.data.replies;

    return (
        <View>
            {comment.data.author &&
                <View
                    style={{
                        marginLeft: containerMarginLeft,
                        borderLeftWidth: 2,
                        borderLeftColor: commentColor
                    }}
                >
                    <ListItem
                        title={renderAuthor()}
                        subtitle={comment.data.body}
                        topDivider
                        containerStyle={{ backgroundColor: 'black' }}
                        subtitleStyle={{ color: 'white', fontSize: 15, marginLeft: commentMarginLeft }}
                    />
                </View>
            }
            {
                level < 3 &&
                replies !== undefined &&
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