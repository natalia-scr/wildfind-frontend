import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export class AnimalInfo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Im the AnimalInfo component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
