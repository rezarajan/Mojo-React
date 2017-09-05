import React, {Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';

const deviceW = Dimensions.get('window').width;

export default class CardView extends Component {
    render() {
        return (
            //cretaes a background for the profile pic
            <View style={[styles.headerBackground, {backgroundColor: this.props.backgroundColor, width: this.props.itemWidth}]}>
                <View style={styles.header}>
                    <View style={styles.profilepicWrap}>
                        <Image style={styles.profilepic} source={require('../../images/dojocat.png')} />
                    </View>

                    <View style={{marginTop: 20, alignItems: 'center', flexDirection: 'row'}}>
                        <Text style={styles.name}>{this.props.text}</Text>
                        <Text style={[styles.moreinfo, {flex: 0.4, marginLeft: 8}]}>Open</Text>
                    </View>
                    {/* <Text style={styles.moreinfo}>Change Profile Photo</Text> */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerBackground: {
        alignItems: 'center',
        //width: 0.6*deviceW,
        marginTop:8,
        borderRadius: 32,
    },
    header: {
        //flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        //backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundColor: 'transparent',
    },
    profilepicWrap : {
        width: 90,
        height: 90,
        borderRadius: 100,
        borderColor: 'rgba(0,0,0,0.4)',
        //borderColor: 'transparent',
        borderWidth: 4,
        backgroundColor: 'white',
    },
    profilepic: {
        flex: 1,
        height: null,
        width: null,
        alignSelf: 'stretch',
        borderRadius: 45,
        //borderColor: 'rgba(0,0,0,0.4)',
        borderColor: 'white',
        borderWidth: 0,
    },
    name: {
        //marginTop: 20,
        fontSize: 16,
        color: 'white',
        //borderWidth: 4,
    },
    moreinfo: {
        fontSize: 14,
        color: 'white',
        fontWeight: '300',
        fontFamily: 'Avenir',
    }
});
