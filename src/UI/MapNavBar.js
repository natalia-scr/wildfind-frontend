import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export const MapNavBar = ({handlePress, navigator, route, randomSearchMode, currentAnimal}) => (
  <View style={styles.navBar}>
    <View style={styles.tab} >
      <TouchableOpacity onPress={handlePress.bind(null, 'Logbook')}>
        <Text style={styles.navText}>Logbook</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.tab} >
      <TouchableOpacity onPress={handlePress.bind(null, 'AnimalList')} >
        <Text style={styles.navText}>Record new Sighting</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.tab} >
      {!randomSearchMode && currentAnimal !== null && <TouchableOpacity onPress={handlePress.bind(null, 'randomSearchMode')} >
        <Text style={styles.navText}>Record {currentAnimal.common_name}</Text>
      </TouchableOpacity>}
      {randomSearchMode && <TouchableOpacity onPress={handlePress.bind(null, 'newSightings')} >
        <Text style={styles.navText}>Generate New Sightings</Text>
      </TouchableOpacity>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  navBar: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkslategray'
  },
  tab: {
    borderWidth: 1,
    borderColor: 'cadetblue',
    borderRadius: 1,
    padding: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100
  },
  navText: {
    color: 'cadetblue',
    fontSize: 12
  }
});
