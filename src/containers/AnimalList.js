import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export class AnimalList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Im the Animal lIst component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
