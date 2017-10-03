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
    AsyncStorage,
    FlatList,
} from 'react-native';
import {Dimensions} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import * as firebase from 'firebase';
import CardView from './CardView';

var Color = require('../custom-react-components/color');


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

//Change this to whatver width the CardView is to be
//and the chnages propogate to the render() and CardView layout
const itemWidth = 320;
const itemHeight = 90;

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class ResturantCarousel extends Component {


    constructor (props) {
        super(props);

        this.itemsRef = firebase.database().ref();
        this.state = {
            dataSource: null,
            tagValue: [],
            open: 'white',
            isModalVisible: false,            
        };
    }

    // listens for firebase realtime updates
    listenForItems(itemsRef) {
        //queries only for restaurants in a particular genre
        //the false condition may be set to a value which gives some sort of
        //default placeholder

        //console.log('Rendered');
        //console.log(this.props.valueToCompare);
        //console.log(this.props.restaurant);

        var childLocation = 
        this.props.genre?'categories/'+this.props.genre:'categories/genre'
        
        itemsRef.orderByChild(childLocation).equalTo("true").on('value', (snap) => {
    
          // get children as an array
          var items = [];
          var tagsArray = [];
          var keyItems = [];  
          var keyname = [];   
          var uniquekeys = [];   
          snap.forEach((child) => {

            //populating an array with the data from Firebase
            //Gets all vendor information for the main page if the component is set to vendorMode
            items.push({
              //title: child.val().title,
              _key: child.key,
              restaurantName: child.child('details').val().restaurant ? child.child('details').val().restaurant : 'Restaurant Name',
              backgroundColor: child.child('details').val().color ? child.child('details').val().color : 'aliceblue',
              genre: child.child('details').val().genre ? child.child('details').val().genre : 'Genre',
              open: child.child('details').val().open ? child.child('details').val().open : 'No Times',
              icon: child.child('details').val().icon ? child.child('details').val().icon : '../../images/mojomonkey.png',
              tags: child.child('details').val().tags ? child.child('details').val().tags : {},
              waitTime: child.child('details').val().waittime ? child.child('details').val().waittime : 'Unknown',
              contrastratio: Color(child.child('details').val().color).dark()?'dark':'light',
            })
            
            //Gets the restaurant menu if vendorMode is disabled
            

              //console.log(items);
              

            //note that contrastratio uses a Color class to convert the colour to
            //rgb and then determines if it is dark or light
            //this value is used by the child to set the correct contrasting colour

            //This operations provides the keys of any object specified, and only for the
            //level defined (does not give the kes for children of children unless specified)
            //var keysObject1 = Object.keys(child.child('tags').val());

            //Receives the tag information from Firebase to do a custom filter which works like a deep query later
            //This information would be used for filtering item categories to populate the restaurant menu
            //var keysObject = [];
            //keysObject = child.val().tags ? child.val().tags : {};

            // This function find the key(s) for a specific value, rather than finding the value for key
            //keysWorker = (value, keyholder) => {
            //    var object = keyholder;
            //    return Object.keys(object).find(key => object[key] === value);
            //  };

            //For the case when the tag is undefined it would just name the key "Undefined"
            //var currentkey = keysWorker("main", keysObject)? keysWorker("main", keysObject): "Undefined";
            //cretaes an array of items with the main key tags for the particular items from Firebase
            //keyname.push(currentkey);

            //Appends any data(items) on particular tags to the corresponding child tag for reference later
            // keyItems.push({
            //     [currentkey]: {[child.val().restaurant] : "true"}
            // });

          });

          //Creates an array of unique tags from the keyname array to be used later for filtering
          //uniquekeys = [...new Set(keyname)];

          //console.log('From Parent');
          //var tempCategoryHolder = [];
          //var tempSortedItems = [];
          
          //Filters the keyItems object using the unique key values from the uniquekeys array
          //for(index=0;index<uniquekeys.length;index++){
          //
          //    //Resets the temporary array
          //    tempCategoryHolder = [];
          //    keyItems.map((key, i) => {
          //        //Pushes the items of a particular category/tag to a temporary array using it's key
          //        key[uniquekeys[index]]? tempCategoryHolder.push(Object.keys(key[uniquekeys[index]])): null;
          //    });
          //    
          //    //Creates a temporary array for a particular category/tag 
          //    //and populates it with the items from that category/tag
          //    //from the temporary array above
          //    for(i=0;i<tempCategoryHolder.length;i++){
          //        var temp = tempCategoryHolder[i];
          //        tempSortedItems[uniquekeys[index]] = {...tempSortedItems[uniquekeys[index]],[temp] : "true"}
          //    }          
          //
          //}

        //Uses a callback method to send the filtered data to the parent (RestaurantCards)
        //this.props.returnTagInfo(tempSortedItems); 

        //Stores the items array received in the dataSource for access later
          this.setState({
            dataSource: JSON.parse(JSON.stringify(items)),
          });

          //console.log(this.state.dataSource);
    
        });
      }

    componentDidMount() {
        this.listenForItems(this.itemsRef.child('listing').child(this.props.venue?this.props.venue:'venue'))
    }

    _renderItem = ({item, index}) =>
        //item comes from the data source provided in the render() function
        
        <TouchableOpacity 
        activeOpacity={0.98}
        onPress={() => {
            //checks the current index against the index of the item clicked
            //this.props.changeMode? 
            //if index is the same then it opens the restaurant menu
            //this.props.changeMode()
            //: 
            //if index is different then it snaps to that index
            //console.log(this.props.venueMode);
                
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
            contrastratio={item.contrastratio}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            />
        </TouchableOpacity>
  ;

    render() {
            
        const content = this.state.dataSource ?
        <FlatList
                data={this.state.dataSource}
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index}
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
        paddingBottom: 49,
        alignItems: 'center'

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