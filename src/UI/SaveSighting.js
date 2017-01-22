import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  TextInput
} from 'react-native';
import * as actions from '../actions';
let { height, width } = Dimensions.get('window');
import Button from 'apsl-react-native-button';

class _SaveSighting extends Component {
  constructor () {
    super();
    this.state = {
      text: '',
      count: '0'
    };
  }
  handlePress () {
    const sighting = this.props.sightingInfo;
    sighting.obs_comment = this.state.text;
    sighting.obs_abundance = +this.state.count;
    this.props.saveSighting({sighting});
    this.props.closeSaveModal();
    this.props.closeSightingModal(false);
    this.props.removeMarker(this.props.currentMarkerId);
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
      <View>
        <Modal
          animationType={'fade'}
          visible={this.props.visible}
          onRequestClose={this.props.closeSaveModal}
        >
          <View style={styles.saveModal}>
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
              <Text> Sighting info to be saved: </Text>
              <Text>{this.props.sightingInfo.observer_id}</Text>
            </View>
            <TouchableOpacity onPress={this.handlePress.bind(this)}>
              <Text>Save sighting</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

}

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
    }
  };
};

const styles = StyleSheet.create({
  saveModal: {
    flex: 1,
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
  }
});

export const SaveSighting = connect(null, mapDispatchToProps)(_SaveSighting);
