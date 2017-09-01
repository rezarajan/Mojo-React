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

firebase.initializeApp({
    apiKey: "AIzaSyDm1S6fl9AeiaHOYvFidMbD8gjet1B9my0",
    authDomain: "mojo-611fa.firebaseapp.com",
    databaseURL: "https://mojo-611fa.firebaseio.com",
    storageBucket: "mojo-611fa.appspot.com"
});

export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            response: ""
        };

        //this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }

    async login(email, pass) {

        email = "stripe_test@gmail.com";
        pass = "123456"
        
        try {
            await firebase.auth()
                .signInWithEmailAndPassword(email, pass);
    
            console.log("Logged In!");
    
            // Navigate to the Home page
    
        } catch (error) {
            console.log(error.toString())
        }
    
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