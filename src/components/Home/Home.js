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
        selectedTab: 'home'
      };

    render() {
        return(
            <TabNavigator>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'home'}
                title="Home"
                renderIcon={() => <Icon name="home" size={px2dp(22)} color="#666"/>}
                renderSelectedIcon={() => <Icon name="home" size={px2dp(22)} color="#3496f0"/>}
                badgeText="1"
                onPress={() => this.setState({ selectedTab: 'home' })}>
                <SignUp />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'profile'}
                title="Profile"
                renderIcon={() => <Icon name="user" size={px2dp(22)} color="#666"/>}
                renderSelectedIcon={() => <Icon name="user" size={px2dp(22)} color="#3496f0"/>}
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