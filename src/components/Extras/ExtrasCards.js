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

import ExtrasCardsContent from './ExtrasCardsContent';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const itemWidth = 0.5*deviceW;
const itemHeight = 20;


export default class ExtrasCards extends Component {

    constructor(props) {
        super(props);
    }
  

    render() {

        var containerContent = this.props.extras_active?
        <ExtrasCardsContent 
        user={this.props.user}
        item={this.props.item}
        cost={this.props.cost}
        restaurant={this.props.restaurant} 
        backgroundColor={this.props.backgroundColor} 
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

AppRegistry.registerComponent('Mojo', () => ExtrasCards);