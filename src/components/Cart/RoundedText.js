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
        width: this.props.width-16,
        height:this.props.height,
        marginLeft: 8
        }]}>
          <Text style={[styles.text, {marginTop: 16, marginBottom: 28, color: this.props.color}]}>{this.props.text}</Text>

          {/* The conditional check here allows for the detection of wheter the separator is the header separator or the content separator */}
          <View style={[{marginBottom: -10, width: this.props.separatorWidth? this.props.separatorWidth-16:this.props.width-16, height:1, backgroundColor:'rgba(226,226,226,1)', opacity: 0.6}]}/>
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
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'black',
    shadowRadius: 2,
  },

  text: {
    fontFamily: 'Avenir',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});