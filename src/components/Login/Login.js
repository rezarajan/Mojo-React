import React, { Component } from 'react';
import { 
    Alert, 
    AppRegistry, 
    Button, 
    StyleSheet, 
    View, 
    Image,
    Text,
    AsyncStorage,
} from 'react-native';

import Swiper from '../Swiper/Swiper';
import { Actions } from 'react-native-router-flux';
import Home from '../Home/Home';

export default class Login extends Component {
    _onPressButton() {
         Alert.alert('You tapped the button!')
       }

    constructor(props){
        super(props)
    
        this.state = {
            user: null,
            loading: true,
        }
    }

    componentWillMount() {
        // Checks the AsyncStorage to see if the user is still logged in
        // const userData = this.props.firebaseApp.auth().currentUser;
        AsyncStorage.getItem('userData').then((user_data_json) => {
          let userData = JSON.parse(user_data_json);
          //console.log(userData);
          this.setState({
            user: userData,
            loading: false,
          });
        });

    }

    render() {
        const content = this.state.user ?
        <Home />
        :
        <Swiper>
            {/* First screen */}
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                    style={styles.logo}
                    source={require('../../images/mojomonkey.png')} />
                    <Text style={styles.title}>Welcome to Mojo</Text>
                    <Text style={styles.text}>Swipe to learn more</Text>
                </View>
            </View>
            {/* Second screen */}
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                    style={{width:275, height:114, margin: 30}}
                    source={require('../../images/waiting.png')} />
                    <Text style={styles.text}>No more waiting! Mojo allows you to order and pay for food right from its app. You can either come to one of the Mojo Kiosk’s near you or have one of our Mojo Runners delivered right to your seat. </Text>
                </View>
            </View>
            {/* Third screen */}
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                    style={{width:321, height:159, margin: 30}}
                    source={require('../../images/mojocards.png')} />
                    <Text style={styles.text}>We allow you to order from popular restaurants around your location, whether a district or a venue. We even give you updates on any special deals at your favourite restaurant!</Text>
                </View>
            </View>
            {/* Fourth screen */}
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                    style={{width:104, height:130, margin: 30}}
                    source={require('../../images/gift.png')} />
                    <Text style={styles.text}>Our loyalty program allows you to redeem prizes ranging from sporting memoribillia of your favourite sporting brands to getting a free gourmet dish at restaurant of choice.</Text>
                </View>
            </View>
        </Swiper>
        ;

        return (
            <View style={{flex: 1}}>
                {content}
            </View>
        );
    }
}



const styles = StyleSheet.create({
  //Slide styles
  slide: {
    flex: 1,                    // Take up all screen
    justifyContent: 'center',   // Center vertically
    alignItems: 'center',       // Center horizontally
  },
  // Header styles
  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  },
    container: {
     flex: 1,
     justifyContent: 'center',
     backgroundColor: 'white',
    },
    buttonContainer: {
      marginTop: 70,
      marginBottom: 130,
      backgroundColor: 'coral',
    },
    alternativeLayoutButtonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 200,
    },
    logo: {
        width: 173,
        height: 164,

    },
    logotext: {
        width: 114,
        height: 32,
        margin:30,

    },
    title: {
        color: 'rgba(24,172,223,1)',
        textAlign: 'center',
        marginTop: 14,
        marginBottom: 10,
        fontFamily: 'Avenir',
        fontSize: 30,
    },
    text: {
        width: 310,
        color: 'rgba(155,155,155,1)',
        fontFamily: 'Avenir',
        fontSize: 16,
        justifyContent: 'center',
        textAlign: 'center'
    }
  })

  AppRegistry.registerComponent('Mojo', () => Login);