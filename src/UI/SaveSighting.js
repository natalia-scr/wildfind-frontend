import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import * as actions from '../actions';
let { height, width } = Dimensions.get('window');
import Button from 'apsl-react-native-button';

class _SaveSighting extends Component {
  render () {
    return (
      <View>
      <Modal
        animationType={'fade'}
        visible={this.props.visible}
        onRequestClose={this.props.closeModal}
      >
          <Text>Save sighting modal</Text>
      </Modal>
      </View>
    );
  }

}

export const SaveSighting = connect(null, null)(_SaveSighting);
