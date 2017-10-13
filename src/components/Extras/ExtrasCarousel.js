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
    ScrollView,
} from 'react-native';
import {Dimensions} from 'react-native'
import Carousel from 'react-native-snap-carousel';
import * as firebase from 'firebase';
import CardViewExtras from './CardViewExtras';
import CheckoutButton from './CheckoutButton.js'



var Color = require('../custom-react-components/color');


const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

//Change this to whatver width the CardView is to be
//and the chnages propogate to the render() and CardView layout
const itemWidth = 320;
const itemHeight = 50;

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class ExtrasCarousel extends Component {


    constructor (props) {
        super(props);

        this.itemsRef = firebase.database().ref();
        this.contrastratio= Color(this.props.backgroundColor).dark()?'dark':'light',
        this.state = {
            itemQuantity: 1,
            dataSource: null,
            categories: null,
            categoryHolder: null,
            tagValue: [],
            extras: {},
        };
    }

    listenForItems(itemsRef) {

        var childLocation = 
        this.props.item?'correspondingItems/'+this.props.item:'correspondingItems/item'

        itemsRef.orderByChild(childLocation).equalTo(true).on('value', (snap) => {
    
          // get children as an array
          var items = [];
          var tagsArray = [];
          var keyItems = [];  
          var keyname = [];   
          var uniquekeys = [];   
          snap.forEach((child) => {

            items[child.key] = {
                ...items[child.key],
                cost: child.val().cost ? child.val().cost : 0,
                quantity: child.val().quantity ? child.val().quantity : 0,
                tags: child.val().tags ? child.val().tags : {}
            }

            // //populating an array with the data from Firebase
            // items.push({
            //   //title: child.val().title,
            //   _key: child.key,
            //   cost: child.val().cost ? child.val().cost : 0,
            //   quantity: child.val().quantity ? child.val().quantity : 0,
            //   tags: child.val().tags ? child.val().tags : {}
            // });

            //This operations provides the keys of any object specified, and only for the
            //level defined (does not give the kes for children of children unless specified)
            //var keysObject1 = Object.keys(child.child('tags').val());

            //Receives the tag information from Firebase to do a custom filter which works like a deep query later
            //This information would be used for filtering item categories to populate the restaurant menu
            var keysObject = [];
            
            //appends the tags to the keysObject variable
            keysObject = child.val().tags ? child.val().tags : {}
            
            

            // This function find the key(s) for a specific value, rather than finding the value for key
            keysWorker = (value, keyholder) => {
                var object = keyholder;
                return Object.keys(object).find(key => object[key] === value);
              };

            //For the case when the tag is undefined it would just name the key "Undefined"
            var currentkey = keysWorker("main", keysObject)? keysWorker("main", keysObject): null;
            
            //cretaes an array of items with the main key tags for the particular items from Firebase
            //if the currentkey exists for the item
            currentkey && 
            [keyname.push(currentkey),

            //Appends any data(items) on particular tags to the corresponding child tag for reference later
            keyItems.push({
                [currentkey]: {[child.key] : "true"}
            })]

          });

          //Creates an array of unique tags from the keyname array to be used later for filtering
          uniquekeys = [...new Set(keyname)];

          var tempCategoryHolder = [];
          var tempSortedItems = [];
          var tempquantityHolder = [];
          
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
          tempCategoryHolder = [];

        //Uses a callback method to send the filtered data to the parent (RestaurantCards)
        //this.props.returnExtrasInfo && this.props.returnExtrasInfo(tempSortedItems, itemName);
        
        //Stores the items array received in the dataSource for access later
        //The function() within the setState ensures that the for loop only
        //executes after the state is set
        this.setState({
            dataSource: items,
            categories: tempSortedItems
            },
            function () {
                console.log(this.state.dataSource);
                console.log(items);
                console.log(this.state.categories);

                //Loops through the tags JSON array and gets the key/value pair of restaurant identifier tags
                for (var key in this.state.categories) {
                    if (this.state.categories.hasOwnProperty(key)) {
                        tempCategoryHolder.push({category: key});
                        //console.log(this.state.dataSource[key]);
                    }
                }
                this.setState({
                    categoryHolder: tempCategoryHolder
                    });
            });


        
                // this.state.tempCategoryHolder.map((key, i) => {
                //     //category name
                //     console.log(key['category']);
                //     Object.keys(this.state.categories[key['category']]).map((keyName, j) => {
                //         //category items (e.g Hazel Shot, Milk)
                //         console.log(keyName);
                //         //category item details (e.g cost of a hazel shot)
                //         console.log(this.state.dataSource[keyName]);                        
                //     })
                // })

        //Loops through the tags JSON array and gets the key/value pair of restaurant identifier tags
        // for (var key in this.state.categories) {
        //     if (this.state.categories.hasOwnProperty(key)) {
        //         console.log(this.state.categories[key]);
        //         var tempMap = Object.keys(this.state.categories[key]);
        //         tempMap.map((keyName,i) => {
        //             console.log(this.state.dataSource[keyName]);                    
        //         })
        //         //console.log(this.state.dataSource[key]);
        //     }
        // }

            // this.state.categories.map((key, i) => {
            //     console.log(key);
            // })
    
        });
      }

    // listens for firebase realtime updates
    // listenForItems(itemsRef) {

    //     //queries only for restaurants in a particular genre
    //     //the false condition may be set to a value which gives some sort of
    //     //default placeholder

    //     //console.log('Rendered');
    //     //console.log(this.props.valueToCompare);
    //     //console.log(this.props.restaurant);

    //     var childLocation = 
    //     this.props.item?'correspondingitems/'+this.props.item:'correspondingitems/item'
        
    //     itemsRef.orderByChild(childLocation).equalTo(true).on('value', (snap) => {
    
    //       // get children as an array
    //       var items = [];
    //       var tagsArray = [];
    //       var keyItems = [];  
    //       var keyname = [];   
    //       var uniquekeys = [];   
    //       snap.forEach((child) => {

    //         //populating an array with the data from Firebase
    //         //Gets all vendor information for the main page if the component is set to vendorMode
    //         items.push({
    //           //title: child.val().title,
    //           _key: child.key,
    //           cost: child.val().cost ? child.val().cost : 0,                            
    //           descriptor: child.val().descriptor ? child.val().descriptor : 'string',                            
    //           quantity: child.val().quantity ? child.val().quantity : 0,                            
    //           //quantity: child.child('details').val().genre ? child.child('details').val().genre : 'Genre',
    //           //open could be changed to inStock or something
    //           //open: child.child('details').val().open ? child.child('details').val().open : 'No Times',
    //           //icon: child.child('details').val().icon ? child.child('details').val().icon : '../../images/mojomonkey.png',
    //           //tags: child.child('details').val().tags ? child.child('details').val().tags : {},
    //           //contrastratio: Color(child.child('details').val().color).dark()?'dark':'light',
    //         })

    //       });

    //     //Stores the items array received in the dataSource for access later
    //       this.setState({
    //         dataSource: JSON.parse(JSON.stringify(items)),
    //       });

    //       //console.log(this.state.dataSource);
    
    //     });
    //   }

    returnMainItemInfo = (quantity) => {
    
                this.setState({
                    itemQuantity: quantity
                },
                function () {
                    console.log(this.state.itemQuantity);
                    //this.updateItem && this.updateItem();
                });
            }

    returnExtraInfo = (extraName, quantity, individualCost) => {

        //Temporary holder for the item info
        var extrasHolder = 
        quantity > 0?        
        {
            //TODO: Add the total quantity of the item
            [extraName]: {
                quantity: quantity,
                cost: individualCost
            },
        }
        :
        {
            //TODO: Add the total quantity of the item
            [extraName]: {
                //removes the item from the list if the quantity is zero
                //then firebase takes care of excluding it from the upload
            },
        }

        //Setting the state using extrasHolder and any previous items
        //This allows for the same item's node to simply be updated
        //and any new items' node to be created
        this.setState({
            extras: {
                ...this.state.extras,
                ...extrasHolder
            },
        },
        function () {
            console.log(this.state.extras);
            //this.updateItem && this.updateItem();
        });
    }


    updateItem() {

                var itemInfo = {
                    quantity: this.state.itemQuantity,
                    cost: this.props.cost
                }
        
                var itemJSON = JSON.parse(JSON.stringify(itemInfo));
                var extrasData = JSON.parse(JSON.stringify(this.state.extras));
        
                //console.log(extrasData);
                // Get a key for a new Post.
                var newPostKey = firebase.database().ref().push().key;
              
                // Write the new post's data simultaneously in the posts list and the user's post list.
                var itemUpdates = {};
                var extrasUpdates = {};
                //updates['test/' + restaurantName + '/' + itemName] = cartData;
                itemUpdates['uid/' + this.props.user + '/cart/' + this.props.restaurant + '/' + newPostKey + '/' + this.props.item + '/'] = itemJSON;
                extrasUpdates['uid/' + this.props.user + '/cart/' + this.props.restaurant + '/' + newPostKey + '/' + this.props.item + '/extras/'] = extrasData;
              
                //firebase.database().ref().update(updates);
                firebase.database().ref().update(itemUpdates);
                firebase.database().ref().update(extrasUpdates);
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef.child('menu').child(this.props.restaurant?this.props.restaurant:'').child('Extras'))
    }

    render() {

        var content = this.state.categoryHolder?
        <View>
        {
            this.state.categoryHolder.map((key, i) => {
            return(
            [
            //category name
            console.log(key['category']),
            //Category Text Header
            <Text style={[{color: 'rgba(74,74,74,1)', fontSize: 14, fontWeight: 'bold', marginLeft: 4}]}> {key['category']}</Text> , 
            Object.keys(this.state.categories[key['category']]).map((keyName, j) => {
                //category items (e.g Hazel Shot, Milk)
                console.log(keyName);
                //category item details (e.g cost of a hazel shot)
                console.log(this.state.dataSource[keyName]); 
                var extraDetails = this.state.dataSource[keyName];     
                return (
                    <TouchableOpacity 
                    key={j}
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
                                    //this.props.goToRestaurants&&this.props.goToRestaurants();
                                }}>
                                <CardViewExtras 
                                text={keyName} 
                                cost={extraDetails['cost']}
                                backgroundColor={this.props.backgroundColor} 
                                contrastratio={this.contrastratio}
                                itemWidth={itemWidth}
                                itemHeight={itemHeight}
                                returnExtraInfo={this.returnExtraInfo}
                                />
                    </TouchableOpacity>
                );              
            }),
             //Separator View  for spacing on the last element
             <View style={[{height: 10}]}/>
            ]
                );
        })
        }
        </View>
        :
        null
        ;

        

            
    //     const content = this.state.dataSource ?
    //     Object.keys(this.state.dataSource).map((key, i) => {
    //         <FlatList
    //         key={i}
    //         data={this.state.dataSource}
    //         renderItem={this._renderItem}
    //         keyExtractor={(item, index) => index}
    // />
    //     })
    // :
    //     //change this to whatever loading layout as a placeholder
    //     null;

        return(
            //Alternatively the checkoutbutton may be placed outside the 
            //scrollview to make it positioned at the bottom rather than
            //after all the content
            <View style={styles.container}> 
                <ScrollView>
                {
                [
                <View style={[{marginBottom: 10}]}>
                <CardViewExtras 
                    text={'Quantity'} 
                    cost={this.props.cost}
                    minQuantity={1}                    
                    backgroundColor={this.props.backgroundColor} 
                    contrastratio={this.contrastratio}
                    itemWidth={itemWidth}
                    itemHeight={itemHeight}
                    returnMainItemInfo={this.returnMainItemInfo}
                />
                </View>,
                content,
                <CheckoutButton 
                text="+ Add to Cart" 
                onPress={() => 
                    {
                        this.updateItem();
                        this.props.goToRestaurants&&this.props.goToRestaurants();                       
                    }
                    } 
                />]
                }
                </ScrollView>
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

AppRegistry.registerComponent('Mojo', () => ExtrasCarousel);