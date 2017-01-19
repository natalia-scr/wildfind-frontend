import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity
} from 'react-native';
import * as actions from '../actions';

class _SightingInfo extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'fade'}
          visible={this.props.visible}
          onRequestClose={this.props.closeModal}
        >
          <Text>{this.props.currentAnimal.common_name}</Text>
          <Text>hvgh</Text>
          <Text>animal</Text>
          <TouchableOpacity onPress={this.props.closeModal}>
            <Text>X</Text><
          /TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    animals: state.animals.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentAnimal: (payload) => {
      dispatch(actions.setCurrentAnimal(payload));
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export const SightingInfo = connect(mapStateToProps, mapDispatchToProps)(_SightingInfo);
