import React, {Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text
} from 'react-native';


export default class Bar extends Component {
    render() {
        return (
            <View style={styles.bar} >
                <View style={[styles.barItem, styles.barSeparator]} >
                    <Text style={styles.barTop}>MOJO POINTS</Text>
                    <Text style={styles.barBottom}>2354</Text>
                </View>
                <View style={[styles.barItem]} >
                    <Text style={styles.barTop}>WATCARD BALANCE</Text>
                    <Text style={styles.barBottom}>1250</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bar: {
        borderTopColor: 'white',
        borderTopWidth: 4,
        backgroundColor: 'rgba(250,250,250,1)',
        flexDirection: 'row',
    },
    barSeparator: {
        borderRightWidth: 1,
        borderRightColor: 'rgba(74,74,74,0.4)',
    },
    barItem: {
        flex: 1,
        padding: 14,
        alignItems: 'center',
    },
    barTop: {
        color: 'rgba(24,172,222,1)',
        fontSize: 14,
        fontFamily: 'Avenir',
        fontWeight: '500',
    },
    barBottom: {
        color: 'rgba(74,74,74,1)',
        fontSize: 14,
        fontFamily: 'Avenir',
    },
});
