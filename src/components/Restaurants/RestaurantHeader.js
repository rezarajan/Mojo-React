import React, { Component } from 'react';
import { 
    Alert, 
    AppRegistry, 
    Button, 
    StyleSheet, 
    View, 
    Image,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
//import TabNavigator from 'react-native-tab-navigator';
//import ActionButton from 'react-native-circular-action-menu';
import {Dimensions} from 'react-native'

import Profile from "../Settings/Profile";

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class RestaurantCards extends Component {

    state= {
        selectedTab: 'globe',
        mojo_active: true,
      };

    render() {
        return(
            <View style={styles.headerBackground} > 
                <Image style={styles.logoWrapper} source={require('../../images/statusbar/mojo_textLogo.png')} />
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: deviceW,
        backgroundColor: 'white',

       },
         //Mojo button wrapper
        logoWrapper: {
          alignSelf: 'center',
          width: 120,
          height: 33,
          marginTop:8,
        //   marginBottom: 24,
        },
        headerBackground: {
            backgroundColor: 'white',
            //flexDirection: 'row',
            // position: 'absolute',
            // top: 0,
            // left: 0,
            width: deviceW,
            height: 98,
            borderBottomColor: 'rgba(241,241,241,1)',
            borderBottomWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
          },
})

AppRegistry.registerComponent('Mojo', () => RestaurantCards);