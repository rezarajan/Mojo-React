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
import {Dimensions} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import * as firebase from 'firebase';
import CardView from './CardView';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

//Change this to whatver width the CardView is to be
//and the chnages propogate to the render() and CardView layout
const itemWidth = 0.7*deviceW;

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class ResturantCarousel extends Component {


    constructor (props) {
        super(props);

        this.pressFunction = this.pressFunction.bind(this);

        this.itemsRef = firebase.database().ref();
        this.state = {
            dataSource: null,
            tagValue: [],
            open: 'white',
            isModalVisible: false,            
        };
    }

    pressFunction() {
        //this.setState({ isModalVisible: true });
        console.log('Card Clicked');
        
    }

    // listens for firebase realtime updates
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
    
          // get children as an array
          var items = [];
          var tagsArray = [];
          var keyItems = [];  
          var keyname = [];   
          var uniquekeys = [];   
          snap.forEach((child) => {

            //populating an array with the data from Firebase
            items.push({
              //title: child.val().title,
              _key: child.key,
              restaurantName: child.val().restaurant ? child.val().restaurant : 'Restaurant Name',
              backgroundColor: child.val().color ? child.val().color : 'aliceblue',
              genre: child.val().genre ? child.val().genre : 'Genre',
              open: child.val().open ? child.val().open : 'No Times',
              icon: child.val().icon ? child.val().icon : '../../images/mojomonkey.png',
              tags: child.val().tags ? child.val().tags : {},
              waitTime: child.val().waittime ? child.val().waittime : 'Unknown',
            });

            //This operations provides the keys of any object specified, and only for the
            //level defined (does not give the kes for children of children unless specified)
            //var keysObject1 = Object.keys(child.child('tags').val());

            //Receives the tag information from Firebase to do a custom filter which works like a deep query later
            //This information would be used for filtering item categories to populate the restaurant menu
            var keysObject = [];
            keysObject = child.val().tags ? child.val().tags : {};

            // This function find the key(s) for a specific value, rather than finding the value for key
            keysWorker = (value, keyholder) => {
                var object = keyholder;
                return Object.keys(object).find(key => object[key] === value);
              };

            //For the case when the tag is undefined it would just name the key "Undefined"
            var currentkey = keysWorker("main", keysObject)? keysWorker("main", keysObject): "Undefined";
            //cretaes an array of items with the main key tags for the particular items from Firebase
            keyname.push(currentkey);

            //Appends any data(items) on particular tags to the corresponding child tag for reference later
            keyItems.push({
                [currentkey]: {[child.val().restaurant] : "true"}
            });

          });

          //Creates an array of unique tags from the keyname array to be used later for filtering
          uniquekeys = [...new Set(keyname)];

          console.log('From Parent');
          var tempCategoryHolder = [];
          var tempSortedItems = [];
          
          //Filters the keyItems object using the unique key values from the uniquekeys array
          for(index=0;index<uniquekeys.length;index++){

              //Resets the temporary array
              tempCategoryHolder = [];
              keyItems.map((key, i) => {
                  //Pushes the items of a particular category/tag to a temporary array using it's key
                  key[uniquekeys[index]]? tempCategoryHolder.push(Object.keys(key[uniquekeys[index]])): null;
              });
              
              //Creates a temporary array for a particular category/tag 
              //and populates it with the items from that category/tag
              //from the temporary array above
              for(i=0;i<tempCategoryHolder.length;i++){
                  var temp = tempCategoryHolder[i];
                  tempSortedItems[uniquekeys[index]] = {...tempSortedItems[uniquekeys[index]],[temp] : "true"}
              }          
  
          }

        //Uses a callback method to send the filtered data to the parent (RestaurantCards)
        //this.props.returnTagInfo(tempSortedItems); 

        //Stores the items array received in the dataSource for access later
          this.setState({
            dataSource: JSON.parse(JSON.stringify(items)),
          });

          console.log(this.state.dataSource);
    
        });
      }


      acquireMenu(itemsRef) {
        itemsRef.on('value', (snap) => {
    
          // get children as an array
          var items = [];
          var tagsArray = [];
          var keyItems = [];  
          var keyname = [];   
          var uniquekeys = [];   
          snap.forEach((child) => {

            //populating an array with the data from Firebase
            items.push({
              //title: child.val().title,
              _key: child.key,
              cost: child.val().cost ? child.val().cost : 0,
              quantity: child.val().quantity ? child.val().quantity : 0,
              tags: child.val().tags ? child.val().tags : {},
            });

            //This operations provides the keys of any object specified, and only for the
            //level defined (does not give the kes for children of children unless specified)
            //var keysObject1 = Object.keys(child.child('tags').val());

            //Receives the tag information from Firebase to do a custom filter which works like a deep query later
            //This information would be used for filtering item categories to populate the restaurant menu
            var keysObject = [];
            keysObject = child.val().tags ? child.val().tags : {};

            // This function find the key(s) for a specific value, rather than finding the value for key
            keysWorker = (value, keyholder) => {
                var object = keyholder;
                return Object.keys(object).find(key => object[key] === value);
              };

            //For the case when the tag is undefined it would just name the key "Undefined"
            var currentkey = keysWorker("main", keysObject)? keysWorker("main", keysObject): "Undefined";
            //cretaes an array of items with the main key tags for the particular items from Firebase
            keyname.push(currentkey);

            //Appends any data(items) on particular tags to the corresponding child tag for reference later
            keyItems.push({
                [currentkey]: {[child.key] : "true"}
            });

          });

          //Creates an array of unique tags from the keyname array to be used later for filtering
          uniquekeys = [...new Set(keyname)];

          var tempCategoryHolder = [];
          var tempSortedItems = [];
          
          //Filters the keyItems object using the unique key values from the uniquekeys array
          for(index=0;index<uniquekeys.length;index++){

              //Resets the temporary array
              tempCategoryHolder = [];
              keyItems.map((key, i) => {
                  //Pushes the items of a particular category/tag to a temporary array using it's key
                  key[uniquekeys[index]]? tempCategoryHolder.push(Object.keys(key[uniquekeys[index]])): null;
              });
              
              //Creates a temporary array for a particular category/tag 
              //and populates it with the items from that category/tag
              //from the temporary array above
              for(i=0;i<tempCategoryHolder.length;i++){
                  var temp = tempCategoryHolder[i];
                  tempSortedItems[uniquekeys[index]] = {...tempSortedItems[uniquekeys[index]],[temp] : "true"}
              }          
  
          }

        //Uses a callback method to send the filtered data to the parent (RestaurantCards)
        this.props.returnRestaurantInfo(tempSortedItems); 
    
        });
      }

    componentDidMount() {
        //on launch this is store the key value pairs from firebase for populating the snap carousel
        this.listenForItems(this.itemsRef.child('listing/venue'));
    }

    _renderItem = ({item, index}) =>
        //item comes from the data source provided in the render() function
        
        <TouchableOpacity 
        activeOpacity={0.98}
        onPress={() => {
            //checks the current index against the index of the item clicked
            this._carousel.currentIndex === index ? 
            //if index is the same then it opens the restaurant menu
            [this.props.showModal(item.restaurantName, item.backgroundColor, item.waitTime, item.icon),
            this.acquireMenu(this.itemsRef.child('menu').child(item.restaurantName).child('Items'))]
            : 
            //if index is different then it snaps to that index
            this._carousel.snapToItem(index);
                
                //console.log(index);
            }}>
            <CardView 
            text={item.restaurantName} 
            backgroundColor={item.backgroundColor} 
            genre={item.genre}    
            open={item.open} 
            icon={item.icon}     
            index={index}
            tags={item.tags}
            waitTime={item.waitTime}
            itemWidth={itemWidth}
            />
        </TouchableOpacity>
  ;

    render() {

        //setting the layout as a placeholder until the data is acquired from Firebase
        const content = this.state.dataSource ?
            <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.dataSource}
            renderItem={this._renderItem}
            sliderWidth={deviceW}
            sliderHeight={deviceH}
            itemWidth={itemWidth}
            enableMomentum={false}
            //snapOnAndroid={false}
            scrollEndDragDebounceValue={0}
            animationFunc={'timing'}
            animationOptions={{
                friction: -1,
                tension: 40,
                isInteraction: false,
                useNativeDriver: true
            }}
            />
        :
            //change this to whatever loading layout as a placeholder
            null;
            

        return(
            <View style={styles.container}> 
                {content}
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 36,

       },
         //Mojo button wrapper
        logoWrapper: {
          alignItems: 'center',
          width: deviceW/2,
          marginTop:8,
        //   marginBottom: 24,
        },
        headerBackground: {
            backgroundColor: 'white',
            //flexDirection: 'row',
            // position: 'absolute',
            // top: 0,
            // left: 0,
            width: deviceW,
            height: 98,
            borderBottomColor: 'rgba(241,241,241,1)',
            borderBottomWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
          },
          text: {
            color: 'blue',
            fontFamily: 'Avenir',
            fontSize: 16,
            textAlign: 'center'
        },
})

AppRegistry.registerComponent('Mojo', () => RestaurantCarousel);