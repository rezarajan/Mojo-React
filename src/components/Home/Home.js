import React, { Component } from 'react';
import { 
    Alert, 
    AppRegistry, 
    Button, 
    StyleSheet, 
    View, 
    Dimensions,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
//import TabNavigator from 'react-native-tab-navigator';
import TabNavigator from '../custom-react-components/react-native-tab-navigator/TabNavigator';
import ActionButton from '../custom-react-components/react-native-circular-action-menu/ActionButton';
import SignUp from '../SignUp/SignUp';
import Name from '../SignUp/Name';
import RestaurantCards from '../Restaurants/RestaurantCards';
//import ActionButton from 'react-native-circular-action-menu';

import Profile from "../Settings/Profile";

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class Home extends Component {

    state= {
        selectedTab: 'mojo',
        mojo_active: true,
      };

    render() {
        return(
            <View style={styles.container}>
            <TabNavigator>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'pocket'}
                //title="Pocket"
                renderIcon={() => <Image source={require('../../images/tabbar/pocket_inactive.png')} style={{width: px2dp(25), height: px2dp(23)}}/>}
                renderSelectedIcon={() => <Image source={require('../../images/tabbar/pocket_active.png')} style={{width: px2dp(25), height: px2dp(23)}}/>}
                onPress={() => this.setState({ selectedTab: 'pocket' })}
                >
                <Name />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'mojo'}
                //title="Mojo"
                renderIcon={() => <Image source={require('../../images/tabbar/mojo_inactive.png')} style={{width: px2dp(28), height: px2dp(28)}}/>}
                renderSelectedIcon={() => <Image source={require('../../images/tabbar/mojo_active.png')} style={{width: px2dp(28), height: px2dp(28)}}/>}
                onPress={() => this.setState({ selectedTab: 'mojo' })}
                >
                <RestaurantCards />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'profile'}
                //title="Profile"
                renderIcon={() => <Image source={require('../../images/tabbar/profile_inactive.png')} style={{width: px2dp(14), height: px2dp(20)}}/>}
                renderSelectedIcon={() => <Image source={require('../../images/tabbar/profile_active.png')} style={{width: px2dp(14), height: px2dp(20)}}/>}
                onPress={() => this.setState({ selectedTab: 'profile' })}
                >
                <Profile />
              </TabNavigator.Item>
            </TabNavigator>
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
})

AppRegistry.registerComponent('Mojo', () => Home);