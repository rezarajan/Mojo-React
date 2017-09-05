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

export default class RoundedText extends Component {
  render() {
    return (
        <View style={[styles.button, {backgroundColor: this.props.backgroundColor, borderColor: this.props.backgroundColor}]}>
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
    marginRight: 8,
  },

  text: {
    fontFamily: 'Avenir',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});