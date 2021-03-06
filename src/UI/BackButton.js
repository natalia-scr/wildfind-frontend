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
import Icon from 'react-native-vector-icons/MaterialIcons';

export const BackButton = ({navigator, id}) => (
  <View>
    <Button style={styles.button} onPress={onBackPress.bind(null, navigator, id)}>
      <Icon name='arrow-back' size={25} color={'whitesmoke'} />
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
      ios: {paddingTop: 24},
      android: {paddingTop: 10}
    })
  },
  Buttontext: {
    fontSize: 20,
    color: 'whitesmoke',
    paddingBottom: 5
  }
});
