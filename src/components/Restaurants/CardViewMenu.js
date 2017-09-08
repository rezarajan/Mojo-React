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

export default class CardView extends Component {

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

    acquireExtras(itemsRef) {
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
              correspondingItems: child.val().correspondingItems ? child.val().correspondingItems : {},
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
          console.log(tempSortedItems);

        //Uses a callback method to send the filtered data to the parent (RestaurantCards)
        this.props.returnExtrasInfo && this.props.returnExtrasInfo(tempSortedItems); 
    
        });
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

                    <View style={{flexDirection: 'row', marginBottom: -36, alignItems: 'center'}}>
                    <View style={styles.profilepicWrap}>
                        <Image style={styles.profilepic} source={{uri:this.props.icon}} />
                    </View>

                    <View style={{flexDirection: 'column', marginLeft: 8}}>
                        <Text style={[styles.name]}>{this.props.restaurantName}</Text>
                        <Text style={[styles.moreinfo, {fontSize: 12, fontWeight: 'bold'}]}>Average Time to Delivery:{"\n"}{this.props.waitTime}</Text>
                    </View>
                    </View>

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
                                                    return (
                                                        <View key={j}> 
                                                            <TouchableOpacity 
                                                            onPress={ () => {
                                                                                this.acquireExtras(this.itemsRef.child('menu').child(this.props.restaurantName).child('Extras'));
                                                                                this.props._showExtrasModal();
                                                                            }} 
                                                            activeOpacity={0.98}>
                                                            <RoundedText 
                                                            text={keyName}
                                                            color='#FFFFFF'
                                                            backgroundColor='rgba(255,255,255,1)'
                                                            style={{borderRadius: 19, width: 72, height: 72}}
                                                            />
                                                            <Text 
                                                            style={[
                                                                styles.moreinfo, 
                                                                {
                                                                    width: 80,
                                                                    marginTop: 8, 
                                                                    marginBottom: 8,
                                                                    fontSize: 12, 
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
                                                    );
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
        borderColor: 'rgba(0,0,0,0.4)',
        borderWidth: 4,
        backgroundColor: 'white',
    },
    profilepic: {
        flex: 1,
        height: null,
        width: null,
        alignSelf: 'stretch',
        borderRadius: 28,
        borderColor: 'white',
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
