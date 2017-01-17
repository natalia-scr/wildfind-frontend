import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Navigator
} from 'react-native';
import Button from 'apsl-react-native-button';

export class Welcome extends Component {

handlePress (id) {
  this.props.navigator.push({id});
}

render () {
  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <Text style={styles.text}>Welcome to WildFind {this.props.user}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, 'ParkList')} ><Text style={styles.text}>Explore</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, 'Logbook')} ><Text style={styles.text}>Log Book</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, 'About')} ><Text style={styles.text}>About</Text></TouchableOpacity>
    </View>
  )
}

}

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
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 200
  }
});