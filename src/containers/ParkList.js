import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { TopBar } from './index';
import * as actions from '../actions';
let { height, width } = Dimensions.get('window');

class List extends Component {
  componentDidMount () {
    this.props.fetchParks();
  }
  handlePress (parkId, id) {
    this.props.navigator.push({id});
    this.props.setCurrentPark(parkId);
    this.props.fetchAnimals();
  }
  render () {
    return (
      <View style={styles.container}>
        <TopBar title={'Parks'} id={'Welcome'} navigator={this.props.navigator} />
        <View style={styles.parksContainer}>
          {this.props.loading === true && <View><Text>Loading parks...</Text></View>}
          {this.props.loading === false && this.props.parks.map((park, i) => {
            return <View key={i}>
              <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, park._id, 'ParkInfo')} >
                <Text>{park.name}</Text>
              </TouchableOpacity>
            </View>;
          })
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.parks.loading,
    error: state.parks.error,
    parks: state.parks.list,
    currentPark: state.parks.currentPark
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchParks: () => {
      dispatch(actions.fetchParks());
    },
    setCurrentPark: (name, id, lat_lng) => {
      dispatch(actions.setCurrentPark(name, id, lat_lng));
    },
    fetchAnimals: () => {
      dispatch(actions.fetchAnimals());
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  parksContainer: {
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

export const ParkList = connect(mapStateToProps, mapDispatchToProps)(List);
