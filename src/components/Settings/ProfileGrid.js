import React, {Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Dimensions,
    ScrollView,
} from 'react-native';


export default class ProfileGrid extends Component {
    render() {
        return (
            <ScrollView >
                <View style={styles.profileGrid} > 
                    <View style={styles.profileWrap} >
                        <Image style={styles.photo} source={require('../../images/dojocat.png')} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    profileGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    profileWrap: {
        margin: 2,
        height: 120,
        width: (Dimensions.get('window').width / 2) - 4,
    },
    photo: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
    },
});
