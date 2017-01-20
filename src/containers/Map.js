import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import haversine from 'haversine';
import {SightingInfo, MapNavBar} from '../UI';
import * as actions from '../actions';

class _Map extends Component {
  constructor () {
    super();
    this.state = {
      distances: [],
      animalTarget: null
    };
  }
  componentDidMount () {
    if (this.props.animals.length === 0) {
      this.props.fetchAnimals();
    }
    if (this.props.randomSearchMode) this.props.fetchSightings(this.props.currentPark.id);
    else this.props.fetchSightingsById(this.props.currentAnimal._id);
    navigator.geolocation.watchPosition(pos => {
      const markers = this.props.markers;
      const long = +pos.coords.longitude;
      const lat = +pos.coords.latitude;
      const distances = this.props.markers.map((marker, i) => {
        const d = {latitude: lat, longitude: long};
        return {
          id: marker._id,
          animal: marker.animal_id,
          dist: haversine(d,
          {latitude: markers[i].lat_lng.latitude, longitude: markers[i].lat_lng.longitude}, {unit: 'meter'}).toFixed(0)
        };
      });
      this.setState({
        distances
      });
      if (this.props.randomSearchMode) {
        if (distances.some(a => a.dist < 10)) {
          this.onMarker();
        }
      }
    },
  error => console.warn(JSON.stringify(error)),
  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 5}
  );
  }

  onMarker () {
    const id = this.getActiveMarkerId();
    this.props.markers.forEach((marker) => {
      if (id === marker._id) {
        this.props.setCurrentAnimal(marker.animal_id);
      }
    });
    this.props.setModalVisibility(true);
  }

  getActiveMarkerId () {
    return this.state.distances.reduce((acc, a) => {
      if (a.dist < 10) {
        acc = a.id;
      }
      return acc;
    }, '');
  }

  handlePress (button, id) {

  }

  closeModal () {
    let id = this.getActiveMarkerId();
    this.props.setModalVisibility(false);
    this.props.removeMarker(id);
  }

  render () {
    const colour = this.props.randomSearchMode ? '#800000' : '#00FFFF';
    const route = this.props.randomSearchMode ? 'ParkInfo' : 'AnimalList';
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
              pinColor={colour}
              title={marker.animal_name}
              description={JSON.stringify(marker.lat_lng)}
          />
      ))}
        </MapView>

          <MapNavBar route={route} navigator={this.props.navigator} handlePress={this.handlePress} />

        {this.props.modalVisible === true && <SightingInfo
          visible={this.props.modalVisible}
          closeModal={this.closeModal.bind(this)}
          currentAnimal={this.props.currentAnimal} />
        }
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    modalVisible: state.modal.sightingInfoVisible,
    markers: state.sightings.list,
    loading: state.animals.loading,
    error: state.animals.error,
    currentPark: state.parks.currentPark,
    animals: state.animals.list,
    currentAnimal: state.animals.currentAnimal,
    randomSearchMode: state.user.randomSearchMode
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchSightings: (id) => {
      dispatch(actions.fetchSightings(id));
    },
    setModalVisibility: (payload) => {
      dispatch(actions.setSightingInfoVisibility(payload));
    },
    removeMarker: (payload) => {
      dispatch(actions.removeSighting(payload));
    },
    setCurrentAnimal: (payload) => {
      dispatch(actions.setCurrentAnimal(payload));
    },
    fetchAnimals: () => {
      dispatch(actions.fetchAnimals());
    },
    fetchSightingsById: (id) => {
      dispatch(actions.fetchSightingsById(id));
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 0.9,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
export const Map = connect(mapStateToProps, mapDispatchToProps)(_Map);
