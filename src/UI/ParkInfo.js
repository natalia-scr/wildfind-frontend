import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { BackButton } from './BackButton';

export class _ParkInfo extends Component {

  componentDidMount () {
    this.props.fetchAnimals();
  }

  handlePress (id) {
    this.props.navigator.push({id});
  }

  render () {
    return (
      <View style={styles.container}>
        <View>
          <BackButton navigator={this.props.navigator} id={'ParkList'} />
        </View>
        <View>
          <Text>Im the Modal component</Text>
          <TouchableOpacity onPress={this.handlePress.bind(this, 'Map')} >
            <Text>start exploring</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePress.bind(this, 'AnimalList')} >
            <Text>animal </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

const mapStateToProps = (state) => {
  return {
    animals: state.animals.list,
    loading: state.animals.loading,
    error: state.animals.error
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAnimals: () => {
      dispatch(actions.fetchAnimals());
    }
  };
};

export const ParkInfo = connect(mapStateToProps, mapDispatchToProps)(_ParkInfo);
