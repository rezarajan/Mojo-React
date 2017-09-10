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
} from 'react-native';
import Accordion from '../custom-react-components/react-native-collapsible/Accordion';
import RoundedText from './RoundedText';
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
        width={deviceW}
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
      <View style={[styles.container, {position: 'absolute', bottom: deviceH/SECTIONS.length}]}>
      <Accordion
        sections={SECTIONS}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        initiallyActiveSection={1}
      />
      </View>
    );
  }
    
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    marginTop: 56,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceW
  },
})

AppRegistry.registerComponent('Mojo', () => Cart);