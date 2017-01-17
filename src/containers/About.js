/* @flow weak */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export const About = () => (
  <View style={styles.container}>
    <Text>Im About</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
