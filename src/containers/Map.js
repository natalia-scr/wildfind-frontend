import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  ScrollView
} from 'react-native';
import haversine from 'haversine';
import { TopBar } from './index';
import {SaveSighting, MapNavBar} from '../UI';
import * as actions from '../actions';
import Popup from 'react-native-popup';

class _Map extends Component {
  constructor (props) {
    super(props);
    this.animatedValue = new Animated.Value(-70);
    this.state = {
      distances: [],
      userLocation: {latitude: 0, longitude: 0}
    };
  }
  componentDidMount () {
    this.props.selectMapNavMode(false);
    if (this.props.animals.length === 0) {
      this.props.fetchAnimals();
    }
    if (!this.props.mapNavMode) {
      if (this.props.randomSearchMode) this.props.fetchSightings(this.props.currentPark._id);
      else this.props.fetchSightingsById(this.props.currentAnimal._id);
    }
    navigator.geolocation.watchPosition(pos => {
      const markers = this.props.markers.slice(0);
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
        distances,
        userLocation: {longitude: long.toFixed(6), latitude: lat.toFixed(6)}
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

  handlePress (id) {
    this.props.setUserLocation(this.state.userLocation);
    const userLocation = this.props.userLocation !== null ? this.props.userLocation : this.state.userLocation;
    if (id === 'randomSearchMode') {
      if (haversine(userLocation, this.props.currentPark.lat_lng, {unit: 'meter'}).toFixed(0) > 500) {
        this.popup.alert('You need to be in the park to record a Sighting');
      } else {
        this.props.setModalVisibility(true);
      }
    }
    if (id === 'newSightings') {
      this.props.clearSightings();
      this.props.fetchSightings(this.props.currentPark._id);
    }
    if (id === 'AnimalList') {
      if (haversine(userLocation, this.props.currentPark.lat_lng, {unit: 'meter'}).toFixed(0) > 500) {
        this.popup.alert('You need to be in the park to record a Sighting');
      } else {
        this.props.selectMapNavMode(true);
        this.props.navigator.push({id});
      }
    }
    if (id === 'Logbook') {
      this.props.selectMapNavMode(true);
      this.props.navigator.push({id});
    }
  }

  onMarker () {
    const id = this.getActiveMarkerId();
    this.props.markers.forEach((marker) => {
      if (id === marker._id) {
        this.props.setCurrentAnimal(marker.animal_id);
      }
    });
    this.props.setUserLocation(this.state.userLocation);
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

  closeModal () {
    let id = this.getActiveMarkerId();
    this.props.removeMarker(id);
    this.props.setModalVisibility(false);
  }
  callsaveAnimation () {
    Animated.timing(
     this.animatedValue,
      {
        toValue: 0,
        duration: 500
      }).start(this.closesaveAnimation());
  }
  closesaveAnimation () {
    setTimeout(() => {
      Animated.timing(
      this.animatedValue,
        {
          toValue: -70,
          duration: 500
        }).start();
    }, 1000);
  }

  render () {
    const colour = this.props.randomSearchMode ? '#800000' : '#00FFFF';
    const route = this.props.randomSearchMode ? 'ParkInfo' : 'AnimalList';
    return (
      <View style={styles.container}>
        <TopBar navigator={this.props.navigator} id={route} title={this.props.currentPark.name} />
          <MapView
            style={styles.map}
            mapType={'satellite'}
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
          {this.props.modalVisible === true &&
            <SaveSighting
              visible={this.props.modalVisible}
              closeModal={this.closeModal.bind(this)}
              currentAnimal={this.props.currentAnimal}
              currentMarkerId={this.getActiveMarkerId()}
              randomSearchMode={this.props.randomSearchMode}
              callsaveAnimation={this.callsaveAnimation.bind(this)}
              />}
              <MapNavBar route={route} navigator={this.props.navigator} handlePress={this.handlePress.bind(this)}
                randomSearchMode={this.props.randomSearchMode} currentAnimal={this.props.currentAnimal} />
          <Animated.View style={{ transform: [{ translateY: this.animatedValue }], height: 70, backgroundColor: 'green', position: 'absolute', left: 0, top: 0, right: 0, justifyContent: 'center' }}>
            <Text style={{ marginLeft: 10, color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                Sighting successfully saved!
            </Text>
          </Animated.View>
           <Popup ref={popup => this.popup = popup} />
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
    randomSearchMode: state.user.randomSearchMode,
    mapNavMode: state.user.mapNavMode,
    userLocation: state.user.lat_lng
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
    },
    selectMapNavMode: (payload) => {
      dispatch(actions.selectMapNavMode(payload));
    },
    setUserLocation: (payload) => {
      dispatch(actions.setUserLocation(payload));
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
  mapContainer: {
    flex: 1
  },
  map: {
    flex: 0.9,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
export const Map = connect(mapStateToProps, mapDispatchToProps)(_Map);
