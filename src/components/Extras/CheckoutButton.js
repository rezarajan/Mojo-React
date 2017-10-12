/**
 * Button component
 * Renders a button and calls a function passed via onPress prop once tapped
 */

import React, { Component } from 'react';
import {
  StyleSheet,       // CSS-like styles
  Text,             // Renders text
  TouchableOpacity, // Pressable container
  View              // Container component
} from 'react-native';

export default class CheckouButton extends Component {
  render({ onPress } = this.props) {
    return (
      <TouchableOpacity 
      activeOpacity={0.96}
      onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  // Button container
  button: {
    justifyContent: 'center',
    borderRadius: 50,         // Rounded border
    borderWidth: 2,           // 2 point border widht
    borderColor: 'transparent',   // White colored border
    paddingHorizontal: 70,    // Horizontal padding
    paddingVertical: 12,      // Vertical padding
    paddingBottom: 16,
    backgroundColor: 'rgba(24,172,223,1)'
  },
  // Button text
  text: {
    color: 'rgba(255,255,255,1)',
    fontWeight: 'normal',
    fontFamily: 'Avenir',
    fontSize: 14,
    textAlign: 'center'
  },
});