import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions
} from 'react-native';

export class ComfirmSave extends Component {
  render () {
    return (
      <View>
        <Modal>
          <View>
            <Text> Sighting successfully saved! </Text>
          </View>
        </Modal>
      </View>
    );
  }
}
