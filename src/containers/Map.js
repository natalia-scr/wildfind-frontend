import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export class Map extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text>Im the Map component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
