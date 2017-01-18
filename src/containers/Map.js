import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import haversine from 'haversine';
import {SightingInfo} from '../UI';
import * as actions from '../actions';

class _Map extends Component {
  constructor () {
    super();
    this.state = {
      dist: []
    };
  }
  componentDidMount () {
    this.props.fetchSightings(this.props.currentPark.id);
    navigator.geolocation.watchPosition(pos => {
      const markers = this.props.markers;
      const long = +pos.coords.longitude;
      const lat = +pos.coords.latitude;
      const distances = this.props.markers.map((marker, i) => {
        const dist = {latitude: lat, longitude: long};
        return {
          id: marker._id,
          animal: marker.animal_id,
          dist: haversine(dist,
          {latitude: markers[i].lat_lng.latitude, longitude: markers[i].lat_lng.longitude}, {unit: 'meter'}).toFixed(0)
        };
      });
      this.setState({
        dist: distances
      });
      this.props.setModalVisibility(distances.some(a => a.dist < 10));
    },
  error => console.warn(JSON.stringify(error)),
  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 5}
  );
  }
  setModalProps () {
    let props;
    let id = this.state.dist.reduce((acc, a) => {
      if (a.dist < 10) {
        acc = a.id;
      }
      return acc;
    }, '');
    this.props.markers.map((marker) => {
      if (id === marker._id) {
        props = marker.animal_id;
      }
    });
    return props;
  }

  closeModal () {
    let id = this.state.dist.reduce((acc, a) => {
      if (a.dist < 10) {
        acc = a.id;
      }
      return acc;
    }, '');
    this.props.setModalVisibility(false);
    this.props.removeMarker(id);
  }

  render () {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.props.currentPark.lat_lng.latitude, // 53.451562,
            longitude: this.props.currentPark.lat_lng.longitude, // -2.249320,
            latitudeDelta: 0.0082,
            longitudeDelta: 0.0081
          }}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          followUserLocation={true}
        >
          {this.props.markers.map((marker, i) => (
          <MapView.Marker
            key={i}
            coordinate={marker.lat_lng}
            title={marker.animal_name}
            description={JSON.stringify(marker.lat_lng)}
          />
      ))}
        </MapView>
        <SightingInfo
          visible={this.props.modalVisible}
          closeModal={this.closeModal.bind(this)}
          animalId={this.setModalProps()} />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    modalVisible: state.modal.modalVisible,
    markers: state.sightings.list,
    loading: state.animals.loading,
    error: state.animals.error,
    currentAnimal: state.animals.currentAnimal,
    currentPark: state.parks.currentPark
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchSightings: (id) => {
      dispatch(actions.fetchSightings(id));
    },
    setModalVisibility: (payload) => {
      dispatch(actions.setModalVisibility(payload));
    },
    removeMarker: (payload) => {
      dispatch(actions.removeSighting(payload));
    },
    setCurrentAnimal: (payload) => {
      dispatch(actions.setCurrentAnimal(payload));
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
export const Map = connect(mapStateToProps, mapDispatchToProps)(_Map);
