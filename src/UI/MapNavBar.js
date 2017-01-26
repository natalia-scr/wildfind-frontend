import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
let { height, width } = Dimensions.get('window');

export const MapNavBar = ({handlePress, navigator, route, randomSearchMode, currentAnimal}) => (
  <View style={styles.navBar}>
    <View style={styles.tab} >
      <TouchableOpacity onPress={handlePress.bind(null, 'Logbook')}>
        <Text style={styles.navText}>Logbook</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.separator}>
    </View>
    <View style={styles.tab} >
      <TouchableOpacity onPress={handlePress.bind(null, 'AnimalList')} >
        <Text style={styles.navText}>Record new Sighting</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.separator}>
    </View>
    <View style={styles.tab} >
      {!randomSearchMode && currentAnimal !== null && <TouchableOpacity onPress={handlePress.bind(null, 'randomSearchMode')} >
        <Text style={styles.navText}>Record {currentAnimal.common_name}</Text>
      </TouchableOpacity> }
      {randomSearchMode && <TouchableOpacity onPress={handlePress.bind(null, 'newSightings')} >
        <Text style={styles.navText}>Get new sightings</Text>
      </TouchableOpacity> }
    </View>
  </View>
);

const styles = StyleSheet.create({
  navBar: {
    flex: 0.08,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'darkslategray',
    width: width
  },
  tab: {
    borderWidth: 0,
    borderColor: 'transparent',
    borderRightColor: 'cadetblue',
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: width * 0.3
  },
  navText: {
    color: 'cadetblue',
    fontSize: 12,
    textAlign: 'center'
  },
  separator: {
    height: 35,
    width: 1,
    backgroundColor: 'cadetblue'
  }
});
