import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, Vibration } from 'react-native';
import { ListItem } from 'react-native-elements';
import Display from 'react-native-display';
import Icon from 'react-native-vector-icons/AntDesign';
import commentStyle from '../../styles/commentStyle'

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadMoreComments: false,
            showSubComments: true,
            level: this.props.level + 1,
            containerMarginLeft: this.props.level * 5,
        }
    }


    renderAuthor = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Text style={commentStyle.authorText}>{this.props.comment.data.author} </Text>
                <Text style={commentStyle.scoreText}>
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
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                showSubComments: !this.state.showSubComments
                            }, () => {
                                Vibration.vibrate(20);
                            });
                        }}
                    >
                        <View
                            style={{
                                marginLeft: this.state.containerMarginLeft,
                                borderLeftWidth: this.state.level === 1 ? 0 : borderLeftWidth,
                                borderLeftColor: commentColor
                            }}
                        >
                            <ListItem
                                title={this.renderAuthor()}
                                subtitle={
                                    <Display
                                        enable={this.state.showSubComments}
                                        enterDuration={200}
                                        exitDuration={200}
                                        exit="fadeOutRight"
                                        enter="fadeInRight"
                                    >
                                        <Text style={commentStyle.commentText}>{this.props.comment.data.body}</Text>
                                    </Display>

                                }
                                topDivider
                                containerStyle={commentStyle.containerBackground}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                }

                {/*Rendering replies to parents comment*/}
                <TouchableWithoutFeedback>
                    <View>
                        {
                            this.state.level < 4 &&
                            replies !== undefined &&
                            replies !== "" &&
                            replies.data.children.length > 0 &&
                            replies.data.children.map((reply, i) => {
                                return (
                                    <View
                                        key={i}
                                    // style={this.state.showSubComments ? { display: "flex" } : { display: "none" }}
                                    >
                                        <Display
                                            enable={this.state.showSubComments}
                                            enterDuration={200}
                                            exitDuration={200}
                                            exit="fadeOutRight"
                                            enter="fadeInRight"
                                        >
                                            <CommentList key={i} comment={reply} level={this.state.level} commentColor={commentColor} />
                                        </Display>
                                    </View>
                                )
                            })
                        }
                    </View>
                </TouchableWithoutFeedback>
                {
                    //For comments nested higher than 4 levels, hide under a show more button
                    this.state.level >= 4 &&
                    replies !== undefined &&
                    replies !== "" &&
                    replies.data.children.length > 0 &&
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({
                                loadMoreComments: !this.state.loadMoreComments
                            });
                        }}
                    >
                        <View>
                            {this.state.loadMoreComments ? (
                                replies.data.children.map((reply, i) => {
                                    return (
                                        <Display
                                            enable={this.state.showSubComments}
                                            enterDuration={200}
                                            exitDuration={200}
                                            exit="fadeOutRight"
                                            enter="fadeInRight"
                                        >
                                            <CommentList key={i} comment={reply} level={this.state.level} commentColor={commentColor} />
                                        </Display>
                                    )
                                })
                            ) : (
                                    <View
                                        style={{
                                            marginLeft: this.state.containerMarginLeft + 5,
                                            borderLeftWidth: borderLeftWidth,
                                            borderLeftColor: 'grey'
                                        }}
                                    >
                                        <ListItem
                                            title="Load more comments"
                                            titleStyle={{ color: 'white' }}
                                            containerStyle={commentStyle.containerBackground}
                                            topDivider
                                        />
                                    </View>

                                )

                            }
                        </View>
                    </TouchableWithoutFeedback>
                }
            </View>
        )
    }
}

export default CommentList;