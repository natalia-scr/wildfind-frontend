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
          visible={this.props.visible}
          onRequestClose={this.props.closeModal}
          transparent={true}
        >
          <View style={styles.saveModal}>
            <View style={styles.animalInfo}>
              <Image
                style={styles.img}
                source={{uri: this.props.currentAnimal.photo}}
              />
              <View style={styles.animalTextContainer}>
                <Text style={styles.title}>{this.props.currentAnimal.common_name}</Text>
                <Text style={styles.small}>{this.props.currentAnimal.latin_name}</Text>
              </View>
            </View>
            <View style={styles.description}>
              <Text style={styles.descriptionText}>{this.props.currentAnimal.description.split('\n')[0]}</Text>
            </View>
            <View style={styles.saveBox}>
              <Text style={styles.saveTitle}>Save sighting details</Text>
              <Text style={styles.text}>Leave a comment about your experience:</Text>
              <TextInput
                style={styles.textInput}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
              <View>
                <Text style={styles.text}>Abundance:</Text>
                <View style={styles.abundanceContainer}>
                  <Button style={styles.smallButton} onPress={this.plusButtonPress.bind(this)}>+</Button>
                  <TextInput
                    style={styles.numericInput}
                    keyboardType='numeric'
                    onChangeText={(count) => this.setState({count})}
                    value={this.state.count}
                  />
                  <Button style={styles.smallButton} onPress={this.minusButtonPress.bind(this)}>-</Button>
                </View>
              </View>
            </View>
            <View>
            </View>
            <Button style={styles.buttonLeft} onPress={this.props.closeModal}>
              <Text style={styles.text}>cancel and keep searching</Text><
            /Button>
            <TouchableOpacity onPress={this.handlePress.bind(this)}>
              <Text style={styles.text}>Save sighting</Text>
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
    width: width * 0.95,
    height: height * 0.95,
    padding: 20,
    marginTop: 20,
    marginLeft: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(242, 247, 243, 0.98)'
  },
  smallButton: {
    width: 40,
    height: 40,
    marginLeft: 2,
    marginRight: 2
  },
  textInput: {
    height: height * 0.1,
    width: width * 0.65,
    backgroundColor: 'white'
  },
  title: {
    justifyContent: 'center',
    color: '#3e3e3e',
    fontSize: 18,
    fontWeight: '500'
  },
  saveTitle: {
    textAlign: 'center',
    color: '#3e3e3e',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500'
  },
  small: {
    fontSize: 12,
    color: 'rgb(44, 157, 51)'
  },
  animalInfo: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: 'white'
  },
  animalTextContainer: {
    marginLeft: 20,
    marginTop: 20
  },
  text: {
    color: '#3e3e3e',
    fontSize: 14
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white'
  },
  numericInput: {
    backgroundColor: 'white',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center'
  },
  saveBox: {
    paddingTop: 20
  },
  description: {
    paddingTop: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: 'white',
    height: 120
  },
  descriptionText: {
    color: '#3e3e3e'
  },
  abundanceContainer: {
    flexDirection: 'row'
  }
});

export const SaveSighting = connect(mapStateToProps, mapDispatchToProps)(_SaveSighting);
