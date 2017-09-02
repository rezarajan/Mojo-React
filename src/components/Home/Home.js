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
import TabNavigator from 'react-native-tab-navigator';
import SignUp from '../SignUp/SignUp';
import Name from '../SignUp/Name';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Dimensions} from 'react-native'

const deviceW = Dimensions.get('window').width

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class Home extends Component {

    state= {
        selectedTab: 'globe'
      };

    render() {
        return(
            <TabNavigator>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'globe'}
                title="Globe"
                renderIcon={() => <Image source={require('../../images/tabbar/globe_inactive.png')} style={{width: px2dp(20), height: px2dp(20)}}/>}
                renderSelectedIcon={() => <Image source={require('../../images/tabbar/globe_active.png')} style={{width: px2dp(20), height: px2dp(20)}}/>}
                //badgeText="1"     //this allows a badge popup with a number to indicate an notification
                onPress={() => this.setState({ selectedTab: 'globe' })}>
                <SignUp />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'pocket'}
                title="Pocket"
                renderIcon={() => <Image source={require('../../images/tabbar/pocket_inactive.png')} style={{width: px2dp(25), height: px2dp(23)}}/>}
                renderSelectedIcon={() => <Image source={require('../../images/tabbar/pocket_active.png')} style={{width: px2dp(25), height: px2dp(23)}}/>}
                onPress={() => this.setState({ selectedTab: 'pocket' })}>
                <Name />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'mojo'}
                title="Mojo"
                renderIcon={() => <Image source={require('../../images/tabbar/mojo_inactive.png')} style={{width: px2dp(22), height: px2dp(22)}}/>}
                renderSelectedIcon={() => <Image source={require('../../images/tabbar/mojo_active.png')} style={{width: px2dp(22), height: px2dp(22)}}/>}
                onPress={() => this.setState({ selectedTab: 'mojo' })}>
                <Name />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'gifts'}
                title="Gifts"
                renderIcon={() => <Image source={require('../../images/tabbar/gifts_inactive.png')} style={{width: px2dp(26), height: px2dp(26)}}/>}
                renderSelectedIcon={() => <Image source={require('../../images/tabbar/gifts_active.png')} style={{width: px2dp(26), height: px2dp(26)}}/>}
                onPress={() => this.setState({ selectedTab: 'gifts' })}>
                <Name />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'profile'}
                title="Profile"
                renderIcon={() => <Image source={require('../../images/tabbar/profile_inactive.png')} style={{width: px2dp(14), height: px2dp(20)}}/>}
                renderSelectedIcon={() => <Image source={require('../../images/tabbar/profile_active.png')} style={{width: px2dp(14), height: px2dp(20)}}/>}
                onPress={() => this.setState({ selectedTab: 'profile' })}>
                <Name />
              </TabNavigator.Item>
            </TabNavigator>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
       },
})

AppRegistry.registerComponent('Mojo', () => Home);