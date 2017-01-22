import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
  Dimensions
} from 'react-native';

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export class ConfirmSave extends Component {
  constructor () {
    super();
    this.animatedValue = new Animated.Value(0);
    this.animatedXValue = new Animated.Value(-windowWidth);
    this.state = {
      modalShown: false,
      color: 'green',
      message: 'Success!'
    };
  }
  render () {
    return (
      <View>
        <Animated.View  style={{ transform: [{ translateY: animation }], height: 70, backgroundColor: this.state.color, position: 'absolute',left:0, top:0, right:0, justifyContent:  'center' }}>
          <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold' }}>
            { this.state.message }
          </Text>
        </Animated.View>

        <Animated.View style={{ transform: [{ translateX: this.animatedXValue }], height: 70, marginTop: windowHeight - 70, backgroundColor: 'green', position: 'absolute', left:0, top:0, width: windowWidth, justifyContent: 'center' }}>
          <Text style={{ marginLeft: 10, color: 'white', fontSize:16, fontWeight: 'bold', textAlign: 'center' }}>Success!</Text>
        </Animated.View>

      </View>
    );
  }
}
