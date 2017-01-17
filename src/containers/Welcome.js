import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export const Welcome = ({user}) => (
  <View style={styles.container}>
    <View style={styles.intro}>
      <Text style={styles.text}>Welcome to WildFind {user}</Text>
    </View>
    <View style={styles.button}><Text style={styles.text}>Explore</Text></View>
    <View style={styles.button}><Text style={styles.text}>Log Book</Text></View>
    <View style={styles.button}><Text style={styles.text}>About</Text></View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  intro: {
    marginBottom: 150
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  },
  button: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200
  }
});
