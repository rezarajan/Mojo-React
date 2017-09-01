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

export default class Email extends Component {

    constructor(props){
        super(props)
    
        this.state = {
          password: "",
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        //TODO: Use these params to determine if the user has come from login or signup
        const { params } = this.props.navigation.state;
        return (
            //TODO: replace the TouchableOpacity close for the back button
            //provided by the StackNavigator
        <View style={styles.container} >
            <TouchableOpacity 
            style={styles.closebuttonWrapper}
            onPress={() => navigate('Login')} >
                <Image 
                //inherits the origin from the parent style
                style={[styles.closebuttonWrapper, {top:0, left:0}]}    
                source={require('../../images/signup/close_accent.png')}/>
            </TouchableOpacity>
            <View style={styles.logoContainer}>
                <Text style={styles.title}>Let's Get Started!</Text>
                <Text style={styles.text}>What would you like your password to be?</Text>
            </View>
            <View style={styles.buttonContainer}>
            {/* Text Input and Next */}
            <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor='rgba(155,155,155,1)'
            style={styles.textInput}
            onChangeText={(text) => this.setState({password: text})}
            />
            <RoundedButton
            text="Next"
            color='#FFFFFF'
            backgroundColor='rgba(24,172,222,1)'
            onPress={() => {navigate('Email'); console.log(this.state.password); console.log(params.email); console.log(params.name)}}
            />
        </View>
        {/* The close button */}
        <TouchableOpacity 
        style={styles.closebuttonWrapper}
        onPress={() => navigate('Login')} >
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