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

        this.itemsRef = firebase.database().ref().child('listing/venue');
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
          snap.forEach((child) => {
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
            
            //tagsArray.push(child.child('tags').val());


          });

        //Stores the items array received in the dataSource for access later
          this.setState({
            dataSource: JSON.parse(JSON.stringify(items)),
          });

          //console.log(this.state.tagValue);
    
        });
      }

    componentDidMount() {
        //on launch this is store the key value pairs from firebase for populating the snap carousel
        this.listenForItems(this.itemsRef);
    }

    // _renderItem ({item, index}) {
    //     //item comes from the data source provided in the render() function
        

    //         <TouchableOpacity onPress={() => this.pressFunction}>
    //         <CardView 
    //         text={item.restaurantName} 
    //         backgroundColor={item.backgroundColor} 
    //         genre={item.genre}    
    //         open={item.open} 
    //         icon={item.icon}     
    //         index={index}
    //         tags={item.tags}
    //         waitTime={item.waitTime}
    //         itemWidth={itemWidth}
    //         />
    //         </TouchableOpacity>
    // }

    _renderItem = ({item, index}) =>
        <TouchableOpacity onPress={() => {
            this.props.dothings();
            console.log(index);
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
            />
        :
            //change this to whatever loading layout as a placeholder
            null;
            

            //console.log(this.props.dothings);

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