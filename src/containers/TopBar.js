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
  </View>
);

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: 'darkolivegreen',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'relative'
  },
  textContainer: {
    position: 'absolute',
    left: width * 0.33
  },
  topBarText: {
    alignItems: 'center',
    padding: 10,
    fontSize: 20,
    color: 'whitesmoke'
  }
});
