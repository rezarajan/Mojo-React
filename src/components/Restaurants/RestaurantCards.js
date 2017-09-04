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
import Name from '../SignUp/Name';
import RestaurantHeader from './RestaurantHeader';
import RestaurantCarousel from './RestaurantCarousel';
//import ActionButton from 'react-native-circular-action-menu';
import {Dimensions} from 'react-native'

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class RestaurantCards extends Component {

    render() {
        return(
            <View style={styles.container}>
                <RestaurantHeader /> 
                <RestaurantCarousel />
            
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
        buttonWrapper: {
          backgroundColor: 'transparent',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 14,
          left: (deviceW/2) - 36,
          justifyContent: 'center',
          alignItems: 'center'
        },
        closebuttonWrapper: {
            backgroundColor: 'red',
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            left: 0,
            flex: 1,
            alignItems: 'flex-start',
            width: deviceW,
            height: 70,
          },
          profilepic: {
            width:321, 
            height:159,
            //borderColor: 'rgba(0,0,0,0.4)',
        },
})

AppRegistry.registerComponent('Mojo', () => RestaurantCards);