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
const { height, width } = Dimensions.get('window');
import Popup from 'react-native-popup';


class List extends Component {
  componentDidMount () {
    this.props.fetchParks();
  }
  handlePress (parkId, id, active, name) {
    if (active) {
      this.props.navigator.push({id});
      this.props.setCurrentPark(parkId);
      this.props.fetchAnimals();
    } else {
      this.popup.alert(`${name} coming soon`);
    }
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
              <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, park._id, 'ParkInfo', park.active, park.name)} >
                <Text style={styles.text}>{park.name}</Text>
              </TouchableOpacity>
            </View>;
          })
          }
        </View>
      </Image>
      <Popup ref={popup => this.popup = popup} />
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
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    height: 80,
    width: 300,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 33, 17, 0.85)'
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white'
  }
});

export const ParkList = connect(mapStateToProps, mapDispatchToProps)(List);
