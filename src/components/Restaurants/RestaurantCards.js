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
} from 'react-native';
//import TabNavigator from 'react-native-tab-navigator';
import Name from '../SignUp/Name';
import RestaurantHeader from './RestaurantHeader';
import RestaurantCarousel from './RestaurantCarousel';
//import ActionButton from 'react-native-circular-action-menu';
import {Dimensions} from 'react-native'
import Modal from 'react-native-modal';
import CardViewMenu from './CardViewMenu';


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
            modalColor: 'aliceblue',
            waitTime: '0 mins',
            icon: null,
            isExtrasModalVisible: false,
            sorteditems: [],
            sortedExtras: [],
          }
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

    returnExtrasInfo = (tempSortedItems) => {
        //console.log('From Parent');
        this.setState({
            sortedExtras: tempSortedItems
        });
        //console.log(this.state.sorteditems);  
    }
  

    render() {

        //console.log(this.state.isModalVisible);

        return(
            <View style={styles.container}>
                <RestaurantHeader /> 
                <RestaurantCarousel 
                showModal={this._showModal} 
                returnTagInfo={this.returnItemTagInfo} 
                returnRestaurantInfo={this.returnRestaurantInfo}/>
                <Modal isVisible={this.state.isModalVisible} backdropColor={'transparent'} style={{justifyContent: 'flex-start', marginTop: 0, marginBottom: -16, alignItems: 'center'}}>
                    <View>
                    <ScrollView style={{marginTop: 98}}>
                        <CardViewMenu 
                        backgroundColor={this.state.modalColor} 
                        restaurantName={this.state.restaurantName}    
                        waitTime={this.state.waitTime}
                        icon={this.state.icon}
                        itemWidth={0.9*deviceW}
                        itemTags={this.state.sorteditems}
                        returnExtrasInfo={this.returnExtrasInfo}
                        _showExtrasModal={this._showExtrasModal}
                        />
                    </ScrollView>
                    <View style={{height: 90, width: deviceW,  backgroundColor:'transparent', position: 'absolute', top: 0, marginLeft:-19}}>
                        {
                            this.state.headerVisible?
                            <RestaurantHeader onPress={() => {
                                    this._hideModal()
                                }}/>
                            : null
                        } 
                    
                    </View>
                    </View>

                    <Modal isVisible={this.state.isExtrasModalVisible} backdropColor={'transparent'} style={{justifyContent: 'flex-start', marginTop: 0, marginBottom: -16, alignItems: 'center'}}>
                    <ScrollView style={{marginTop:-202, paddingTop:402}}>
                        <CardViewMenu 
                        text={'Item'} 
                        //backgroundColor={this.state.modalColor} 
                        backgroundColor={'aliceblue'} 
                        restaurantName={this.state.restaurantName}    
                        waitTime={this.state.waitTime}
                        icon={this.state.icon}
                        itemWidth={0.9*deviceW}
                        itemTags={this.state.sortedExtras}
                        />
                    </ScrollView>
                    <View style={{height: 90, width: deviceW,  backgroundColor:'transparent', position: 'absolute', top: 0, marginLeft:-19}}>
                        {
                            this.state.headerExtrasVisible?
                            <RestaurantHeader onPress={() => {
                                    this._hideModal()
                                }}/>
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