import React, {Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

export default class Profileheader extends Component {
    render() {
        return (
            //cretaes a background for the profile pic
            <Image style={styles.headerBackground} source={require('../../images/mojocards.png')}>
                <View style={styles.header}>
                    <View style={styles.profilepicWrap}>
                        <Image style={styles.profilepic} source={require('../../images/dojocat.png')} />
                    </View>
                    <Text style={styles.name}>Username</Text>
                    <Text style={styles.moreinfo}>More info</Text>
                </View>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    headerBackground: {
        flex:1,
        width: null,
        alignSelf: 'stretch',
    },
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        //backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundColor: 'transparent',
    },
    profilepicWrap : {
        width: 180,
        height: 180,
        borderRadius: 100,
        borderColor: 'rgba(0,0,0,0.4)',
        borderWidth: 16,
    },
    profilepic: {
        flex: 1,
        height: null,
        width: null,
        alignSelf: 'stretch',
        borderRadius: 72,
        borderColor: '#FFF',
        borderWidth: 4,
    },
    name: {
        marginTop: 20,
        fontSize: 16,
        color: '#FFF',
        borderWidth: 4,
    },
    moreinfo: {
        fontSize: 14,
        color: '#0394c0',
        fontWeight: '300',
        fontFamily: 'Avenir',
    }
});
