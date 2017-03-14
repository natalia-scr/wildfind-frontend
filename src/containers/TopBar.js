import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform
} from 'react-native';
import { BackButton } from '../UI';
import LinearGradient from 'react-native-linear-gradient';

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
    alignItems: 'center',
    position: 'relative',
    paddingTop: 10,
    ...Platform.select({
      ios: {height: 70},
      android: {height: 60}
    })
  },
  topBarText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
    color: 'whitesmoke'
  },
  button: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
