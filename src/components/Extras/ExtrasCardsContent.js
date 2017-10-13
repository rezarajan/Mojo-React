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
    ScrollView,
    AsyncStorage,
    Dimensions,
} from 'react-native';

import ExtrasHeader from './ExtrasHeader';
import ExtrasCarousel from './ExtrasCarousel';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView, {ScrollableTabBar,} from '../custom-react-components/react-native-scrollable-tab-view';
import { ViewPager, TabbedPager } from 'react-native-viewpager-carousel'
import Carousel from 'react-native-snap-carousel';
import * as firebase from 'firebase';

var Color = require('../custom-react-components/color');

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const itemWidth = 0.5*deviceW;
const itemHeight = 20;


export default class ExtrasCardsContent extends Component {

    constructor(props) {
        super(props);
        this.itemsRef = firebase.database().ref();
        this.contrastratio= Color(this.props.backgroundColor).dark()?'dark':'light';        
        //for the case where the background colour is light it forces a black colour for text
        this.forceContrastColour = this.contrastratio === 'light'?'black':this.props.backgroundColor;
        this.state = {
            dataSource: null,  
            slider1Ref: null,
            slider2Ref: null, 
            tabViewRef: null,
            currentIndex: 0,
            venue: null,    
            valueToCompare: true,
            restaurant: 'Starbucks',
        };      
    }

    render() {

        //receives the value to filter the categories for
        //const categoryCheck = this.props.filterforValue?this.props.filterforValue:'';

        //setting the layout as a placeholder until the data is acquired from Firebase
        //  var tabContent = this.state.dataSource ?
        //      <Carousel
        //      ref={(c) => { this.state.slider1Ref? this.state.slider1Ref: this.setState({ slider1Ref: c }); }}
        //      data={this.state.dataSource}
        //      containerCustomStyle={[{flexGrow: 0}]}
        //      renderItem={this._renderItem}
        //      sliderWidth={deviceW}
        //      sliderHeight={itemHeight}
        //      itemWidth={itemWidth}
        //      itemHeight={itemHeight}
        //      enableMomentum={false}
        //      //snapOnAndroid={false}
        //      scrollEndDragDebounceValue={0}
        //      animationFunc={'timing'}
        //      animationOptions={{
        //          friction: -1,
        //          tension: 40,
        //          isInteraction: false,
        //          useNativeDriver: true
        //      }}
        //      onSnapToItem={(slideIndex)=> {
        //         this.setState({currentIndex: slideIndex}),
        //         this.state.tabViewRef?this.state.tabViewRef.goToPage(slideIndex):null;
        //      }
        //       }
        //      />
        //  :
        //      //change this to whatever loading layout as a placeholder
        //      null;


        return(
            <View style={styles.container}>
                <ExtrasHeader color={this.props.backgroundColor} restaurant={this.props.restaurant} onPressCart={() => {Actions.cart()}}/> 
                <ExtrasCarousel 
                         restaurant={this.props.restaurant} 
                         user={this.props.user}
                         item={this.props.item} 
                         cost={this.props.cost}
                         backgroundColor={this.props.backgroundColor}
                         goToRestaurants={()=> {
                            this.props.setRestaurantState&&this.props.setRestaurantState();
                }}/>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //alignItems: 'center'
       },
})

AppRegistry.registerComponent('Mojo', () => ExtrasCardsContent);