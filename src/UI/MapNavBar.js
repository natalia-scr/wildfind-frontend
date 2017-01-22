import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { BackButton } from './index';

export const MapNavBar = ({handlePress, navigator, route}) => (
  <View style={styles.navBar}>
    <BackButton navigator={navigator} id={route} />
    <TouchableOpacity onPress={handlePress.bind(null, 'Logbook')}>
      <Text>Logbook</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handlePress.bind(null, 'AnimalList')} >
      <Text>Save Sighting</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  navBar: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
