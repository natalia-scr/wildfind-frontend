import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  Dimensions
} from 'react-native';
import * as actions from '../actions';
let { width } = Dimensions.get('window');
import Button from 'apsl-react-native-button';
import { SaveSighting, AudioCall } from './index';
import Sound from 'react-native-sound';


class _SightingInfo extends Component {
  constructor () {
    super();
    this.state = {
      saveModalVisibility: true,
      audio: null,
      playing: false
    };
  }

  componentDidMount () {
    const call = 'bluetit';
    const s = new Sound(`${call}.mp3`, Sound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error', e);
      } else {
        this.setState({audio: s});
      }
    });
  }

  componentWillUnmount () {
    this.setState({audio: null});
  }

  playSound (action) {
    if (action === 'play') {
      this.state.audio.play();
      this.setState({playing: true});
    }
    if (action === 'stop') {
      this.state.audio.stop();
      this.setState({playing: false});
    }
  }

  openSaveModal () {
    console.warn('click');
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
      lat_lng: this.props.userLocation
    };

    return (
      <View style={styles.container}>
      {this.state.saveModalVisibility &&
        <SaveSighting
          sightingInfo={sightingInfo}
          closeSaveModal={this.closeSaveModal.bind(this)}
          visible={this.state.saveModalVisibility}
          currentMarkerId={this.props.currentMarkerId}
          callsaveAnimation={this.props.callsaveAnimation}
        />
      }
        <Modal
          animationType={'fade'}
          visible={this.props.visible}
          transparent={true}
          onRequestClose={this.props.closeModal}
        >
          <View>
            <Text>{this.props.currentAnimal.common_name}</Text>
            <Text>{this.props.currentAnimal.latin_name}</Text>
            <View style={styles.audioContainer}>
              <AudioCall playSound={this.playSound.bind(this)} playing={this.state.playing} />
            </View>
          </View>
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
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    animals: state.animals.list,
    currentPark: state.parks.currentPark,
    user: state.user.name,
    userLocation: state.user.lat_lng
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
    flex: 1,
    backgroundColor: 'transparent'
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
