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
import RoundedButton from '../RoundedButton';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export default class Email extends Component {

    constructor(props){
        super(props)
    
        this.state = {
          passwordre: "",
        }
    }

    async signup(email, pass) {
        
            try {
                await firebase.auth()
                    .createUserWithEmailAndPassword(email, pass);
        
                console.log("Account created");
                //navigate('Home');
                Actions.home();
        
                // Navigate to the Home page, the user is auto logged in
        
            } catch (error) {
                console.log(error.toString())
            }
        
        }

    render() {
        //TODO: Use these params to determine if the user has come from login or signup
        return (
            //TODO: replace the TouchableOpacity close for the back button
            //provided by the StackNavigator
        <View style={styles.container} >
            <TouchableOpacity 
            style={styles.closebuttonWrapper}
            onPress={() => Actions.login()} >
                <Image 
                //inherits the origin from the parent style
                style={[styles.closebuttonWrapper, {top:0, left:0}]}    
                source={require('../../images/signup/close_accent.png')}/>
            </TouchableOpacity>
            <View style={styles.logoContainer}>
                <Text style={styles.title}>Let's Get Started!</Text>
                <Text style={styles.text}>Please re-enter password</Text>
            </View>
            <View style={styles.buttonContainer}>
            {/* Text Input and Next */}
            <TextInput
            placeholder="Re-enter Password"
            secureTextEntry={true}
            placeholderTextColor='rgba(155,155,155,1)'
            style={styles.textInput}
            onChangeText={(text) => this.setState({passwordre: text})}
            />
            <RoundedButton
            text="Sign Up"
            color='#FFFFFF'
            backgroundColor='rgba(24,172,222,1)'
            onPress={() => {
                //navigate('Email');
                console.log(this.props.username);
                console.log(this.props.useremail);
                console.log(this.props.passwordinit);
                console.log(this.state.passwordre);

                if(this.props.passwordinit === this.state.passwordre){
                    this.signup(this.props.useremail, this.props.passwordinit);
                }
                else{
                    console.log('Passwords are different');
                }
                
                }}
            />
        </View>
        {/* The close button */}
        <TouchableOpacity 
        style={styles.closebuttonWrapper}
        onPress={() => Actions.login()} >
            <Image 
            //inherits the origin from the parent style
            style={[styles.closebuttonWrapper, {top:0, left:0}]}    
            source={require('../../images/signup/close_accent.png')}/>
        </TouchableOpacity>
        </View>
        );
    }
}


const styles = StyleSheet.create({

    container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'white',
    },
    buttonContainer: {
        marginBottom: 436,
    },
    // TextInput container
    textInput: {
      flexDirection: 'row',
      borderRadius: 45,         // Rounded border
      borderWidth: 2,           // 2 point border widht
      //borderColor: 'rgba(24,172,223,1)',   // White colored border
      paddingHorizontal: 45,    // Horizontal padding
      paddingVertical: 8,      // Vertical padding
      alignItems: 'center',
      backgroundColor: 'rgba(242,242,242,1)',
      borderColor: 'rgba(242,242,242,1)',
      fontFamily: 'Avenir',
      fontSize: 16,
      justifyContent: 'center',
      textAlign: 'left',
      width: 286,
      
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 48,
        marginTop: 60,
    },
    title: {
        color: 'rgba(24,172,223,1)',
        textAlign: 'center',
        marginTop: 14,
        marginBottom: 10,
        fontFamily: 'Avenir',
        fontSize: 24,
    },
    text: {
        width: 310,
        color: 'rgba(24,172,223,1)',
        fontFamily: 'Avenir',
        fontSize: 16,
        justifyContent: 'center',
        textAlign: 'center'
    },
    closebuttonWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'column',
        position: 'absolute',
        top: 34,
        left: 34,
        flex: 1,
        alignItems: 'flex-start',
        width: 24,
        height: 24,
      },
  })

  AppRegistry.registerComponent('Mojo', () => Email);