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
        subItemsData: [],
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

  logthemAll(){
    //this uses the orderByKey method to acquire the unique push keys for each item
  var itemsRef = firebase.database().ref().child('uid').child(this.state.user).child('cart');
  var restaurantItems = [];
  var items = [];
  itemsRef.orderByKey().on('value', (snap) => {

    //Resets the state of itemsData for the case that the node is updated in real time
    //This function, since asynchronous, must hold this function to reset the state of
    //itemsData
    this.setState({
      itemsData: [],
    });
    // This is a test comment
      snap.forEach((child) => {
        //Just like the statement above, this is resetting the state of the items for
        //a realtime update
        items = [];
        
          itemsRef.child(child.key).orderByKey().on('child_added', (snap) => {
            snap.forEach((subChild) => {
                //populating an array with the data from Firebase
                items.push({
                  cost: subChild.child('details').val().cost ? subChild.child('details').val().cost:0
                });

            });
        });
        //temporary array to section the data based on restaurant, for use by the _renderContent function
        restaurantItems.push(items);

        this.setState({
          itemsData: 
          [
            ...this.state.itemsData,  
            {
              restaurantName: child.key ? child.key : 'Restaurant Name', 
            }
          ],
          subItemsData: restaurantItems,  
        });
      });
  });  
}

     
  _renderHeader(section) {
    return (
      <View style={{marginTop: 0}}>
        <RoundedText 
        text={section.restaurantName} 
        width={0.9*deviceW}
        height={70}
        backgroundColor={'grey'}
        borderTopLeftRadius={20}    // Rounded border
        borderTopRightRadius={20}   // Rounded border
        borderBottomLeftRadius={0}         
        borderBottomRightRadius={0}/>
      </View>
    );
  }

  _renderContent(section, subItemsData, key) {
    console.log(section)
    return(
      subItemsData[key].map((key, i) => {
      console.log(key.cost)
      return (
                <View style={{marginTop: -8, marginBottom: 0}}>
                  <RoundedText 
                  text={key.cost}
                  width={0.9*deviceW}
                  separatorWidth={0.8*deviceW}
                  height={360}
                  backgroundColor= {'grey'}
                  borderTopLeftRadius={0}         
                  borderTopRightRadius={0}
                  borderBottomLeftRadius={0}   // Rounded border
                  borderBottomRightRadius={0}  // Rounded border
                  
                  />
                </View>
              );
        })
    );
  }

  render() {

    return (
      <View>
        <View style={[styles.container, {position: 'absolute', top: 98, height: deviceH-98, marginTop: 0}]}>
          <ScrollView style={{paddingTop: 28}}>
            <Accordion
              sections={this.state.itemsData}
              subItemsData={this.state.subItemsData}
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