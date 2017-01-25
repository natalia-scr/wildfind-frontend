import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
const {height, width} = Dimensions.get('window');
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
    backgroundColor: 'rgb(44, 157, 51)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    ...Platform.select({
      ios: {height: 55},
      android: {height: 40}
    })
  },
  topBarText: {
    alignItems: 'center',
    fontSize: 20,
    color: 'whitesmoke',
    ...Platform.select({
      ios: {paddingTop: 25},
      android: {paddingTop: 10}
    })
  },
  button: {
    height: 40,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
