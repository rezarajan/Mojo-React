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
import TabNavigator from '../custom-react-components/react-native-tab-navigator/TabNavigator';
import ActionButton from '../custom-react-components/react-native-circular-action-menu/ActionButton';
import SignUp from '../SignUp/SignUp';
import Name from '../SignUp/Name';
//import ActionButton from 'react-native-circular-action-menu';
import {Dimensions} from 'react-native'

import Profile from "../Settings/Profile";

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const basePx = 375

function px2dp(px) {
  return px *  deviceW / basePx
}

export default class Home extends Component {

    state= {
        selectedTab: 'globe',
        mojo_active: true,
      };

    render() {
        return(
            <View style={styles.container}>
            <TabNavigator>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'globe'}
                //title="Globe"
                //renderIcon={() => <Image source={require('../../images/tabbar/globe_inactive.png')} style={{width: px2dp(20), height: px2dp(20)}}/>}
                //renderSelectedIcon={() => <Image source={require('../../images/tabbar/globe_active.png')} style={{width: px2dp(20), height: px2dp(20)}}/>}
                //badgeText="1"     //this allows a badge popup with a number to indicate an notification
                //onPress={() => this.setState({ selectedTab: 'globe' })}
                >
                <SignUp />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'pocket'}
                //title="Pocket"
                //renderIcon={() => <Image source={require('../../images/tabbar/pocket_inactive.png')} style={{width: px2dp(25), height: px2dp(23)}}/>}
                //renderSelectedIcon={() => <Image source={require('../../images/tabbar/pocket_active.png')} style={{width: px2dp(25), height: px2dp(23)}}/>}
                //onPress={() => this.setState({ selectedTab: 'pocket' })}
                >
                <Name />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'mojo'}
                //title="Mojo"
                //renderIcon={() => <Image source={require('../../images/tabbar/mojo_inactive.png')} style={{width: px2dp(22), height: px2dp(22)}}/>}
                //renderSelectedIcon={() => <Image source={require('../../images/tabbar/mojo_active.png')} style={{width: px2dp(22), height: px2dp(22)}}/>}
                //onPress={() => this.setState({ selectedTab: 'mojo' })}
                >
                <SignUp />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'gifts'}
                //title="Gifts"
                //renderIcon={() => <Image source={require('../../images/tabbar/gifts_inactive.png')} style={{width: px2dp(26), height: px2dp(26)}}/>}
                //renderSelectedIcon={() => <Image source={require('../../images/tabbar/gifts_active.png')} style={{width: px2dp(26), height: px2dp(26)}}/>}
                //onPress={() => this.setState({ selectedTab: 'gifts' })}
                >
                <Name />
              </TabNavigator.Item>
              <TabNavigator.Item
                selected={this.state.selectedTab === 'profile'}
                //title="Profile"
                //renderIcon={() => <Image source={require('../../images/tabbar/profile_inactive.png')} style={{width: px2dp(14), height: px2dp(20)}}/>}
                //renderSelectedIcon={() => <Image source={require('../../images/tabbar/profile_active.png')} style={{width: px2dp(14), height: px2dp(20)}}/>}
                //onPress={() => this.setState({ selectedTab: 'profile' })}
                >
                <Profile />
              </TabNavigator.Item>
            </TabNavigator>
            {/* <TouchableOpacity onPress={() => {
                const mojo_active = this.state.mojo_active;
                this.setState({ selectedTab: 'mojo', mojo_active: !mojo_active });
                }} >
                {
                    //changes the source for the big mojo button on press
                this.state.mojo_active ? 
                <Image source={require('../../images/tabbar/mojo_active.png')} style={[styles.buttonWrapper, {width: px2dp(72), height: px2dp(72)}]}/> 
                : <Image source={require('../../images/tabbar/mojo_inactive.png')} style={[styles.buttonWrapper, {width: px2dp(72), height: px2dp(72)}]}/>
                }
            </TouchableOpacity> */}
                <ActionButton 
                    position='center'
                    buttonColor='transparent' 
                    icon={
                        //changes the source for the big mojo button on press
                        this.state.mojo_active ? 
                        <Image source={require('../../images/tabbar/mojo_active.png')} style={[{paddingBottom:14, width: px2dp(72), height: px2dp(72)}]}/> 
                        :<Image source={require('../../images/tabbar/mojo_inactive.png')} style={[{paddingBottom:14, width: px2dp(54), height: px2dp(54)}]}/>  
                    }
                    onPress={() => {
                    const mojo_active = this.state.mojo_active;
                    this.setState({mojo_active: !mojo_active });
                    }} 
                >
                <ActionButton.Item buttonColor='#3498db' title='globe' onPress={() => 
                    {
                        const mojo_active = this.state.mojo_active;
                        this.setState({ 
                            selectedTab: 'globe',  
                        });
                        setTimeout(() => {
                              this.setState({ mojo_active: !mojo_active  });
                        }, 50);
                    }
                    }>
                    <Image source={require('../../images/tabbar/globe_inactive.png')} style={{width: px2dp(20), height: px2dp(20)}}/>   
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#9b59b6' title='pocket' onPress={() => 
                    {
                        const mojo_active = this.state.mojo_active;
                        this.setState({ 
                            selectedTab: 'pocket', 
                        });
                        setTimeout(() => {
                              this.setState({ mojo_active: !mojo_active  });
                        }, 50);
                    }
                    }>
                    <Image source={require('../../images/tabbar/pocket_inactive.png')} style={{width: px2dp(25), height: px2dp(23)}}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title='mojo' onPress={() => 
                    {
                        const mojo_active = this.state.mojo_active;
                        this.setState({ 
                            selectedTab: 'mojo', 
                        });
                        setTimeout(() => {
                              this.setState({ mojo_active: !mojo_active  });
                        }, 50);
                    }
                    }>
                    <Image source={require('../../images/tabbar/mojo_inactive.png')} style={{width: px2dp(22), height: px2dp(22)}}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title='gifts' onPress={() => 
                    {
                        const mojo_active = this.state.mojo_active;
                        this.setState({ 
                            selectedTab: 'gifts', 
                        });
                        setTimeout(() => {
                              this.setState({ mojo_active: !mojo_active  });
                        }, 50);
                    }
                    }>
                    <Image source={require('../../images/tabbar/gifts_inactive.png')} style={{width: px2dp(26), height: px2dp(26)}}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title='profile' onPress={() => 
                    {
                        const mojo_active = this.state.mojo_active;
                        this.setState({ 
                            selectedTab: 'profile', 
                        });
                        setTimeout(() => {
                              this.setState({ mojo_active: !mojo_active  });
                        }, 50);
                    }
                    }>
                    <Image source={require('../../images/tabbar/profile_inactive.png')} style={{width: px2dp(14), height: px2dp(20)}}/>
                </ActionButton.Item>
                </ActionButton>
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