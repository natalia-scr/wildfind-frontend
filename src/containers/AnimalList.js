import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions/animals';
import * as actions from '../actions/modal';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {AnimalInfo} from '../UI';

class _AnimalList extends Component {

  handlePress (visible) {
    this.props.setModalVisibility(visible);
  }

  closeModal () {
    this.props.setModalVisibility(false);
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Im the Animal lIst component</Text>
        <TouchableOpacity
          onPress={this.handlePress.bind(this, true)}>
          <Text>animal</Text>
        </TouchableOpacity>
        <AnimalInfo visible={this.props.modalVisible} closeModal={this.closeModal.bind(this)} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalVisible: state.modal.modalVisible,
    animals: state.animals.list,
    loading: state.animals.loading,
    error: state.animals.error,
    currentAnimal: state.animals.currentAnimal
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAnimals: () => {
      dispatch(actions.fetchAnimals());
    },
    setModalVisibility: (payload) => {
      dispatch(actions.setModalVisibility(payload));
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export const AnimalList = connect(mapStateToProps, mapDispatchToProps)(_AnimalList);
