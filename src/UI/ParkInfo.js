import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { BackButton } from './BackButton';
let { height, width } = Dimensions.get('window');

export class _ParkInfo extends Component {

  componentDidMount () {
    this.props.fetchAnimals();
  }

  handlePress (id, randomSearch) {
    this.props.randomSearchMode(randomSearch);
    this.props.navigator.push({id});
  }

  render () {
    return (
      <View style={styles.container}>
          <BackButton navigator={this.props.navigator} id={'ParkList'} />
        <View>
          <Text>Park Info</Text>
          <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, 'Map', false)} >
            <Text>start exploring</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, 'AnimalList', true)} >
            <Text>animal </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    animals: state.animals.list,
    loading: state.animals.loading,
    error: state.animals.error,
    randomSearchMode: state.user.randomSearchMode
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAnimals: () => {
      dispatch(actions.fetchAnimals());
    },
    randomSearchMode: (payload) => {
      dispatch(actions.randomSearchMode(payload));
    }
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: height * 0.4
  },
  button: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  }
});

export const ParkInfo = connect(mapStateToProps, mapDispatchToProps)(_ParkInfo);
