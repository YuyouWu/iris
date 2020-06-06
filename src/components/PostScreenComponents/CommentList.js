import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Vibration, Platform, StyleSheet } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import Display from 'react-native-display';
import Icon from 'react-native-vector-icons/AntDesign';
import commentStyle from '../../styles/commentStyle'
import { kFormatter } from '../utils/numUtils';
import { RNFetchBlobSession } from 'rn-fetch-blob';

const blue = '#289EFE';
const green = '#9DFF48';
const yellow = '#FFFA48';
const orange = '#FF9F48';
const red = '#FF6D6E';

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
                <Text
                    style={this.props.author === this.props.comment.data.author ?
                        commentStyle.opText : commentStyle.authorText
                    }
                >
                    {this.props.comment.data.author}
                </Text>
                <Text style={commentStyle.scoreText}>
                    <Icon name='arrowup' color='grey' />{kFormatter(this.props.comment.data.score)}
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
                commentColor = blue;
                break;
            case blue:
                commentColor = green;
                break;
            case green:
                commentColor = yellow;
                break;
            case yellow:
                commentColor = orange;
                break;
            case orange:
                commentColor = red;
                break;
            case red:
                commentColor = blue;
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
                            }, () => {
                                if (Platform.OS === 'android') {
                                    Vibration.vibrate(20);
                                }
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
                            <Divider
                                style={{
                                    backgroundColor: this.props.theme.colors.divider,
                                    ...styles.divider
                                }}
                            />
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
                                        <Text
                                            style={{
                                                ...commentStyle.commentText,
                                                color: this.props.theme.colors.primaryText
                                            }}
                                        >
                                            {this.props.comment.data.body}
                                        </Text>
                                    </Display>
                                }
                                containerStyle={{
                                    backgroundColor: this.props.theme.colors.tileBackground
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                }

                {/*Rendering replies to parents comment*/}
                <TouchableOpacity>
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
                                            <CommentList key={i} comment={reply} level={this.state.level} commentColor={commentColor} author={this.props.author} theme={this.props.theme} />
                                        </Display>
                                    </View>
                                )
                            })
                        }
                    </View>
                </TouchableOpacity>
                {
                    //For comments nested higher than 4 levels, hide under a show more button
                    this.state.level >= 4 &&
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
                                            <CommentList key={i} comment={reply} level={this.state.level} commentColor={commentColor} author={this.props.author} theme={this.props.theme} />
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
                                            titleStyle={{ color: this.props.theme.colors.primaryText }}
                                            containerStyle={{
                                                backgroundColor: this.props.theme.colors.tileBackground
                                            }}
                                            topDivider
                                        />
                                    </View>

                                )
                            }
                        </View>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

export default CommentList;

const styles = StyleSheet.create({
    divider: {
        width: "100%",
        alignSelf: "center"
    }
})