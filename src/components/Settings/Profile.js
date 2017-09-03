import React, {Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
} from 'react-native';

import ProfileHeader from './ProfileHeader';
import Bar from './Bar';
import ProfileGrid from './ProfileGrid';

export default class Profile extends Component {
    render() {
        return (
            //cretaes a background for the profile pic
            <View style={styles.container} >
                <ProfileHeader />
                <Bar />
                <ProfileGrid />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        backgroundColor: 'rgba(250,250,250,1)',
    },
});
