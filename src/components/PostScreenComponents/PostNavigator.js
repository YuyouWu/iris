import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import PostTileList from './PostTileList';
import Post from './Post';
import PostImage from './PostImage';
import PostVideo from './PostVideo';
import PostLinkView from './PostLinkView';

class PostNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const currentSub = this.props.navigation.getParam("currentSub") ? this.props.navigation.getParam("currentSub") : 'all'
        const NavStack = createStackNavigator(
            {
                PostTileList: {
                    screen: PostTileList,
                    params: {
                        currentSub: currentSub
                    },
                    navigationOptions: {
                        title: `r/${currentSub}`,
                    }
                },
                Post: Post,
                PostImage: PostImage,
                PostVideo: PostVideo,
                PostLinkView: PostLinkView
            },
            {
                initialRouteName: 'PostTileList',
                defaultNavigationOptions: {
                    headerStyle: {
                        backgroundColor: '#1a1a1a',
                    },
                    headerTitleStyle: {
                        color: 'white'
                    }
                }
            }
        );

        const Navigator = createAppContainer(NavStack);

        return (
            <Navigator />
        );
    }
};

export default PostNavigator;
