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
//import TabNavigator from 'react-native-tab-navigator';
import Name from '../SignUp/Name';
import RestaurantHeader from './RestaurantHeader';
import RestaurantCarousel from './RestaurantCarousel';
//import ActionButton from 'react-native-circular-action-menu';
import {Dimensions} from 'react-native'
import Modal from 'react-native-modal';
import CardView from './CardView';

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
            isExtrasModalVisible: false
          }
      }

    


    _showModal = () => {
        this.setState({ isModalVisible: true });
    }
  
    _hideModal = () => {

        //Sets the state of the second modal to false and lets it transition down
        this.setState({ 
        isModalExtrasVisible: false,
        });

        //sets a delay for setting the state of the first modal 
        //so that it transitions out almost when the second modal is out
        setTimeout(() => {
            this.setState({ isModalVisible: false });
        }, 200);
    }

    _showExtrasModal = () => {
        this.setState({ isModalExtrasVisible: true });
    }

    returnItemTagInfo = (uniquekeys, keyItems) => {
        console.log('From Parent');

        //Gets the data from the child
        //Filters the keyItems object using the unique key values from the uniquekeys array
        for(index=0;index<uniquekeys.length;index++){
        console.log('Tag: ' + uniquekeys[index]);
            keyItems.map((key, i) => {
            key[uniquekeys[index]]? console.log(key[uniquekeys[index]]): null;
            });
        }
    }
  

    render() {

        console.log(this.state.isModalVisible);

        return(
            <View style={styles.container}>
                <RestaurantHeader /> 
                <RestaurantCarousel showModal={this._showModal} returnTagInfo={this.returnItemTagInfo}/>
                <Modal isVisible={this.state.isModalVisible} backdropColor={'white'} style={{justifyContent: 'flex-start', marginTop: 98, alignItems: 'center'}}>
                    <TouchableOpacity onPress={this._showExtrasModal} activeOpacity={0.98}>
                    <CardView 
                    text={'Item'} 
                    backgroundColor={'green'} 
                    genre={'Coffee'}    
                    open={'Open'}    
                    waitTime={'10 mins'}
                    itemWidth={0.9*deviceW}
                    itemHeight={deviceH}
                    />
                    </TouchableOpacity>

                    <Modal isVisible={this.state.isModalExtrasVisible} backdropColor={'white'} style={{justifyContent: 'flex-start', marginTop: 134, alignItems: 'center'}}>
                    <TouchableOpacity onPress={this._hideModal} activeOpacity={0.98}>
                    <CardView 
                    text={'Item'} 
                    backgroundColor={'aliceblue'} 
                    genre={'Extras'}    
                    open={'Open'}    
                    waitTime={'10 mins'}
                    itemWidth={0.9*deviceW}
                    itemHeight={deviceH}
                    />
                    </TouchableOpacity>
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