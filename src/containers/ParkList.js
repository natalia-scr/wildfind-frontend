import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import { TopBar } from './index';
import * as actions from '../actions';
import Popup from 'react-native-popup';

let { height, width } = Dimensions.get('window');

class List extends Component {
  componentDidMount () {
    if (this.props.parks.length === 0) {
      this.props.fetchParks();
    }
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
          <View style={styles.parksContainer}>
            {this.props.loading === true && <View><Text style={{color: 'white'}}>Loading parks...</Text></View>}
            {this.props.loading === false && this.props.parks.map((park, i) => {
              return <View key={i}>
                <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, park._id, 'ParkInfo', park.active, park.name)} >
                  <View>
                    <Image
                    source={{uri: park.img}}
                    style={styles.img}
                    >
                      <View style={styles.titleText}>
                        <Text style={styles.text}>{park.name}</Text>
                      </View>
                    </Image>
                  </View>
                </TouchableOpacity>
              </View>;
            })
          }

          </View>
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
    flex: 1,
    backgroundColor: 'rgb(235, 232, 225)'
  },
  parksContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  img: {
    height: height * 0.298,
    width: width
  },
  button: {
    height: height * 0.298,
    width: width,
    borderRadius: 5,
    marginBottom: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'whitesmoke'
  },
  titleText: {
    position: 'absolute',
    bottom: 0,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0.4)',
    padding: 10
  }
});

export const ParkList = connect(mapStateToProps, mapDispatchToProps)(List);
