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
        this.state = {
            entries: {ENTRIES1},
        };
    }

    _renderItem ({item, index}) {
        return (
            <View style={styles.logoWrapper}>
                <Text style={styles.text}>{item.title}</Text>
            </View>
        );
    }

    render() {
        console.log(ENTRIES1);
        return(
            <View style={styles.container} > 
                <Carousel
                ref={(c) => { this._carousel = c; }}
                data={ENTRIES1}
                renderItem={this._renderItem}
                sliderWidth={deviceW}
                sliderHeight={deviceH}
                itemWidth={deviceW/2}
                />
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