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
    Dimensions,
} from 'react-native';

//import TabNavigator from 'react-native-tab-navigator';
//import ActionButton from 'react-native-circular-action-menu';

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
                <TouchableOpacity style={styles.logoHolder} onPress={this.props.onPressLogo} activeOpacity={0.5}>
                    <Image style={styles.logoWrapper} source={require('../../images/statusbar/mojo_textLogo.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartHolder} onPress={this.props.onPressCart} activeOpacity={0.5}>
                    <Image style={styles.cartWrapper} source={require('../../images/statusbar/ShoppingCart.png')} />
                </TouchableOpacity>
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
          width: 91,
          height: 24,
          marginTop: 8,
          marginLeft: 60,
          marginRight: 60
        //   marginBottom: 24,
        },
         //Mojo button holder
         logoHolder: {
            //position: 'absolute',
            //right: deviceW/2,
            //left: deviceW/2,
            alignItems: 'center',
            justifyContent: 'center'
          //   marginBottom: 24,
          },
         //Cart button wrapper
         cartWrapper: {
            width: 35,
            height: 24,
            marginTop: 8,
          },
          //Cart button holder
         cartHolder: {
            position: 'absolute',
            right: 24,
          //   marginBottom: 24,
          },
        headerBackground: {
            backgroundColor: 'white',
            flexDirection: 'row',
            // position: 'absolute',
            // top: 0,
            // left: 0,
            width: deviceW,
            height: 85,
            borderBottomColor: 'rgba(241,241,241,1)',
            borderBottomWidth: 0,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
          },
})

AppRegistry.registerComponent('Mojo', () => RestaurantCards);