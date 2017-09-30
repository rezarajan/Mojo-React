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
} from 'react-native';

import RestaurantHeader from './RestaurantHeader';
import RestaurantCarousel from './RestaurantCarousel';
import { Actions } from 'react-native-router-flux';
import ScrollableTabView from '../custom-react-components/react-native-scrollable-tab-view';
import { ViewPager, TabbedPager } from 'react-native-viewpager-carousel'


export default class MainCards extends Component {

    constructor(props) {
        super(props);
        this.data = [
            { title: 'title 1', url: 'https://www.circuscircus.com/content/dam/MGM/circus-circus-las-vegas/dining/circus-circus-restaurants-starbucks-logo.jpg' },
            { title: 'title 2', url: 'https://www.circuscircus.com/content/dam/MGM/circus-circus-las-vegas/dining/circus-circus-restaurants-starbucks-logo.jpg' },
            { title: 'title 3', url: 'https://www.circuscircus.com/content/dam/MGM/circus-circus-las-vegas/dining/circus-circus-restaurants-starbucks-logo.jpg' },
        ]
    }

    _renderTab = ({data}) => {
        return ( <Text style={[{color: '#18ACDE', alignSelf: 'center', fontFamily: 'Avenir', fontSize: 16, fontWeight: 'bold'}]}>{data.title}</Text> )
    }
    
    _renderPage = ({data}) => {
        return ( <RestaurantCarousel /> )
    }
  

    render() {

        //console.log(this.state.isModalVisible);

        return(
            <View style={styles.container}>
                <RestaurantHeader onPressCart={() => {Actions.cart()}}/> 
                {/* <ScrollableTabView>
                    <RestaurantCarousel tabLabel="Restaurants"/>
                    <RestaurantCarousel tabLabel="Cafes"/>  
                    <RestaurantCarousel tabLabel="Cafes1"/>                                                                                                                                                            
                    <RestaurantCarousel tabLabel="Cafes2"/>                                                                                                                   
                    <RestaurantCarousel tabLabel="Cafes3"/>                                                                                                                   
                    <RestaurantCarousel tabLabel="Cafes4"/>                                                                                                                   
                    <RestaurantCarousel tabLabel="Cafes5"/>                                                                                                                   
                    <RestaurantCarousel tabLabel="Cafes6"/>                                                                                                                   
                    <RestaurantCarousel tabLabel="Cafes7"/>                                                                                                                   
                    <RestaurantCarousel tabLabel="Cafes8"/>                                                                                                                   
                    <RestaurantCarousel tabLabel="Cafes9"/>                                                                                                                   
                    <RestaurantCarousel tabLabel="Cafes10"/>                                                                                                                   
                    <RestaurantCarousel tabLabel="Cafes11"/>                                                                                                                   
                    <RestaurantCarousel tabLabel="Cafes12"/>                                                                                                                   
                </ScrollableTabView> */}
                <TabbedPager
                    data={this.data}
                    renderTab={this._renderTab}
                    renderPage={this._renderPage}
                />
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
       },
})

AppRegistry.registerComponent('Mojo', () => MainCards);