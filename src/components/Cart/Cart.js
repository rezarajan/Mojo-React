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
import Accordion from 'react-native-collapsible/Accordion';
import RoundedText from '../Restaurants/RoundedText';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  }
];

export default class Cart extends Component {
     
  _renderHeader(section) {
    return (
      <View>
        <RoundedText text={section.title}/>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View>
        <Text>{section.content}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
      <Accordion
        sections={SECTIONS}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
      </View>
    );
  }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
})

AppRegistry.registerComponent('Mojo', () => Cart);