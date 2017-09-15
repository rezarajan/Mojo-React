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
    FlatList,
    ScrollView,
    AsyncStorage,
} from 'react-native';
import Accordion from '../custom-react-components/react-native-collapsible/Accordion';
import RoundedText from './RoundedText';
import RestaurantHeader from '../Restaurants/RestaurantHeader';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

export default class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
        itemsData: [],
        user: null,
      }
  }

  componentWillMount() {

    AsyncStorage.getItem('userData').then((user_data_json) => {
      let userData = JSON.parse(user_data_json);
      this.setState({
          user: userData.uid
      })
      console.log(this.state.user)
      this.logthemAll();
  
  });
}

//TODO: Optimize this for rendering the cart layout
  logthemAll(){
    //this uses the orderByKey method to acquire the unique push keys for each item
  var itemsRef = firebase.database().ref().child('uid').child(this.state.user).child('cart');
  var items = [];
  itemsRef.orderByKey().on('value', (snap) => {

    //Resets the state of itemsData for the case that the node is updated in real time
    //This function, since asynchronous, must hold this function to reset the state of
    //itemsData
    this.setState({
      itemsData: [],
    });
      snap.forEach((child) => {
        //TODO: fill out header here using the Restaurant name as child.key
        //Then filter for the items the user chose from each restaurant

        this.setState({
          itemsData: 
          [
            ...this.state.itemsData,  
            {
              restaurantName: child.key ? child.key : 'Restaurant Name', 
              //cost: subChild.child('details').val().cost ? subChild.child('details').val().cost:0
            }
          ]  
        });


        //   itemsRef.child(child.key).orderByKey().on('child_added', (snap) => {
        //     snap.forEach((subChild) => {
        //         this.setState({
        //           itemsData: 
        //           [
        //             ...this.state.itemsData,  
        //             {
        //               restaurantName: child.key ? child.key : 'Restaurant Name', 
        //               cost: subChild.child('details').val().cost ? subChild.child('details').val().cost:0
        //             }
        //           ]  
        //         });
        //     });
        // });
      });
  });

  console.log(this.state.itemsData);
  
}

     
  _renderHeader(section) {
    return (
      <View style={{marginTop: -28}}>
        <RoundedText 
        text={section.restaurantName} 
        width={0.9*deviceW}
        height={70}
        backgroundColor={'white'}
        borderTopLeftRadius={20}    // Rounded border
        borderTopRightRadius={20}   // Rounded border
        borderBottomLeftRadius={0}         
        borderBottomRightRadius={0}/>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={{marginTop: -28, marginBottom: 28}}>
      <RoundedText 
      text={section.restaurantName}
      height={360}
      backgroundColor= {'white'}
      borderTopLeftRadius={0}         
      borderTopRightRadius={0}
      borderBottomLeftRadius={20}   // Rounded border
      borderBottomRightRadius={20}  // Rounded border
      
      />
      </View>
    );
  }

  render() {
    console.log(this.state.itemsData);
    return (
      <View>
        <View style={[styles.container, {position: 'absolute', top: 98, height: deviceH-98, marginTop: 0}]}>
          <ScrollView style={{paddingTop: 28}}>
          <Accordion
            sections={this.state.itemsData}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            initiallyActiveSection={1}
          />
          </ScrollView>
        </View>
        <RestaurantHeader onPressLogo={() => {
                                    Actions.home();
                                }}/>
      </View>
    );
  }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 8,
    marginTop: 56,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: deviceW,
    backgroundColor: 'rgba(250,250,250,1)'
  },
})

AppRegistry.registerComponent('Mojo', () => Cart);