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
    Dimensions,
    FlatList,
    ScrollView,
} from 'react-native';
import Accordion from '../custom-react-components/react-native-collapsible/Accordion';
import RoundedText from './RoundedText';
import RestaurantHeader from '../Restaurants/RestaurantHeader';
import { Actions } from 'react-native-router-flux';

const deviceW = Dimensions.get('window').width;
const deviceH = Dimensions.get('window').height;

const SECTIONS = [
  {
    title: 'First',
    content: 'Tag',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Third',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Fourth',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Fifth',
    content: 'Lorem ipsum...',
  }
];

export default class Cart extends Component {
     
  _renderHeader(section) {
    return (
      <View style={{marginTop: -28}}>
        <RoundedText 
        text={section.title} 
        width={0.9*deviceW}
        height={70}
        backgroundColor={'white'}
        borderTopLeftRadius={20}         // Rounded border
        borderTopRightRadius={20}
        borderBottomLeftRadius={0}         // Rounded border
        borderBottomRightRadius={0}/>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={{marginTop: -28, marginBottom: 28}}>
      <RoundedText 
      text={section.content}
      height={360}
      backgroundColor= {'white'}
      borderTopLeftRadius={0}         // Rounded border
      borderTopRightRadius={0}
      borderBottomLeftRadius={20}         // Rounded border
      borderBottomRightRadius={20}
      
      />
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={[styles.container, {position: 'absolute', top: 98, height: deviceH-98, marginTop: 0}]}>
          <ScrollView style={{paddingTop: 28}}>
          <Accordion
            sections={SECTIONS}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            initiallyActiveSection={1}
          />
          </ScrollView>
        </View>
        <RestaurantHeader onPressLogo={() => {
                                    Actions.home();
                                }}/>
      </View>
    );
  }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 8,
    marginTop: 56,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: deviceW,
    backgroundColor: 'rgba(250,250,250,1)'
  },
})

AppRegistry.registerComponent('Mojo', () => Cart);