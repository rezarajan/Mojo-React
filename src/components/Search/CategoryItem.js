/**
 * Button component
 * Renders a button and calls a function passed via onPress prop once tapped
 */

import React, { Component } from 'react';
import {
  StyleSheet,       // CSS-like styles
  Text,             // Renders text
  View,             // Container component
  Image,
} from 'react-native';

export default class CategoryItem extends Component {
  render() {
    return (
        <View style={[styles.button, this.props.style, {backgroundColor: this.props.backgroundColor, borderColor: this.props.backgroundColor}]}>
          <Text style={[styles.text, {color: this.props.color}]}>{this.props.text}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {
    borderRadius: 6,         // Rounded border
    paddingHorizontal: 8,    // Horizontal padding
    paddingVertical: 4,      // Vertical padding
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginRight: 0,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'black',
    shadowRadius: 2,
  },

  text: {
    fontFamily: 'Avenir',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center'
  },
});