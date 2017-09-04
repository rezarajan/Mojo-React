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

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

const ENTRIES1 = [
    {
        title: 'Beautiful and dramatic Antelope Canyon',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'http://i.imgur.com/UYiroysl.jpg'
    },
    {
        title: 'Earlier this morning, NYC',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/UPrs1EWl.jpg'
    },
    {
        title: 'White Pocket Sunset',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: 'http://i.imgur.com/MABUbpDl.jpg'
    },
    {
        title: 'Acrocorinth, Greece',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'http://i.imgur.com/KZsmUi2l.jpg'
    },
    {
        title: 'The lone tree, majestic landscape of New Zealand',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/2nCt3Sbl.jpg'
    },
    {
        title: 'Middle Earth, Germany',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'http://i.imgur.com/lceHsT6l.jpg'
    }
];

export default class ResturantCarousel extends Component {


    constructor (props) {
        super(props);

        this.itemsRef = firebase.database().ref().child('listing/venue');
        this.state = {
            dataSource: null,
        };
    }

    // listens for firebase realtime updates
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
    
          // get children as an array
          var items = [];
          snap.forEach((child) => {
            items.push({
              //title: child.val().title,
              _key: child.key,
              restaurantName: child.val().restaurant,
            });
            console.log(child.val().restaurant);

            // itemsRef.child(child.key).on('value', (snap) => {

            //     snap.forEach((child) => {
            //         console.log('g: ' + child.val().g);
            //     });
            // });
          });

        //Stores the items array received in the dataSource for access later
          this.setState({
            dataSource: JSON.parse(JSON.stringify(items)),
          });

          console.log(this.state.dataSource);
    
        });
      }

    componentDidMount() {
        //on launch this is store the key value pairs from firebase for populating the snap carousel
        this.listenForItems(this.itemsRef);
    }

    _renderItem ({item, index}) {
        return (
            // <View style={styles.logoWrapper}>
            //     <Text style={styles.text}>{item.restaurantName}</Text>
            // </View>
            <CardView text={item.restaurantName}/>
        );
    }

    render() {
        //console.log(ENTRIES1);

        //setting the layout as a placeholder until the data is acquired from Firebase
        console.log(this.state.dataSource);
        const content = this.state.dataSource ?
            <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.dataSource}
            renderItem={this._renderItem}
            sliderWidth={deviceW}
            sliderHeight={deviceH}
            itemWidth={deviceW/2}
            />
        :
            //change this to whatever loading layout as a placeholder
            null;

        return(
            <View style={styles.container} > 
                {content}
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

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