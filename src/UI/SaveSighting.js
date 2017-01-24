import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Animated,
  Image
} from 'react-native';
import * as actions from '../actions';
let { height, width } = Dimensions.get('window');
import Button from 'apsl-react-native-button';
import { createSighting } from '../services';

class _SaveSighting extends Component {
  constructor () {
    super();
    this.state = {
      text: '',
      count: '1'
    };
  }
  handlePress () {
    const sighting = createSighting(this.props.user, this.props.currentPark, this.props.currentAnimal, this.props.userLocation, this.state.text, this.state.count);
    this.props.saveSighting({sighting});
    this.props.closeModal('save');
    if (this.props.callsaveAnimation !== null) this.props.callsaveAnimation();
    if (!this.props.mapNavMode) this.props.removeMarker(this.props.currentMarkerId);
  }
  plusButtonPress () {
    this.setState({
      count: (+this.state.count + 1).toString()
    });
  }
  minusButtonPress () {
    if (this.state.count > 0) {
      this.setState({
        count: (+this.state.count - 1).toString()
      });
    }
  }

  render () {
    return (
      <View style={styles.sightingContainer}>
        <Modal
          animationType={'fade'}
          visible={this.props.visible}
          onRequestClose={this.props.closeModal}
        >
          <View style={styles.saveModal}>
            <View style={styles.animalInfo}>
              <Image
                style={{ height: 50, width: 50 }}
                source={{uri: this.props.currentAnimal.small_img}}
              />
              <View style={styles.animalTextContainer}>
                <Text style={{fontSize: 18}}>{this.props.currentAnimal.common_name}</Text>
                <Text style={{fontSize: 12}}>{this.props.currentAnimal.latin_name}</Text>
              </View>
            </View>
            <Text style={styles.title}>Save sighting details</Text>
            <Text style={styles.title}>Leave a comment about your experience:</Text>
            <TextInput
              style={styles.textInput}
              multiline={true}
              numberOfLines={10}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            <View>
              <Text>Abundance:</Text>
              <TextInput
                style={{height: 40, width: width * 0.1, borderColor: 'gray', borderWidth: 1}}
                keyboardType='numeric'
                onChangeText={(count) => this.setState({count})}
                value={this.state.count}
              />
              <Button style={styles.smallButton} onPress={this.plusButtonPress.bind(this)}>+</Button>
              <Button style={styles.smallButton} onPress={this.minusButtonPress.bind(this)}>-</Button>
            </View>
            <View>
            </View>
            <Button style={styles.buttonLeft} onPress={this.props.closeModal}>
              <Text>cancel and keep searching</Text><
            /Button>
            <TouchableOpacity onPress={this.handlePress.bind(this)}>
              <Text>Save sighting</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    currentAnimal: state.animals.currentAnimal,
    mapNavMode: state.user.mapNavMode,
    animals: state.animals.list,
    currentPark: state.parks.currentPark,
    user: state.user.name,
    userLocation: state.user.lat_lng

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveSighting: (payload) => {
      dispatch(actions.saveSighting(payload));
    },
    closeSightingModal: (payload) => {
      dispatch(actions.setSightingInfoVisibility(payload));
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
  sightingContainer: {
    flex: 1
  },
  saveModal: {
    paddingLeft: 40,
    paddingTop: 40
  },
  smallButton: {
    width: 40,
    height: 40
  },
  textInput: {
    height: height * 0.3,
    width: width * 0.8,
    borderColor: 'gray',
    borderWidth: 1
  },
  title: {
    justifyContent: 'center'
  },
  animalInfo: {
    flexDirection: 'row'
  },
  animalTextContainer: {
    margin: 2
  }
});

export const SaveSighting = connect(mapStateToProps, mapDispatchToProps)(_SaveSighting);
