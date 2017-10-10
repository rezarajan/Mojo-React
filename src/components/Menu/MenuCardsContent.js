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

import MenuHeader from './MenuHeader';
import MenuCarousel from './MenuCarousel';
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


export default class MenuCardsContent extends Component {

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

        // listens for firebase realtime updates
        listenForItems(itemsRef) {
            itemsRef.on('value', (snap) => {
        
              // get children as an array
              //var items = [];
              //var uniquekeys = [];  
              var uniquekeysTags = []; 
              var keyname = [];               
              var tempHolder = []; 
              snap.forEach((child) => {
                //populating an array with the data from Firebase
                // items.push(
                //     child.child('details').val().genre ? child.child('details').val().genre : 'Genre',
                // );

                //finding tags based on the mode used for the component
                //type:venueMode or menuMode
                var tags = [];           
                tags = child.val().tags ? child.val().tags : {};
                
                //receives the value to filter the categories for
                const categoryCheck = this.props.filterforValue?this.props.filterforValue:'';

                //filters the node for the categories with the value as true
                for(var key in tags) {
                    if(tags[key] === categoryCheck) {
                        keyname.push(key);            
                    }
                }              
              });

              //uniquekeys = [...new Set(items)];              

              //creates a list of unique tags based on the tags the restaurants are
              //attached to
              uniquekeysTags = [...new Set(keyname)];              
              
              for(i=0;i<uniquekeysTags.length;i++){
              tempHolder.push({genre: uniquekeysTags[i]});
              }
              
              //Stores the items array received in the dataSource for access later
              this.setState({
                  dataSource: JSON.parse(JSON.stringify(tempHolder)),
              });
            });
          }

    componentDidMount() {
        this.listenForItems(this.itemsRef.child('menu').child(this.props.restaurant).child('Items'))        
    }

    _renderItem = ({item, index}) =>
    //item comes from the data source provided in the render() function
    
    <TouchableOpacity 
    activeOpacity={0.5}
    onPress={() => {
        this.state.slider1Ref.snapToItem(index);
        this.setState({currentIndex: index});
        //this.state.tabViewRef?this.state.tabViewRef.goToPage(index):null;
        //this.state.slider2Ref.snapToItem(index);
        
        }}>
        <Text style={[{width: itemWidth, height: 36, color: this.forceContrastColour, alignSelf: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'Avenir', fontSize: 18, fontWeight: 'bold'}]}> {item.genre} </Text>
    </TouchableOpacity>
;


  

    render() {

        //receives the value to filter the categories for
        const categoryCheck = this.props.filterforValue?this.props.filterforValue:'';

        //setting the layout as a placeholder until the data is acquired from Firebase
         var tabContent = this.state.dataSource ?
             <Carousel
             ref={(c) => { this.state.slider1Ref? this.state.slider1Ref: this.setState({ slider1Ref: c }); }}
             data={this.state.dataSource}
             containerCustomStyle={[{flexGrow: 0}]}
             renderItem={this._renderItem}
             sliderWidth={deviceW}
             sliderHeight={itemHeight}
             itemWidth={itemWidth}
             itemHeight={itemHeight}
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
             onSnapToItem={(slideIndex)=> {
                this.setState({currentIndex: slideIndex}),
                this.state.tabViewRef?this.state.tabViewRef.goToPage(slideIndex):null;
             }
              }
             />
         :
             //change this to whatever loading layout as a placeholder
             null;

             var containerContent = 
             <ScrollableTabView
             renderTabBar={() => <View/>}
             ref={(tabView) => { this.state.tabViewRef?
             this.state.tabViewRef:this.setState({ tabViewRef: tabView }); }}
             onChangeTab={(i)=> this.state.slider1Ref&&this.state.slider1Ref.snapToItem(i['i'])}
             initialPage={this.state.currentIndex}>

             {
                 this.state.dataSource?
                 this.state.dataSource.map((key, i) => {
                     // TODO: change this venue to the venue picked up by GeoFire
                     //var venueRef = i>0? 'venue':'venue';
                     return(
                         <MenuCarousel 
                         key={i} 
                         tabLabel={key['genre']} 
                         restaurant={this.props.restaurant} 
                         genre={key['genre']} 
                         valueToCompare={categoryCheck}
                         backgroundColor={this.props.backgroundColor}
                         goToRestaurants={(item)=> {
                            this.props.setRestaurantState&&this.props.setRestaurantState(item);
                        }}/>
                     )
             })
             :
             <View />
             }                     
             </ScrollableTabView> 

        return(
            <View style={styles.container}>
                <MenuHeader color={this.props.backgroundColor} restaurant={this.props.restaurant} onPressCart={() => {Actions.cart()}}/> 
                <View style={[{alignItems: 'center'}]}>
                {tabContent}   
                </View>
                {containerContent}
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

AppRegistry.registerComponent('Mojo', () => MenuCardsContent);