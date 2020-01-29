import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadMoreComments: false,
            showSubComments: true,
            level: this.props.level + 1,
            commentMarginLeft: -5,
            containerMarginLeft: this.props.level * 5,
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
        let commentColor;
        if (!this.props.commentColor) {
            commentColor = 'black';
        }
        switch (this.props.commentColor) {
            case 'black':
                commentColor = '#289EFE';
                break;
            case '#289EFE':
                commentColor = '#9DFF48';
                break;
            case '#9DFF48':
                commentColor = '#FFFA48';
                break;
            case '#FFFA48':
                commentColor = '#FF9F48';
                break;
            case '#FF9F48':
                commentColor = '#FF6D6E';
                break;
            case '#FF6D6E':
                commentColor = '#289EFE';
                break;
            default:
                commentColor = 'black';
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
                                subtitle={
                                    this.state.showSubComments ? (
                                        this.props.comment.data.body
                                    ) : (null)
                                }
                                topDivider
                                containerStyle={{ backgroundColor: 'black' }}
                                subtitleStyle={{ color: 'white', fontSize: 15, marginLeft: this.state.commentMarginLeft }}
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
                                    <CommentList key={i} comment={reply} level={this.state.level} commentColor={commentColor} />
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
                                        <CommentList key={i} comment={reply} level={this.state.level} commentColor={commentColor} />
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