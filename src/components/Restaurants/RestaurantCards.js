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
} from 'react-native';
//import TabNavigator from 'react-native-tab-navigator';
import Name from '../SignUp/Name';
import RestaurantHeader from './RestaurantHeader';
import RestaurantCarousel from './RestaurantCarousel';
//import ActionButton from 'react-native-circular-action-menu';
import {Dimensions} from 'react-native'
import Modal from 'react-native-modal';
import CardViewMenu from './CardViewMenu';
import { Actions } from 'react-native-router-flux';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class RestaurantCards extends Component {

    constructor(props) {
        super(props);
        this._showModal = this._showModal.bind(this);
        this._hideModal = this._hideModal.bind(this);
        this._showExtrasModal = this._showExtrasModal.bind(this);
        this.state = {
            isModalVisible: false,
            headerVisible: false,
            headerExtrasVisible: false,
            restaurantName: 'Restaurant Name',
            itemName: 'Item',
            modalColor: 'aliceblue',
            waitTime: '0 mins',
            icon: null,
            isExtrasModalVisible: false,
            sorteditems: [],
            sortedExtras: [],
            user: null,
            cart: [],
            uniqueKey: null,
          }
      }

      componentWillMount() {
          console.log('Will Mount');

          AsyncStorage.getItem('userData').then((user_data_json) => {
            let userData = JSON.parse(user_data_json);
            this.setState({
                user: userData.uid
            })
        console.log(this.state.user);
        
        });
      }



    _showModal = (restaurantName, color, time, icon) => {
        this.setState({ 
            restaurantName: restaurantName,
            modalColor: color,
            waitTime: time,
            icon: icon,
            isModalVisible: true,            
        });
        setTimeout(() => {
            this.setState({ headerVisible: true });
        }, 500);
    }
  
    _hideModal = () => {

        var timer = 0;

        //Check to see which modal(s) are visible to adjust the timing
        //for displaying the header
        this.state.isExtrasModalVisible? 
        timer = 400:timer = 0;

        //Sets the state of the second modal to false and lets it transition down
        this.setState({ 
            isExtrasModalVisible: false,
            headerVisible: false,
            headerExtrasVisible: false
        })

        //sets a delay for setting the state of the first modal 
        //so that it transitions out almost when the second modal is out
        setTimeout(() => {
            this.setState({ isModalVisible: false });
        }, timer);
    }

    _showExtrasModal = () => {
        
        this.setState({ 
            isExtrasModalVisible: true
        });

        //sets a delay for setting the state of the second modal header
        //so that it displays only when the slide transition is completed
        setTimeout(() => {
            this.setState({ headerExtrasVisible: true, });
        }, 400);
    }

    returnItemTagInfo = (tempSortedItems) => {
        //console.log('From Parent');
        this.setState({
            sorteditems: tempSortedItems
        });

        //console.log(this.state.sorteditems);  

    }

    returnRestaurantInfo = (tempSortedItems) => {
        //console.log('From Parent');
        this.setState({
            sorteditems: tempSortedItems
        });
        //console.log(this.state.sorteditems);  
    }

    returnExtrasInfo = (tempSortedItems, itemName) => {
        //console.log('From Parent');
        this.setState({
            sortedExtras: tempSortedItems,
            itemName: itemName,
        });
        //console.log(this.state.sorteditems);  
    }

    returnUniqueKey = (uniqueKey) => {
        //console.log('From Parent');
        this.setState({
            uniqueKey: uniqueKey,
        });
        //console.log(this.state.sorteditems);  
    }

    returnCartInfo = (items) => {
        console.log('From Parent');
        console.log(items)
        this.setState({
            cart: items,
        });
        console.log(this.state.cart);  
    }
  

    render() {

        //console.log(this.state.isModalVisible);

        return(
            <View style={styles.container}>
                <RestaurantHeader onPressCart={() => {Actions.cart()}}/> 
                <RestaurantCarousel 
                showModal={this._showModal} 
                returnTagInfo={this.returnItemTagInfo} 
                returnRestaurantInfo={this.returnRestaurantInfo}
                returnCartInfo={this.returnCartInfo}   
                user={this.state.user}/>
                <Modal isVisible={this.state.isModalVisible} backdropColor={'transparent'} style={{justifyContent: 'flex-start', marginTop: 0, marginBottom: -16, alignItems: 'center'}}>
                    <View>
                    <ScrollView style={{marginTop: 98}}>
                        <CardViewMenu 
                        textColor={'white'}
                        backgroundColor={this.state.modalColor} 
                        restaurantName={this.state.restaurantName}    
                        waitTime={this.state.waitTime}
                        icon={this.state.icon}
                        user={this.state.user}
                        itemWidth={0.9*deviceW}
                        itemTags={this.state.sorteditems}
                        returnExtrasInfo={this.returnExtrasInfo}
                        returnCartInfo={this.returnCartInfo}   
                        cartInfo={this.state.cart}              
                        returnUniqueKey={this.returnUniqueKey}       
                        _showExtrasModal={this._showExtrasModal}
                        modalState={this.state.isExtrasModalVisible}
                        />
                    </ScrollView>
                    <View style={{height: 90, width: deviceW,  backgroundColor:'transparent', position: 'absolute', top: 0, marginLeft:-19}}>
                        {
                            this.state.headerVisible?
                            <RestaurantHeader onPressLogo={() => {
                                    this._hideModal()
                                }}
                                onPressCart={() => {this._hideModal(), Actions.cart()}}/>
                            : null
                        } 
                    
                    </View>
                    </View>

                    <Modal isVisible={this.state.isExtrasModalVisible} backdropColor={'transparent'} style={{justifyContent: 'flex-start', marginTop: 0, marginBottom: -16, alignItems: 'center'}}>
                    <ScrollView style={{marginTop:-202, paddingTop:402}}>
                        <CardViewMenu 
                        text={'Item'} 
                        textColor={'grey'}
                        backgroundColor={'white'}                  
                        hideHeader={true}
                        restaurantName={this.state.restaurantName}    
                        waitTime={this.state.waitTime}
                        icon={this.state.icon}
                        user={this.state.user}
                        itemWidth={0.9*deviceW}
                        itemTags={this.state.sortedExtras}
                        returnCartInfo={this.returnCartInfo}   
                        cartInfo={this.state.cart}     
                        _showExtrasModal={this._showExtrasModal}
                        modalState={this.state.isExtrasModalVisible}
                        itemName={this.state.itemName}
                        uniqueKey={this.state.uniqueKey}
                        />
                    </ScrollView>
                    <View style={{height: 90, width: deviceW,  backgroundColor:'transparent', position: 'absolute', top: 0, marginLeft:-19}}>
                        {
                            this.state.headerExtrasVisible?
                            <RestaurantHeader onPressLogo={() => {
                                    this._hideModal()
                                }}
                                onPressCart={() => {this._hideModal(), Actions.cart()}}/>
                            : null
                        } 
                    
                    </View>
                </Modal>
                </Modal>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: deviceW,
        backgroundColor: 'white',

       },
         //Mojo button wrapper
        buttonWrapper: {
          backgroundColor: 'transparent',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 14,
          left: (deviceW/2) - 36,
          justifyContent: 'center',
          alignItems: 'center'
        },
        closebuttonWrapper: {
            backgroundColor: 'red',
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            left: 0,
            flex: 1,
            alignItems: 'flex-start',
            width: deviceW,
            height: 70,
          },
          profilepic: {
            width:321, 
            height:159,
            //borderColor: 'rgba(0,0,0,0.4)',
        },
})

AppRegistry.registerComponent('Mojo', () => RestaurantCards);