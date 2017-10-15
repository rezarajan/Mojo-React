import React, { Component } from 'react';
import {
    Alert, 
    StyleSheet, 
    View, 
    Image , 
    TextInput, 
    Text, 
    AppRegistry,
} from 'react-native';

import Login from './LoginForm'
import Button from '../Button.js'

import * as firebase from 'firebase'

export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            response: ""
        };
    }

    // _onPressButton() {
    //     Alert.alert('You tapped the button!')
    //   }

    render() {
        return (
            <View style={[styles.container]}>
                {/* <TextInput 
                placeholder="username"
                placeholderTextColor="rgba(255,255,255,0.7)"
                style={styles.input}/>
                <TextInput 
                placeholder="password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                style={styles.input}/> */}
                <Button
                onPress={this.login}
                text="Sign Up"
                />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
     flex: 1,
     justifyContent: 'center',
     paddingHorizontal: 90
    },
    input: {
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.2)',
      color: '#FFF',
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    buttons: {
        backgroundColor: "whitesmoke",
        width: 150,
        height: 45,
    }
  })

  AppRegistry.registerComponent('LoginForm', () => LoginForm);