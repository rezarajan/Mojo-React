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
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import CategoryItem from './CategoryItem';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

//calculating a dynamic width for the category grid item
const itemWidth = 0.5*(deviceW-24);


export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.itemsRef = firebase.database().ref();
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

        // listens for firebase realtime updates
        listenForItems(itemsRef) {
            itemsRef.on('value', (snap) => {
        
              // get children as an array
              //var items = [];
              //var uniquekeys = [];  
              var uniquekeysTags = []; 
              var keyname = [];               
              var tempHolder = []; 
              snap.forEach((child) => {
                //populating an array with the data from Firebase
                // items.push(
                //     child.child('details').val().genre ? child.child('details').val().genre : 'Genre',
                // );

                //finding tags based on the mode used for the component
                //type:venueMode or menuMode
                var tags = [];           
                tags = child.val().categories ? child.val().categories : {};
                
                //receives the value to filter the categories for
                const categoryCheck = this.props.filterforValue?this.props.filterforValue:'';

                //filters the node for the categories with the value as true
                for(var key in tags) {
                    if(tags[key] === categoryCheck) {
                        keyname.push(key);            
                    }
                }              
              });

              //uniquekeys = [...new Set(items)];              

              //creates a list of unique tags based on the tags the restaurants are
              //attached to
              uniquekeysTags = [...new Set(keyname)];              
              
              for(i=0;i<uniquekeysTags.length;i++){
              tempHolder.push({genre: uniquekeysTags[i]});
              }
              
              //Stores the items array received in the dataSource for access later
              this.setState({
                  dataSource: JSON.parse(JSON.stringify(tempHolder)),
              });
            });
          }

    componentDidMount() {
        this.listenForItems(this.itemsRef.child('listing/venue'))        
    }
  

    render() {

             const containerContent = 
             <ScrollView style={[{alignContent: 'center', marginLeft: 8, marginRight: 8}]}>
             <View  
             style={styles.categoriesGrid}>
             {
                 this.state.dataSource?
                 this.state.dataSource.map((key, i) => {
                     // TODO: change this venue to the venue picked up by GeoFire
                     var venueRef = i>0? 'venue':'venue';
                     return(
                         <TouchableOpacity 
                         key={i}
                         onPress={() => {
                             this.props.goToResults&&this.props.goToResults(venueRef, key['genre']);
                             }}>
                         <CategoryItem 
                         color={'white'}
                         backgroundColor={'rgba(24,172,222,1)'}
                         text={key['genre']} 
                         style={{borderRadius: 10, width: itemWidth, height: 100}}
                         />
                         </TouchableOpacity>
                     )
             })
             :
             <View />
             }                     
             </View>
             </ScrollView>

        return(
            <View style={styles.container}>
                <SearchHeader onPressCart={() => {Actions.cart()}}/> 
                {containerContent}
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 49,
        //alignItems: 'center'
       },
       categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})

AppRegistry.registerComponent('Mojo', () => Categories);