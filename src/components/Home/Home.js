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
import Categories from '../Search/Categories';
import SearchCards from '../Search/SearchCards';
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
        mainSelectedTab: 'mojo',
        searchSelectedTab: 'grid',
        searchVenue: null,
        searchCategory: null,
        mojo_active: true,
        menu_active: false,        
        results_active: false,
        restaurant: null,
        dominantColour: null,
      };
    }

    render() {
        return(
            <View style={styles.container}>
            <MyStatusBar backgroundColor="white" barStyle="dark-content" />
            <TabNavigator hidesTabTouch={true}>

              <TabNavigator.Item
                selected={this.state.selectedTab === 'search'}
                //title="Pocket"
                renderIcon={() => <Image source={require('../../images/tabbar/OrderTracking_inactive.png')} style={{width: px2dp(24), height: px2dp(23)}}/>}
                renderSelectedIcon={() => <Image source={require('../../images/tabbar/OrderTracking_active.png')} style={{width: px2dp(24), height: px2dp(23)}}/>}
                onPress={() => this.setState({ selectedTab: 'search', results_active: false})}
                >

                <TabNavigator hidesTabTouch={true}>
                  <TabNavigator.Item
                  selected={this.state.searchSelectedTab === 'grid'}>
                    <Categories 
                    filterforValue={"category"} 
                    goToResults={(venue, category) => {
                      this.setState({
                        searchVenue: venue, 
                        searchCategory: category, 
                        results_active: true,
                        searchSelectedTab: 'results'
                        })
                        }}/>                    
                  </TabNavigator.Item>
                  <TabNavigator.Item
                  selected={this.state.searchSelectedTab === 'results'}>
                    <SearchCards 
                    results_active={this.state.results_active}
                    venue={this.state.searchVenue&&this.state.searchVenue} 
                    genre={this.state.searchCategory&&this.state.searchCategory} 
                    filterforValue={"category"} 
                    setSearchState={() => {
                      this.setState({
                      results_active: false,                      
                    })
                    }}
                    changeTabs={() => {
                      this.setState({
                      searchSelectedTab: 'grid'
                    })
                    }}/> 
                  </TabNavigator.Item>
                </TabNavigator>

              </TabNavigator.Item>

              <TabNavigator.Item
                selected={this.state.selectedTab === 'mojo'}
                //title="Mojo"
                renderIcon={() => <Image source={require('../../images/tabbar/MonkeyIcon_inactive.png')} style={{width: px2dp(100), height: px2dp(78), marginBottom: -32}}/>}
                renderSelectedIcon={() => <Image source={require('../../images/tabbar/MonkeyIcon_active.png')} style={{width: px2dp(100), height: px2dp(78), marginBottom: -32}}/>}
                onPress={() => this.setState({ 
                  selectedTab: 'mojo' , 
                  menu_active: false})}
                >

                <TabNavigator hidesTabTouch={true}>
                  <TabNavigator.Item
                  selected={this.state.mainSelectedTab === 'mojo'}>
                    <MainCards 
                    filterforValue={"true"} 
                    setMenuState={(restaurant, colour) => {
                      this.setState({
                        restaurant: restaurant, 
                        dominantColour: colour, 
                        menu_active: true,
                        mainSelectedTab: 'menu'
                        })
                        }} />
                  </TabNavigator.Item>
                  <TabNavigator.Item
                  selected={this.state.mainSelectedTab === 'menu'}>
                    <MenuCards 
                    menu_active={this.state.menu_active}
                    restaurant={this.state.restaurant} 
                    backgroundColor={this.state.dominantColour} 
                    filterforValue={"main"} 
                    setRestaurantState={() => {
                      this.setState({
                        menu_active: false,
                      })
                      }}
                    changeTabs={() => {
                      this.setState({
                        mainSelectedTab: 'mojo'
                      })
                      }}
                    />
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