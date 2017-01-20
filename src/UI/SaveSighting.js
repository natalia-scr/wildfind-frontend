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
  }
  render () {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'fade'}
          visible={this.props.visible}
          onRequestClose={this.props.closeModal}
        >
          <Text style={styles.title}>Save sighting details</Text>
          <View>
            <Text style={styles.title}>Leave a comment about your experience:</Text>
            <TextInput
              style={{height: 40, width: width * 0.8, borderColor: 'gray', borderWidth: 1}}
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
          </View>
          <View>
            <Text>Abundance:</Text>
            <TextInput
              style={{height: 40, width: width * 0.3, borderColor: 'gray', borderWidth: 1}}
              keyboardType='numeric'
              onChangeText={(count) => this.setState({count})}
              value={this.state.count}
            />
          </View>
          <View>
            <Text> Sighting info to be saved: </Text>
            <Text>{this.props.sightingInfo.observer_id}</Text>
          </View>
          <TouchableOpacity onPress={this.handlePress.bind(this)}>
            <Text>Save sighting</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    saveSighting: (payload) => {
      dispatch(actions.saveSighting(payload));
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 40
  },
  title: {
    justifyContent: 'center'
  }
});

export const SaveSighting = connect(null, mapDispatchToProps)(_SaveSighting);
