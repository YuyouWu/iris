import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadMoreComments: false,
            showSubComments: true,
            level: this.props.level + 1,
            commentMarginLeft: -5,
            containerMarginLeft: this.props.level * 5
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
        const borderLeftWidth = 5;
        const replies = this.props.comment.data.replies;
        let commentColor = 'grey';
        switch (this.state.level) {
            case 1:
                commentColor = 'black';
                break;
            case 2:
                commentColor = 'blue';
                break;
            case 3:
                commentColor = 'green';
                break;
            case 4:
                commentColor = 'yellow';
                break;
            case 5:
                commentColor = 'red';
                break;
            case 6:
                commentColor = 'purple';
                break;
            default:
                commentColor = 'grey';
        }

        return (
            <View>
                {this.props.comment.data.author &&
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                showSubComments: !this.state.showSubComments
                            });
                        }}
                    >
                        <View
                            style={{
                                marginLeft: this.state.containerMarginLeft,
                                borderLeftWidth: borderLeftWidth,
                                borderLeftColor: commentColor
                            }}
                        >
                            <ListItem
                                title={this.renderAuthor()}
                                subtitle={this.props.comment.data.body}
                                topDivider
                                containerStyle={{ backgroundColor: 'black' }}
                                subtitleStyle={{ color: 'white', fontSize: 15, marginLeft: this.state.commentMarginLeft }}
                                subtitleProps={
                                    !this.state.showSubComments ? (
                                        { numberOfLines: 1 }
                                    ) : ({})
                                }
                            />
                        </View>
                    </TouchableOpacity>
                }
                <TouchableOpacity>
                    {
                        this.state.level < 5 &&
                        replies !== undefined &&
                        replies !== "" &&
                        replies.data.children.length > 0 &&
                        replies.data.children.map((reply, i) => {
                            if (this.state.showSubComments) {
                                return (
                                    <CommentList key={i} comment={reply} level={this.state.level} />
                                )
                            }
                        })
                    }
                </TouchableOpacity>
                {
                    //For comments nested higher than 3 levels, hide under a show more button
                    this.state.level >= 5 &&
                    replies !== undefined &&
                    replies !== "" &&
                    replies.data.children.length > 0 &&
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                loadMoreComments: !this.state.loadMoreComments
                            });
                        }}
                    >
                        {this.state.loadMoreComments ? (
                            replies.data.children.map((reply, i) => {
                                if (this.state.showSubComments) {
                                    return (
                                        <CommentList key={i} comment={reply} level={this.state.level} />
                                    )
                                }
                            })
                        ) : (
                                <View
                                    style={{
                                        marginLeft: this.state.containerMarginLeft + 10,
                                        borderLeftWidth: borderLeftWidth,
                                        borderLeftColor: 'grey'
                                    }}
                                >
                                    <ListItem
                                        title="Load more comments"
                                        titleStyle={{ color: 'white' }}
                                        containerStyle={{ backgroundColor: 'black' }}
                                        topDivider
                                    />
                                </View>

                            )

                        }
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

export default CommentList;