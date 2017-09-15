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

  constructor(props) {
    super(props);
    this.state = {
        itemsData: [],
        user: null,
      }
  }

  findAllItems() {
    var itemsRef = firebase.database().ref().child('uid').child(this.props.user).child('cart');
      itemsRef.child(this.props.restaurantName).orderByKey().on('child_added', (snap) => {
            snap.forEach((subChild) => {
                this.setState({
                  itemsData: 
                  [
                    ...this.state.itemsData,  
                    {
                      cost: subChild.child('details').val().cost ? subChild.child('details').val().cost:0
                    }
                  ]  
                });
            });
        });
  }

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

          <View style={[{marginBottom: -10, width: this.props.width-16, height:1, backgroundColor:'rgba(226,226,226,1)', opacity: 0.6}]}/>
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