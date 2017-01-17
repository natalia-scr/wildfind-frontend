import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity
} from 'react-native';

export class AnimalInfo extends Component {

  // handlePress () {
  //   this.props.closeModal;
  // }

  render () {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'fade'}
          visible={this.props.visible}
          onRequestClose={this.props.closeModal}
        >
          <Text>Im the AnimalInfo component</Text>
          <TouchableOpacity onPress={this.props.closeModal}>
            <Text>X</Text><
          /TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
