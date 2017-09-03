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
            <View style={[styles.bar, {borderTopWidth: 0.5}]} >
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
        borderTopColor: 'rgba(241,241,241,1)',
        borderTopWidth: 1,
        borderBottomColor: 'rgba(241,241,241,1)',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    barSeparator: {
        borderRightWidth: 1,
        borderRightColor: 'rgba(241,241,241,1)',
    },
    barItem: {
        flex: 1,
        padding: 8,
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
