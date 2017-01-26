import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { BackButton } from '../UI';

export const About = ({navigator}) => (
  <View style={styles.container}>
    <Text>Im About</Text>
    <BackButton navigator={navigator} id={'Welcome'} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    marginTop: 20,
    width: 200
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  },
});
