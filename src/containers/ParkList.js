import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export class ParkList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Im the ParkList component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
