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

export default class MenuHeader extends Component {

    state= {
        selectedTab: 'globe',
        mojo_active: true,
      };

    render() {

        //for the case where the background colour is white it forces a black background
        var forceContrastColour = this.props.color === 'white'?'black':this.props.color;

        return(
            <View style={styles.headerBackground} > 
                <TouchableOpacity style={styles.logoHolder} onPress={this.props.onPressLogo} activeOpacity={0.5}>
                    <Text style={[styles.headerText, {color: forceContrastColour}]}>{this.props.restaurant}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartHolder} onPress={this.props.onPressCart} activeOpacity={0.5}>
                    <Image style={[styles.cartWrapper, {tintColor: forceContrastColour}]} source={require('../../images/statusbar/ShoppingCart.png')} />
                </TouchableOpacity>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
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
        headerText: {
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 22,
            fontWeight: 'bold',
            color: 'green',
            fontFamily: 'Avenir',
          },
          headerBackground: {
            backgroundColor: 'white',
            flexDirection: 'row',
            width: deviceW,
            height: 85,
            borderBottomColor: 'rgba(241,241,241,1)',
            borderBottomWidth: 0,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
          },
})

AppRegistry.registerComponent('Mojo', () => MenuHeader);