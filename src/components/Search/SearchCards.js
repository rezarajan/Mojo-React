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

import SearchHeader from './SearchHeader';
import SearchCarousel from './SearchCarousel';
import { Actions } from 'react-native-router-flux';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const itemWidth = 0.5*deviceW;
const itemHeight = 20;


export default class SearchCards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,  
            slider1Ref: null,
            slider2Ref: null, 
            tabViewRef: null,
            currentIndex: 0,
            venue: null,    
            valueToCompare: true,
            restaurant: 'Starbucks',
        };      
    }

    render() {

        //receives the value to filter the categories for
        const categoryCheck = this.props.filterforValue?this.props.filterforValue:''; 

        var searchResults = this.props.results_active?
            <SearchCarousel 
                venue={this.props.venue} 
                genre={this.props.genre} 
                valueToCompare={categoryCheck}
                goToSearch={()=> {
                   this.props.setSearchState&&this.props.setSearchState();
            }}/>
            :
            this.props.changeTabs&&this.props.changeTabs();
            ;

            // The setSearchState and changeTabs must happen separately
            // and one after the other
            // The setSearchState changes the condition for showing the
            // SearchCarousel. AFTER the next render the condition would
            // then change the tabs.
            // If this is all done in one function then the SearchCarousel 
            // would not be nullified since it becomes inactive when the
            // tab changes.
            // Making the tab change in this activity, and allowing the 
            // SearchCarousel to handle the results_active state would
            // allow for nullifying the component and then change the
            // tabs.

            // Furthermore, the nullifying is necessary so as to reset the 
            // Firebase reference listener every time the user clicks on
            // a category. Without this, the listener would be stuck on
            // the first category the user clicks on.

        return(
            <View style={styles.container}>
                <SearchHeader onPressCart={() => {Actions.cart()}}/> 
                {searchResults}
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

AppRegistry.registerComponent('Mojo', () => SearchCards);