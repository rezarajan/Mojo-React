/**
 * Button component
 * Renders a button and calls a function passed via onPress prop once tapped
 */

import React, { Component } from 'react';
import {
  StyleSheet,       // CSS-like styles
  Text,             // Renders text
  TouchableOpacity, // Pressable container
  View,             // Container component
  Image,
} from 'react-native';

export default class ImageButton extends Component {
  render({ onPress } = this.props) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.button, {backgroundColor: this.props.backgroundColor, borderColor: this.props.backgroundColor, width:286}]}>
          <Text style={[styles.text, {color: this.props.color}]}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {
    flexDirection: 'row',
    borderRadius: 45,         // Rounded border
    borderWidth: 2,           // 2 point border widht
    //borderColor: 'rgba(24,172,223,1)',   // White colored border
    paddingHorizontal: 45,    // Horizontal padding
    paddingVertical: 8,      // Vertical padding
    //backgroundColor: 'rgba(24,172,223,1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  // Button text
  text: {
    //color: '#FFFFFF',
    //paddingHorizontal: 20,
    fontFamily: 'Avenir',
    fontSize: 14,
    textAlign: 'center'
  },
});