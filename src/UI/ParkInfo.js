import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity
} from 'react-native';


export class ParkInfo extends Component {

  handlePress (id) {
    this.props.navigator.push({id});
  }

  render () {
    return (
      <View style={styles.container}>
          <Text>Im the Modal component</Text>
          <TouchableOpacity onPress={this.handlePress.bind(this, 'Map')} >
            <Text>start exploring</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePress.bind(this, 'AnimalList')} >
            <Text>animal </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
