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

import RestaurantHeader from './RestaurantHeader';
import RestaurantCarousel from './RestaurantCarousel';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView, {ScrollableTabBar,} from '../custom-react-components/react-native-scrollable-tab-view';
import { ViewPager, TabbedPager } from 'react-native-viewpager-carousel'
import Carousel from 'react-native-snap-carousel';
import * as firebase from 'firebase';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const itemWidth = 0.5*deviceW;
const itemHeight = 20;


export default class MainCards extends Component {

    constructor(props) {
        super(props);
        this.itemsRef = firebase.database().ref();
        this.state = {
            dataSource: null,  
            slider1Ref: null,
            slider2Ref: null, 
            tabViewRef: null,
            currentIndex: 0,
            venue: null,      
        };
    }

        // listens for firebase realtime updates
        listenForItems(itemsRef) {
            itemsRef.on('value', (snap) => {
        
              // get children as an array
              var items = [];
              var uniquekeys = [];  
              var tempHolder = []; 
              snap.forEach((child) => {
                //populating an array with the data from Firebase
                items.push(
                    child.child('details').val().genre ? child.child('details').val().genre : 'Genre',
                );
              });
              uniquekeys = [...new Set(items)];
              for(i=0;i<uniquekeys.length;i++){
              tempHolder.push({genre: uniquekeys[i]});
              }
              console.log(tempHolder);
              
              //Stores the items array received in the dataSource for access later
              this.setState({
                  dataSource: JSON.parse(JSON.stringify(tempHolder)),
              });
            });
          }

    componentDidMount() {
        //on launch this is store the key value pairs from firebase for populating the snap carousel
        this.listenForItems(this.itemsRef.child('listing/venue'));
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
        <Text style={[{width: itemWidth, height: 36, color: '#18ACDE', alignSelf: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'Avenir', fontSize: 18, fontWeight: 'bold'}]}> {item.genre} </Text>
    </TouchableOpacity>
;


  

    render() {

        //console.log(this.state.isModalVisible);

        //setting the layout as a placeholder until the data is acquired from Firebase
         const content = this.state.dataSource ?
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

        return(
            <View style={styles.container}>
                <RestaurantHeader onPressCart={() => {Actions.cart()}}/> 
                <View style={[{alignItems: 'center'}]}>
                {content}   
                </View>
                <ScrollableTabView
                renderTabBar={() => <View/>}
                ref={(tabView) => { this.state.tabViewRef?
                this.state.tabViewRef:this.setState({ tabViewRef: tabView }); }}
                onChangeTab={(i)=> this.state.slider1Ref.snapToItem(i['i'])}
                initialPage={this.state.currentIndex}>

                {
                    this.state.dataSource?
                    this.state.dataSource.map((key, i) => {
                        var venueRef = i>0? 'venue':'venue';
                        return(
                            <RestaurantCarousel key={i} tabLabel={key['genre']} venue={venueRef} genre={key['genre']}/>
                        )
                })
                :
                <RestaurantCarousel />
                }
                                            
                </ScrollableTabView> 
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

AppRegistry.registerComponent('Mojo', () => MainCards);