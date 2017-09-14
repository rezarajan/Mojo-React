import React, {Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';
import RoundedText from './RoundedText';

const deviceW = Dimensions.get('window').width;
var foundYet = false;
var colorState;

export default class CardView extends Component {

    constructor (props) {
        super(props);

        this.itemsRef = firebase.database().ref();
        this.state = {
            dataSource: null,
            tagValue: [],
            currentRestaurantCart: [],
            open: 'white',
            isModalVisible: false,    
            selectedextras: [],    
            user: null,
        };
    }

    acquireCart(itemsRef) {
        itemsRef.on('value', (snap) => {
          var items = [];

          snap.forEach((child) => {
            var quantityObject = [];
            //populating an array with the data from Firebase for the extras menu
            items.push({
              _key: child.key,
              cost: child.val().cost ? child.val().cost : 0,
              quantity: child.val().quantity ? child.val().quantity : 0,
            });
          });

        //Uses a callback method to send the \data to the parent (RestaurantCards)
        this.props.returnCartInfo && this.props.returnCartInfo(items); 
    
        });
      }

    acquireExtras(itemsRef, itemName) {
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
              correspondingItems: child.child('correspondingItems').child(itemName).val() || !child.val().correspondingItems ? 
              child.child('correspondingItems').child(itemName).val() || !child.val().correspondingItems 
              && {tags: child.val().tags ? child.val().tags : {}}
              : 
              {},
            });

            //This operations provides the keys of any object specified, and only for the
            //level defined (does not give the kes for children of children unless specified)
            //var keysObject1 = Object.keys(child.child('tags').val());

            //Receives the tag information from Firebase to do a custom filter which works like a deep query later
            //This information would be used for filtering item categories to populate the restaurant menu
            var keysObject = [];
            
            //if the item is found under the correspondingItems node then the tags are added
            //or if the correspondingItems node does not exist then the tags are added 
            //(this is the case for when the extra corresponds to all items)
            keysObject = child.child('correspondingItems').child(itemName).val() || !child.val().correspondingItems ? 
            child.val().tags ? child.val().tags : {}
            : 
            [],
            
            

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

        //Uses a callback method to send the filtered data to the parent (RestaurantCards)
        this.props.returnExtrasInfo && this.props.returnExtrasInfo(tempSortedItems, itemName); 
    
        });
      }

      acquireSubSpace(restaurantName, itemName){

        //references the path of the restaurant item to see if the user has it in the cart or not
        //Referenced later to determine the behaviour of onPress activities
          var itemsRef = firebase.database().ref().child('uid').child(this.props.user).child('cart').child(restaurantName).child(itemName);
          var taken = false;
        itemsRef.on('value', (snap) => {
            snap.forEach((child) => {
                taken = true;
            });
        });
        return taken;
      }

      logthemAll(){
          //this uses the orderByKey method to acquire the unique push keys for each item
        var itemsRef = firebase.database().ref().child('uid').child(this.props.user).child('cart').child('Starbucks');
        itemsRef.orderByKey().on('child_added', (snap) => {
            snap.forEach((child) => {
                console.log('Key Order: ' + child.key);
                //console.log('Value Order: ' + child.child('details').val().cost);
            });
        });
      }

      createNewItem(restaurantName, itemName) {
        // main item data
        var cartData = {
            customeruid: this.props.user,
            quantity: 1,
            cost: 1,
        };
    
        // Get a key for a new Post.
        var newPostKey = firebase.database().ref().child('test').push().key;
        
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
    
        updates['uid/' + this.props.user + '/cart/' + restaurantName + '/' + itemName + '/' + newPostKey + '/details'] = cartData;
        
        firebase.database().ref().update(updates);

        this.props.returnUniqueKey(newPostKey);
      }

      removeItem(restaurantName, itemName) {
        // main item data
        var cartData = {
            customeruid: null,
            quantity: null,
            cost: null,
        };
        
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
    
        updates['uid/' + this.props.user + '/cart/' + restaurantName + '/' + itemName] = cartData;
        
        firebase.database().ref().update(updates);
      }

      updateItem(uid, restaurantName, itemName, extraname, quantity, cost) {
        var extrasData = {
            quantity: quantity,
            cost: cost,
        };
      
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var extrasUpdates = {};
        //updates['test/' + restaurantName + '/' + itemName] = cartData;
        extrasUpdates['uid/' + this.props.user + '/cart/' + restaurantName + '/' + itemName + '/' + this.props.uniqueKey + '/extras/' + extraname] = extrasData;
      
        //firebase.database().ref().update(updates);
        firebase.database().ref().update(extrasUpdates);
      }

    render() {

        var itemTagsArray = [];
        var tagKeys = [];

        //Loops through the tags JSON array and gets the key/value pair of menu item identifier tags
        for (var key in this.props.itemTags) {
            if (this.props.itemTags.hasOwnProperty(key)) {
                tagKeys = [...tagKeys, key];
                //console.log(this.props.itemTags[key]);
                Object.keys(this.props.itemTags[key]).map((keyName, i) => {
                    itemTagsArray = [...itemTagsArray, keyName];
                })
            }
        }
        
        return (
            //cretaes a background for the profile pic
            <View style={[styles.headerBackground, {backgroundColor: this.props.backgroundColor, width: this.props.itemWidth, height: this.props.itemHeight}]}>
                <View style={styles.header}>
                    { !this.props.hideHeader?
                    <View style={{flexDirection: 'row', marginBottom: -36, marginLeft: 16, alignItems: 'center'}}>
                        <View style={styles.profilepicWrap}>
                            <Image style={styles.profilepic} source={{uri:this.props.icon}} />
                        </View>
    
                        <View style={{flexDirection: 'column', marginLeft: 8}}>
                            <Text style={[styles.name]}>{this.props.restaurantName}</Text>
                            <Text style={[styles.moreinfo, {fontSize: 12, fontWeight: 'bold'}]}>Average Time to Delivery:{"\n"}{this.props.waitTime}</Text>
                        </View>
                    </View>
                    :
                    null
                    }

                    <View style={[styles.infoHolder]}>
                        
                        <Text style={[styles.moreinfo]}>{this.props.genre}</Text>

                            {/* rendering the menu items and tags */}
                            {
                                tagKeys.map((tagKey, i) => {
                                    return(
                                        [
                                            <Text key={i} style={[styles.name, {marginTop: 24, marginBottom: -16}]}>{tagKey}</Text>,
                                            <View style={styles.categoriesGrid}>
                                                {Object.keys(this.props.itemTags[tagKey]).map((keyName, j) => {
                                                    return(
                                                    foundYet = false,
                                                    this.props.cartInfo.map((cartItem, k) => {
                                                        //console.log(cartItem['_key'])
                                                        //console.log(keyName)

                                                        !foundYet?
                                                        cartItem['_key'] === keyName?
                                                        [colorState = 'grey', foundYet = true] : colorState = 'white'
                                                        :
                                                        null

                                                    }),


                                                        
                                                        <View key={j}> 
                                                            <TouchableOpacity 
                                                            onPress={ () => {
                                                                //Checks to see which modal state it is in to assess which functions to execute on button press
                                                                !this.props.modalState?
                                                                    [this.acquireExtras(this.itemsRef.child('menu').child(this.props.restaurantName).child('Extras'), keyName),
                                                                    this.acquireCart(
                                                                    this.itemsRef.child('uid')
                                                                    .child(this.props.user)
                                                                    .child('cart').child(this.props.restaurantName)
                                                                    .child(keyName)
                                                                    ),
                                                                    
                                                                    //this.acquireSubSpace(this.props.restaurantName, keyName)? 
                                                                    [this.createNewItem(this.props.restaurantName, keyName),
                                                                    this.props._showExtrasModal()],
                                                                    ]
                                                                    :
                                                                    [console.log('Extras Modal'),
                                                                    this.updateItem(this.props.itemName, this.props.restaurantName, this.props.itemName, keyName, 1, 1),
                                                                    {/* colorState === 'white'?
                                                                    this.updateItem(this.props.itemName, this.props.restaurantName, this.props.itemName, keyName, 1, 1)
                                                                    :
                                                                    this.updateItem(this.props.itemName, this.props.restaurantName, this.props.itemName, keyName, null, null) */}
                                                                    ]
                                                                }} 
                                                            activeOpacity={0.9}>
                                                            <RoundedText 
                                                            text={keyName}
                                                            color='#FFFFFF'
                                                            backgroundColor={colorState}
                                                            style={{borderRadius: 19, width: 72, height: 72}}
                                                            />
                                                            <Text 
                                                            style={[
                                                                styles.moreinfo, 
                                                                {
                                                                    width: 72,
                                                                    marginTop: 8, 
                                                                    marginBottom: 8,
                                                                    fontSize: 12, 
                                                                    color: this.props.textColor,
                                                                    fontWeight: 'normal',
                                                                    alignItems: 'center',
                                                                    justifyContent:'center',
                                                                    textAlign: 'center',
                                                                }
                                                                ]}>
                                                            {keyName}
                                                            </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    
                                                    )
                                                    
                                                })}
                                            </View>
                                        ]
                                    );
                                })
                                
                            }                            
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerBackground: {
        alignItems: 'stretch',
        marginTop:8,
        borderRadius: 32,
        shadowOffset:{  width: 0,  height: 4,  },
        shadowColor: 'rgba(137,134,134,0.5)',
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 1,
    },
    header: {
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'transparent',
        marginTop: 16,
    },
    profilepicWrap : {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        width: 64,
        height: 64,
        borderRadius: 100,
        //borderColor: 'rgba(0,0,0,0.4)',
        //borderWidth: 4,
        //backgroundColor: 'white',
    },
    profilepic: {
        flex: 1,
        height: null,
        width: null,
        alignSelf: 'stretch',
        borderRadius: 32,
        //borderColor: 'white',
        borderWidth: 0,
    },
    infoHolder: {
        marginTop: 24, 
        marginLeft: 16,
        marginRight: 16,
    },
    mainInfo: {
        justifyContent: 'space-between', 
        flexDirection: 'row',
    },
    name: {
        //width: 136,
        fontSize: 16,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        color: 'white',
    },
    openIndicator: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Avenir',
    },
    moreinfo: {
        alignSelf: 'flex-start',
        fontSize: 14,
        color: 'white',
        fontWeight: '300',
        fontFamily: 'Avenir',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        justifyContent: 'space-between',
    },
});
