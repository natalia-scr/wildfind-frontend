import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/modal';
import MapView from 'react-native-maps';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import haversine from 'haversine';
import {AnimalInfo} from '../UI';

class _Map extends Component {
  closeModal () {
    this.props.setModalVisibility(false);
  }
  render () {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 53.451562,
            longitude: -2.249320,
            latitudeDelta: 0.0082,
            longitudeDelta: 0.0081
          }}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          followUserLocation={true}
        >
        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.id}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          >
          </MapView.Marker>
        ))}
        </MapView>
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
export const Map = connect(mapStateToProps, mapDispatchToProps)(_Map);
