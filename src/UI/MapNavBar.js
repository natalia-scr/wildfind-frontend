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
    <View style={styles.tab} >
      <TouchableOpacity onPress={handlePress.bind(null, 'Logbook')}>
        <Text>Logbook</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.tab} >
      <TouchableOpacity onPress={handlePress.bind(null, 'AnimalList')} >
        <Text>Save Sighting</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  navBar: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 1,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
