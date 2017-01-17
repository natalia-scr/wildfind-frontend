import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { BackButton, ParkInfoModal } from '../UI';
import * as actions from '../actions/modal';


class List extends Component {

  handlePress (id) {
    this.props.navigator.push({id});
  }

  render () {
    return (
      <View>
        <Text>Parklist1</Text>
          <TouchableOpacity onPress={this.handlePress.bind(this, 'ParkInfo')} >
            <Text>Alexandra Park</Text>
          </TouchableOpacity>
        <BackButton navigator={this.props.navigator} id={'Welcome'} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.parks.loading,
    error: state.parks.error,
    parks: state.parks.parks,
    currentPark: state.parks.currentPark,
    modalVisible: state.modal.modalVisible
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchParks: () => {
      dispatch(actions.fetchParks());
    },
    setCurrentPark: (user, cb) => {
      dispatch(actions.setCurrentPark(user, cb));
    },
    setModalVisibility: (payload) => {
      dispatch(actions.setModalVisibility(payload));
    }
  };
};

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
  }
});

export const ParkList = connect(mapStateToProps, mapDispatchToProps)(List);
