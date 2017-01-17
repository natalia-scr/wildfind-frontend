import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { BackButton } from '../UI';

export class Logbook extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Im Logbook</Text>
        <BackButton navigator={this.props.navigator} id={'Welcome'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
