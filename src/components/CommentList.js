import React, { Component } from 'react';
import { Text, View, ScrollView, Image, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showSubComments: true,
            level: this.props.level + 1,
            commentMarginLeft: -10,
            containerMarginLeft: this.props.level * 10
        }
    }


    renderAuthor = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'grey', fontSize: 15, marginLeft: this.state.commentMarginLeft }}>{this.props.comment.data.author} </Text>
                <Text style={{ color: 'grey', fontSize: 15 }}>
                    <Icon name='arrowup' color='grey' />{this.props.comment.data.score}
                </Text>
            </View>
        )
    }

    render() {
        const replies = this.props.comment.data.replies;
        let commentColor = 'grey';
        switch (this.state.level) {
            case 1:
                commentColor = 'blue';
                break;
            case 2:
                commentColor = 'purple';
                break;
            case 3:
                commentColor = 'red';
                break;
            case 4:
                commentColor = 'orange';
                break;
            case 5:
                commentColor = 'yellow';
                break;
            default:
                commentColor = 'grey';
        }

        return (

            <View>
                {this.props.comment.data.author &&
                    <View
                        style={{
                            marginLeft: this.state.containerMarginLeft,
                            borderLeftWidth: 2,
                            borderLeftColor: commentColor
                        }}
                    >
                        <ListItem
                            title={this.renderAuthor()}
                            subtitle={this.props.comment.data.body}
                            topDivider
                            containerStyle={{ backgroundColor: 'black' }}
                            subtitleStyle={{ color: 'white', fontSize: 15, marginLeft: this.state.commentMarginLeft }}
                            onPress={() => {
                                this.setState({
                                    showSubComments:!this.state.showSubComments
                                })
                            }}
                        />
                    </View>
                }
                {
                    this.state.showSubComments &&
                    this.state.level < 3 &&
                    replies !== undefined &&
                    replies !== "" &&
                    replies.data.children.length > 0 &&
                    replies.data.children.map((reply, i) => {
                        return (
                            <CommentList key={i} comment={reply} level={this.state.level} />
                        )
                    })
                }
            </View>
        )
    }
}

export default CommentList;