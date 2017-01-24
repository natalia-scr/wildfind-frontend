import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
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
          <Image
            source={require('../img/apark.jpg')}
            style={styles.background}
            resizeMode={'cover'}
          >
        <View style={styles.parksContainer}>
          {this.props.loading === true && <View><Text>Loading parks...</Text></View>}
          {this.props.loading === false && this.props.parks.map((park, i) => {
            return <View key={i}>
              <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, park._id, 'ParkInfo')} >
                <Text style={styles.text}>{park.name}</Text>
              </TouchableOpacity>
            </View>;
          })
          }
        </View>
      </Image>
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
  background: {
     flex: 1,
     width: undefined,
     height: undefined,
     backgroundColor: 'transparent',
     justifyContent: 'center',
     alignItems: 'center'
   },
  container: {
    flex: 1
  },
  parksContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 130,
    width: width - 5,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(3, 15, 1, 0.85)'
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    color: 'rgb(201, 238, 194)'
  }
});

export const ParkList = connect(mapStateToProps, mapDispatchToProps)(List);
