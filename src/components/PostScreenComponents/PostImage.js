import React, { Component } from 'react';
import { PermissionsAndroid, View, TouchableHighlight, Platform, Clipboard } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { ListItem } from 'react-native-elements';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";
import GallerySwiper from "react-native-gallery-swiper";
import Modal from "react-native-modal";
import RNFetchBlob from 'rn-fetch-blob';
import * as RNFS from 'react-native-fs';

import listStyles from '../../styles/listStyle';

class PostImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDownloadModal: false,
        }
    }

    downloadImage = () => {
        if (Platform.OS === "android") {
            //Use RNFetchBlob for picture directory
            const imagePath = `${RNFetchBlob.fs.dirs.PictureDir}/Iris/${new Date().toISOString()}.jpg`.replace(/:/g, '');
            RNFS.readdir(`${RNFetchBlob.fs.dirs.PictureDir}/Iris`).then(res => {
                //Do nothing if dir already exist
            }).catch(e => {
                //Create dir if it doesn't exist
                RNFS.mkdir(`${RNFetchBlob.fs.dirs.PictureDir}/Iris`);
            });
            //Save file to image path 
            RNFS.downloadFile({
                fromUrl: this.props.imageURL,
                toFile: imagePath
            }).promise.then(() => {
                //Scane file with media scanner
                RNFS.scanFile(imagePath).then(() => {
                    showMessage({
                        message: "Image Saved",
                        type: "info"
                    })
                }, () => {
                    showMessage({
                        message: "Failed to save image",
                        type: "warning"
                    });
                });
            }, () => {
                showMessage({
                    message: "Failed to save image",
                    type: "warning"
                });
            });
        }
        if (Platform.OS === "ios") {
            console.log("IOS");
            const imagePath = `${RNFS.LibraryDirectoryPath}/${new Date().toISOString()}.jpg`.replace(/:/g, '');
            RNFS.downloadFile({
                fromUrl: this.props.imageURL,
                toFile: imagePath
            }).promise.then(res => {
                CameraRoll.saveToCameraRoll(imagePath).then(res => {
                    showMessage({
                        message: "Image Saved",
                        type: "info"
                    })
                }, () => {
                    showMessage({
                        message: "Failed to save image. Please check if Iris has permission to Photos",
                        type: "warning"
                    });

                });
            }, () => {
                showMessage({
                    message: "Failed to save image. Please check if Iris has permission to Photos",
                    type: "warning"
                });
            });
        }
    }

    render() {
        return (
            <View
                style={{ flex: 1 }}
            >
                <Modal
                    isVisible={this.state.showDownloadModal}
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    animationInTiming={200}
                    animationOutTiming={200}
                    backdropOpacity={0.3}
                    useNativeDriver={true}
                    onBackdropPress={() => {
                        this.setState({
                            showDownloadModal: false
                        });
                    }}
                    onBackButtonPress={() => {
                        this.setState({
                            showDownloadModal: false
                        });
                    }}
                >
                    <View style={{ overflow: 'hidden', borderRadius: 10 }}>
                        <TouchableHighlight
                            onPress={() => {
                                //check if the app has permission to write 
                                if (Platform.OS === "android") {
                                    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(res => {
                                        if (res === true) {
                                            this.downloadImage();
                                        } else {
                                            try {
                                                PermissionsAndroid.request(
                                                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                                                ).then(granted => {
                                                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                                        this.downloadImage();
                                                    } else {
                                                        showMessage({
                                                            message: "Permission Denied",
                                                            type: "warning"
                                                        });
                                                    }
                                                });
                                            } catch (err) {
                                                console.warn(err);
                                            }
                                        }
                                    });
                                } else if (Platform.OS === "ios") {
                                    this.downloadImage();
                                }
                                this.setState({
                                    showDownloadModal: false
                                });
                            }}
                        >
                            <ListItem
                                titleStyle={listStyles.title}
                                containerStyle={{ backgroundColor: "#1a1a1a" }}
                                title="Save Image"
                            />
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <ListItem
                                titleStyle={listStyles.title}
                                containerStyle={{ backgroundColor: "#1a1a1a" }}
                                title="Copy Image URL"
                                onPress={() => {
                                    Clipboard.setString(this.props.imageURL);
                                    this.setState({
                                        showDownloadModal: false
                                    });
                                }}
                            />
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <ListItem
                                titleStyle={listStyles.title}
                                containerStyle={{ backgroundColor: "#1a1a1a" }}
                                title="Share Image File"
                                onPress={() => {
                                    this.setState({
                                        showDownloadModal: false
                                    });
                                }}
                            />
                        </TouchableHighlight>
                    </View>
                </Modal>

                <GallerySwiper
                    images={[
                        {
                            url: this.props.imageURL
                        }
                    ]}
                    onSwipeUpReleased={(e) => {
                        this.props.setImageModalState(false, "slideOutUp")
                    }}
                    onSwipeDownReleased={(e) => {
                        this.props.setImageModalState(false, "slideOutDown")
                    }}
                    onLongPress={(e) => {
                        this.setState({
                            showDownloadModal: true
                        });
                    }}
                />

                <FlashMessage ref="imageModalFlashMessage" position="top" />
            </View>
        );
    }
};

export default PostImage;