import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
let {height, width} = Dimensions.get('window');
import {BackButton } from '../UI';

export const TopBar = ({id, navigator, title}) => (
  <View style={styles.topBar}>
    <BackButton navigator={navigator} id={id} />
    <View style={styles.textContainer}>
      <Text style={styles.topBarText}>{title}</Text>
    </View>
    <View style={styles.button}>
    </View>
  </View>
);

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#2c9d33',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  topBarText: {
    alignItems: 'center',
    padding: 10,
    fontSize: 20,
    color: 'whitesmoke'
  },
  button: {
    height: 40,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
