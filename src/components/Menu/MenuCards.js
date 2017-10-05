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

import MenuCardsContent from './MenuCardsContent';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const itemWidth = 0.5*deviceW;
const itemHeight = 20;


export default class MenuCards extends Component {

    constructor(props) {
        super(props);
    }


  

    render() {

        var containerContent = this.props.menu_active?
        <MenuCardsContent 
        menu_active={this.props.menu_active}
        restaurant={this.props.restaurant} 
        backgroundColor={this.props.backgroundColor} 
        filterforValue={this.props.filterforValue} 
        setRestaurantState={this.props.setRestaurantState}
        />
        :
        this.props.changeTabs&&this.props.changeTabs();

        return(
            <View style={styles.container}> 
                {containerContent}
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

AppRegistry.registerComponent('Mojo', () => MenuCards);