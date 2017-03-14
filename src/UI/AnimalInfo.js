import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import { AudioCall } from './index';
const { height, width } = Dimensions.get('window');
import Button from 'apsl-react-native-button';
import Sound from 'react-native-sound';

export class AnimalInfo extends Component {
  constructor () {
    super();
    this.state = {
      audio: null,
      playing: false
    };
  }

  componentDidMount () {
    const call = this.props.animal.common_name.toLowerCase().replace(/ |-/g, '');
    this.setState({
      audio: new Sound(`${call}.mp3`, Sound.MAIN_BUNDLE, (e) => {
        if (e) {
          console.log('error', e);
        }
      })
    });
  }

  playSound () {
    this.setState({playing: true});
    this.state.audio.play((success) => {
        if (success) {
          this.setState({playing: false});
        } else {
          console.warn('playback failed due to audio decoding errors');
        }
      });
  }

  stopSound () {
    this.state.audio.stop();
    this.setState({playing: false});
  }

  componentWillUnmount () {
    this.state.audio.release();
    this.setState({audio: null});
  }

  // playSound (action) {
  //   if (action === 'play') {
  //     this.state.audio.play((success) => {
  //       if (success) {
  //         console.warn('successfully finished playing');
  //       } else {
  //         console.warn('playback failed due to audio decoding errors');
  //       }
  //     });
  //     this.setState({playing: true});
  //   }
  //   if (action === 'stop') {
  //     this.state.audio.stop();
  //     this.setState({playing: false});
  //   }
  // }

  handlePress (choice, id) {
    if (choice === 'return') {
      if (this.state.audio !== null) {
        this.state.audio.stop();
        this.setState({playing: false});
      }
      this.props.closeModal();
    }
    if (choice === 'search') {
      if (this.state.audio !== null) {
        this.state.audio.stop();
        this.setState({playing: false});
      }
      this.props.clearSightings();
      this.props.closeModal();
      this.props.navigator.replace({id});
    }
  }

  render () {
    return (
      <View style={styles.container}>
            <Modal
              visible={this.props.visible}
              onRequestClose={this.props.closeModal}
              transparent={true}
            >
              <View style={styles.animalModal}>
              <ScrollView style={{flex: 1}} >
                <View style={styles.header}>
                  <Image
                    style={styles.photo}
                    source={{uri: this.props.animal.small_img}}
                  />
                  <View style={styles.titleText}>
                    <View>
                      <Text style={styles.title}>{this.props.animal.common_name}</Text>
                      <Text style={styles.small}>{this.props.animal.latin_name}</Text>
                    </View>
                    {this.props.animal.taxon_group === 'Bird' && <View style={styles.audioContainer} >
                      <AudioCall playSound={this.playSound.bind(this)} stopSound={this.stopSound.bind(this)} playing={this.state.playing} />
                    </View> }
                  </View>
                </View>
                <View style={styles.description}>
                  <Text style={styles.text}>{this.props.animal.description}</Text>
                </View>
                <View style={styles.buttonContainer}>
                {this.props.animalList && <Button style={styles.buttonSave} onPress={this.handlePress.bind(this, 'search', 'Map')}>
                    <Text style={styles.text}>Find Animal </Text>
                  </Button> }
                  <Button style={styles.buttonCancel} onPress={this.handlePress.bind(this, 'return')}>
                    <Text style={styles.text}>Return to list</Text>
                  </Button>
                </View>
              </ScrollView>

            </View>
            </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  animalModal: {
    width: width * 0.95,
    height: height * 0.95,
    padding: 15,
    marginTop: 20,
    marginLeft: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(242, 247, 243, 0.98)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonSave: {
    width: width * 0.4,
    marginRight: 10,
    borderWidth: 0,
    backgroundColor: 'rgba(135, 203, 139, 0.8)'
  },
  buttonCancel: {
    width: width * 0.4,
    borderWidth: 0,
    backgroundColor: 'rgba(247, 168, 124, 0.8)'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row'
  },
  photo: {
    width: 145,
    height: 145,
    borderRadius: 5
  },
  titleText: {
    marginTop: 10,
    padding: 8,
    backgroundColor: 'rgba(229, 238, 242, 0.95)',
    width: width * 0.86,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  small: {
    fontSize: 12,
    color: 'rgb(44, 157, 51)',
    fontStyle: 'italic'
  },
  title: {
    justifyContent: 'center',
    color: '#3e3e3e',
    fontSize: 18,
    fontWeight: '500'
  },
  description: {
    marginTop: 10
  },
  text: {
    color: '#3e3e3e'
  },
  audioContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
});
