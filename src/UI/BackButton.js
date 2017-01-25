import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { onBackPress } from '../services';

export const BackButton = ({navigator, id}) => (
  <View style={styles.button}>
    <TouchableOpacity onPress={onBackPress.bind(null, navigator, id)}>
      <Text style={styles.Buttontext}>{'<'}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {paddingTop: 25},
      android: {paddingTop: 10}
    })
  },
  Buttontext: {
    fontSize: 20,
    color: 'whitesmoke'
  }
});
