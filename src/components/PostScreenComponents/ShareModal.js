import React, { Component } from 'react';
import { useTheme } from '@react-navigation/native';
import { Clipboard, View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import Modal from "react-native-modal";
import Share from 'react-native-share';
import { showMessage } from "react-native-flash-message";

class ShareModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    shareContent = () => {
        const shareOptions = {
            url: "www.reddit.com" + this.props.postData.permalink,
        };

        Share.open(shareOptions).catch(e => {
            console.log(e);
        })
    }


    render() {
        return (
            <Modal
                isVisible={this.props.visible}
                onBackdropPress={() => this.props.toggleShareModal()}
                onBackButtonPress={() => this.props.toggleShareModal()}
                useNativeDriver={true}
                animationInTiming={100}
                animationIn="fadeIn"
                animationOut="fadeOut"
            >
                <View style={styles.modalView}>
                    <ListItem
                        titleStyle={{
                            color: this.props.theme.colors.primaryText
                        }}
                        containerStyle={{
                            backgroundColor: this.props.theme.colors.tileBackground
                        }}
                        title="Share Post Link"
                        onPress={() => {
                            this.shareContent();
                            this.props.toggleShareModal();
                        }}
                    />
                    <ListItem
                        titleStyle={{
                            color: this.props.theme.colors.primaryText
                        }}
                        containerStyle={{
                            backgroundColor: this.props.theme.colors.tileBackground
                        }}
                        onPress={() => {
                            Clipboard.setString("www.reddit.com" + this.props.postData.permalink);
                            showMessage({
                                message: "URL copied",
                                type: "info"
                            });
                            this.props.toggleShareModal();
                        }}
                        title="Copy Post Link"
                    />
                </View>
            </Modal>
        );
    }
};

export default function (props) {
    const theme = useTheme();
    return <ShareModal {...props} theme={theme} />
}

const styles = StyleSheet.create({
    modalView: {
        overflow: "hidden",
        borderRadius: 10
    }
})