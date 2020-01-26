import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PostTileList from './PostTileList';
import Post from './Post';
import PostImage from './PostImage';
import PostVideo from './PostVideo';
import PostLinkView from './PostLinkView';

const NavStack = createStackNavigator(
    {
        PostTileList: PostTileList,
        Post: Post,
        PostImage: PostImage,
        PostVideo: PostVideo,
        PostLinkView: PostLinkView
    },
    {
        initialRouteName: 'PostTileList',
        headerMode: 'none',
    }
);

const Navigator = createAppContainer(NavStack);

class PostNavigator extends React.Component {
    render() {
        return (
            <Navigator screenProps={{
                currentSub: this.props.navigation.getParam('currentSub')
            }}/>
        );
    }
};

export default PostNavigator;
