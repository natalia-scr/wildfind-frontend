import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import * as actions from '../actions';
let { height, width } = Dimensions.get('window');
import Button from 'apsl-react-native-button';
import { SaveSighting } from './SaveSighting';

class _SightingInfo extends Component {
  constructor () {
    super();
    this.state = {
      saveModalVisibility: false
    };
  }
  openSaveModal () {
    this.setState({
      saveModalVisibility: true
    });
  }
  closeSaveModal () {
    this.setState({
      saveModalVisibility: false
    });
  }
  render () {
    const animal = this.props.currentAnimal;
    const park = this.props.currentPark;
    const sightingInfo = {
      observer_id: this.props.user.id,
      animal_name: animal.common_name,
      park_id: park.id,
      animal_id: animal._id,
      lat_lng: park.lat_lng
    };
    return (
      <View style={styles.container}>
        <Modal
          animationType={'fade'}
          visible={this.props.visible}
          onRequestClose={this.props.closeModal}
        >
          <Text>{this.props.currentAnimal.common_name}</Text>
          <Text>{this.props.currentAnimal.latin_name}</Text>
          <View>
            <Image
              style={{width: 100, height: 100}}
              source={{uri: this.props.currentAnimal.small_img}} />
          </View>
          <View>
            <Text>{this.props.currentAnimal.description}</Text>
          </View>
          <Button style={styles.buttonLeft} onPress={this.props.closeModal}>
            <Text>keep searching</Text><
          /Button>
          <Button style={styles.buttonRight} onPress={this.openSaveModal.bind(this)}>
            <Text>save sighting</Text><
          /Button>
        </Modal>
        <SaveSighting
        sightingInfo={sightingInfo}
        closeSaveModal={this.closeSaveModal.bind(this)}
        visible={this.state.saveModalVisibility}
        currentMarkerId={this.props.currentMarkerId}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    animals: state.animals.list,
    currentPark: state.parks.currentPark,
    user: state.user.name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentAnimal: (payload) => {
      dispatch(actions.setCurrentAnimal(payload));
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: width * 0.41,
    borderColor: '#f5f5f5',
    paddingLeft: 50,
    paddingRight: 50
  },
  buttonLeft: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: width * 0.41,
    borderColor: '#f5f5f5',
    paddingLeft: 50,
    paddingRight: 50
  }
});

export const SightingInfo = connect(mapStateToProps, mapDispatchToProps)(_SightingInfo);
