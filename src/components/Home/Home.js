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
    StatusBar,
    TextInput,
} from 'react-native';
//import TabNavigator from 'react-native-tab-navigator';
import TabNavigator from '../custom-react-components/react-native-tab-navigator/TabNavigator';
import ActionButton from '../custom-react-components/react-native-circular-action-menu/ActionButton';
import SignUp from '../SignUp/SignUp';
import Name from '../SignUp/Name';
import RestaurantCards from '../Restaurants/RestaurantCards';
import MainCards from '../Restaurants/MainCards';
import MenuCards from '../Menu/MenuCards';

//import ActionButton from 'react-native-circular-action-menu';

import Profile from "../Settings/Profile";

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );

export default class Home extends Component {

    constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'mojo',
        subselectedTab: 'mojo',
        mojo_active: true,
      };
    }

    render() {
        return(
            <View style={styles.container}>
            <MyStatusBar backgroundColor="white" barStyle="dark-content" />
            <TabNavigator hidesTabTouch={true}>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'pocket'}
                //title="Pocket"
                renderIcon={() => <Image source={require('../../images/tabbar/OrderTracking_inactive.png')} style={{width: px2dp(24), height: px2dp(23)}}/>}
                renderSelectedIcon={() => <Image source={require('../../images/tabbar/OrderTracking_active.png')} style={{width: px2dp(24), height: px2dp(23)}}/>}
                onPress={() => this.setState({ selectedTab: 'pocket' })}
                >
                <Name />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'mojo'}
                //title="Mojo"
                renderIcon={() => <Image source={require('../../images/tabbar/MonkeyIcon_inactive.png')} style={{width: px2dp(100), height: px2dp(78), marginBottom: -32}}/>}
                renderSelectedIcon={() => <Image source={require('../../images/tabbar/MonkeyIcon_active.png')} style={{width: px2dp(100), height: px2dp(78), marginBottom: -32}}/>}
                onPress={() => this.setState({ selectedTab: 'mojo' , subselectedTab: 'mojo'})}
                >
                <TabNavigator hidesTabTouch={true}>
                  <TabNavigator.Item
                  selected={this.state.subselectedTab === 'mojo'}>
                    <MainCards setMenuState={() => {this.setState({subselectedTab: 'menu'})}}/>
                  </TabNavigator.Item>
                  <TabNavigator.Item
                  selected={this.state.subselectedTab === 'menu'}>
                    <MenuCards setRestaurantState={() => {this.setState({subselectedTab: 'mojo'})}}/>
                  </TabNavigator.Item>
                </TabNavigator>
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
})

AppRegistry.registerComponent('Mojo', () => Home);