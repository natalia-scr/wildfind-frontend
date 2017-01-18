import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { BackButton, ParkInfoModal } from '../UI';
import * as actions from '../actions';

class List extends Component {
  componentDidMount () {
    this.props.fetchParks();
  }
  handlePress (parkId, parkName, lat_lng, id) {
    this.props.navigator.push({id});
    this.props.setCurrentPark(parkName, parkId, lat_lng);
  }
  render () {
    return (
      <View>
        <BackButton navigator={this.props.navigator} id={'Welcome'} />
        {this.props.loading === true && <View><Text>Loading parks...</Text></View>}
        {this.props.loading === false && this.props.parks.map((park, i) => {
          return <View key={i}>
            <TouchableOpacity onPress={this.handlePress.bind(this, park._id, park.name, park.lat_lng, 'ParkInfo')} >
              <Text>{park.name}</Text>
            </TouchableOpacity>
          </View>;
        })
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.parks.loading,
    error: state.parks.error,
    parks: state.parks.list,
    currentPark: state.parks.currentPark,
    modalVisible: state.modal.modalVisible
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
    setModalVisibility: (payload) => {
      dispatch(actions.setModalVisibility(payload));
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
