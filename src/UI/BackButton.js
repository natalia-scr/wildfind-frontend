import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { onBackPress } from '../services';
import Button from 'apsl-react-native-button';

export const BackButton = ({navigator, id}) => (
  <View>
    <Button style={styles.button} onPress={onBackPress.bind(null, navigator, id)}>
      <Text style={styles.Buttontext}>{'<'}</Text>
    </Button>
  </View>
);

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    ...Platform.select({
      ios: {paddingTop: 25},
      android: {paddingTop: 10}
    })
  },
  Buttontext: {
    fontSize: 20,
    color: 'whitesmoke',
    paddingBottom: 5
  }
});
