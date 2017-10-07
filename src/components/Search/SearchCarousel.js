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
import SearchCardView from './SearchCardView';

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

export default class SearchCarousel extends Component {


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

        //receives the value to filter the categories for
        const categoryCheck = this.props.valueToCompare?this.props.valueToCompare:'';

        //queries only for restaurants in a particular genre
        //the false condition may be set to a value which gives some sort of
        //default placeholder

        //console.log('Rendered');
        //console.log(this.props.valueToCompare);
        //console.log(this.props.restaurant);

        var childLocation = 
        this.props.genre?'categories/'+this.props.genre:'categories/genre'
        
        itemsRef.orderByChild(childLocation).equalTo(categoryCheck).on('value', (snap) => {
    
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

          });

          //Stores the items array received in the dataSource for access later          
          this.setState({
            dataSource: JSON.parse(JSON.stringify(items)),
          })

          //console.log(this.state.dataSource);
    
        });
      }

    componentDidMount() {
        this.listenForItems(this.itemsRef.child('listing').child(this.props.venue?this.props.venue:'venue'))
    }

    _renderItem = ({item, index}) =>
        //item comes from the data source provided in the render() function
        
        <TouchableOpacity 
        activeOpacity={0.96}
        onPress={() => {
            //checks the current index against the index of the item clicked
            //this.props.changeMode? 
            //if index is the same then it opens the restaurant menu
            //this.props.changeMode()
            //: 
            //if index is different then it snaps to that index
            //console.log(this.props.venueMode);
                
                //console.log(index);
                this.props.goToSearch&&this.props.goToSearch(item.restaurantName, item.backgroundColor);
            }}>
            <SearchCardView 
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

AppRegistry.registerComponent('Mojo', () => SearchCarousel);