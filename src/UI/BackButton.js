import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { onBackPress } from '../services';

export const BackButton = ({navigator, id}) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onBackPress.bind(null, navigator, id)}>
      <Text style={styles.text}>{'<'}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 0.1
  },
  button: {
    borderRadius: 5,
    borderColor: 'green',
    borderWidth: 1,
    height: 20,
    marginTop: 10,
    width: 50
  },
  text: {
    textAlign: 'center',
    fontSize: 10
  }
});
