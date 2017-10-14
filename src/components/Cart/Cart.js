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
import Swipeable from 'react-native-swipeable';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

export default class Cart extends Component {

  constructor(props) {
    super(props);

    this.itemsRef = firebase.database().ref();
    this.state = {
        itemsData: [],
        subItemsData: [],
        user: null,
        isSwiping: false,
      }
  }

  componentWillMount() {

    AsyncStorage.getItem('userData').then((user_data_json) => {
      let userData = JSON.parse(user_data_json);
      this.setState({
          user: userData.uid
      })
      console.log(this.state.user)
      this.listenForItems(this.itemsRef.child('uid').child(this.state.user).child('cart'));
  
  });
}

listenForItems(itemsRef){
    //this uses the orderByKey method to acquire the unique push keys for each item
  var restaurantItems = [];
  var items = [];
  itemsRef.orderByKey().on('value', (snap) => {

    //Resets the state of itemsData for the case that the node is updated in real time
    //This function, since asynchronous, must hold this function to reset the state of
    //itemsData
    this.setState({
      itemsData: [],
    });
      snap.forEach((child) => {
        //Just like the statement above, this is resetting the state of the items for
        //a realtime update
        items = [];
        
          itemsRef.child(child.key).orderByKey().on('child_added', (snap) => {
            snap.forEach((subChild) => {
                //populating an array with the data from Firebase
                items.push({
                  itemName: subChild.key,
                  quantity: subChild.val().quantity ? subChild.val().quantity:1,                  
                  cost: subChild.val().cost ? subChild.val().cost:0
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

  render() {

    const content = this.state.itemsData&&this.state.subItemsData?
    <ScrollView 
    horizontal={false}
    scrollEnabled={!this.state.isSwiping}>
    {
      this.state.itemsData.map((key, i) => {
        return(
          [
            <View style={styles.heading}>
              <Text style={[styles.text, {color: 'rgba(74,74,74,1)'}]}>
              {key['restaurantName']}
              </Text>
              <Text style={[styles.text, {color: 'rgba(74,74,74,1)'}]}>
              $0.00
              </Text>
            </View>
            ,
            this.state.subItemsData[i].map((subKey, j) => {
              return (
                <Swipeable
                key={j}
                onSwipeStart={() => this.setState({isSwiping: true})}
                onSwipeRelease={() => this.setState({isSwiping: false})}
                rightButtonWidth={76}
                leftContent={(
                  <View style={[styles.rightButtons, {backgroundColor: 'lightskyblue'}]}>
                    <Text>Pull action</Text>
                  </View>
                )}
                rightButtons={[
                  <TouchableOpacity 
                  style={[styles.rightButtons, {backgroundColor: 'rgba(24,172,222,1)'}]}
                  activeOpacity={0.96}>
                    <Text style={[styles.text, {marginLeft: 26}]}>Edit</Text>
                  </TouchableOpacity>,
                  <TouchableOpacity 
                  style={[styles.rightButtons, {backgroundColor: 'rgba(208,2,27,1)'}]}
                  activeOpacity={0.96}>
                    <Text style={[styles.text, {marginLeft: 18}]}>Cancel</Text>
                  </TouchableOpacity>
                ]}
                onRightButtonsOpenRelease={console.log('opened')}
                onRightButtonsCloseRelease={console.log('closed')}
              >
                <View style={[styles.listItem]}>
                  <Text 
                  style={[styles.text, 
                  {color: 'rgba(74,74,74,1)', 
                  fontSize: 16, 
                  fontWeight: '600',
                  marginLeft: 28,
                  marginTop: 8,
                  }]}> 
                    {subKey['itemName']}
                  </Text>
                  <Text 
                  style={[styles.text, 
                  {color: 'rgba(155,155,155,1)', 
                  fontWeight: '600',
                  marginRight: 28,
                  marginTop: 8,
                  }]}> 
                    ${(subKey['cost']*subKey['quantity']).toFixed(2)}
                  </Text>
                </View>
                </Swipeable>
              );
            })
          ]
        );
    })
    }
    </ScrollView>           
    :
    null
    ;

    return (
      <View style={styles.container}>
        <RestaurantHeader onPressLogo={() => {
                                    Actions.home();
                                }}/>

        {content}
      </View>
    );
  }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)'
  },
  heading: {
    flexDirection: 'row',
    backgroundColor: 'rgba(248,248,248,1)',    
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 24,
    width: deviceW,
    padding: 25,
  },
  listItem: {
    flexDirection: 'row',    
    backgroundColor: 'rgba(255,255,255,1)', 
    borderColor: 'rgba(248,248,248,1)',
    borderWidth: 0.5,
    height: 78,
    justifyContent: 'space-between',    
  },
  rightButtons: {
    backgroundColor: 'rgba(255,255,255,1)', 
    alignContent: 'center',
    justifyContent: 'center',
    height: 78,
  },
  text: {
    color: 'rgba(255,255,255,1)',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 14,
},
})

AppRegistry.registerComponent('Mojo', () => Cart);