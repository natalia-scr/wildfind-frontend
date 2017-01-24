import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
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
    paddingTop: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  Buttontext: {
    fontSize: 20,
    color: 'whitesmoke'
  }
});
