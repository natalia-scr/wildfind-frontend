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
import { TopBar } from '../containers';
let { height, width } = Dimensions.get('window');

export class _ParkInfo extends Component {

  componentDidMount () {
    this.props.clearSightings();
    this.props.fetchAnimals();
  }

  handlePress (id, randomSearch) {
    this.props.selectRandomSearchMode(randomSearch);
    this.props.navigator.push({id});
  }

  render () {
    return (
      <View style={styles.container}>
        <TopBar navigator={this.props.navigator} id={'ParkList'} title={this.props.park.name} />
        <View style={styles.parkInfoContainer}>
          <Text>Park Info</Text>
          <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, 'Map', true)} >
            <Text>start exploring</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, 'AnimalList', false)} >
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
    park: state.parks.currentPark
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAnimals: () => {
      dispatch(actions.fetchAnimals());
    },
    selectRandomSearchMode: (payload) => {
      dispatch(actions.selectRandomSearchMode(payload));
    },
    clearSightings: () => {
      dispatch(actions.clearSightings());
    }
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  parkInfoContainer: {
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
