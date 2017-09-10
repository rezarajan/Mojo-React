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
        <View style={[styles.button, 
        this.props.style, 
        {backgroundColor: this.props.backgroundColor, 
        borderColor: this.props.backgroundColor, 
        borderTopLeftRadius: this.props.borderTopLeftRadius,
        borderTopRightRadius: this.props.borderTopRightRadius,
        borderBottomLeftRadius: this.props.borderBottomLeftRadius,
        borderBottomRightRadius: this.props.borderBottomRightRadius,
        }]}>
          <Text style={[styles.text, {color: this.props.color}]}>{this.props.text}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {

    paddingHorizontal: 8,    // Horizontal padding
    paddingVertical: 4,      // Vertical padding
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginRight: 8,
    height: 70,
    shadowOpacity: 0.9,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowRadius: 1.4,
  },

  text: {
    fontFamily: 'Avenir',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});