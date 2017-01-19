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
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
          </View>
          <View>
            <Text>Abundance:</Text>
            <TextInput
              style={{height: 40, width: width * 0.3, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(count) => this.setState({count})}
              value={this.state.count}
            />
          </View>
          <View>
            <Text> Sighting info to be saved: </Text>
            <Text>{this.props.sightingInfo.observer_id}</Text>
          </View>
          <TouchableOpacity>
            <Text>Save sighting</Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }

}
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

export const SaveSighting = connect(null, null)(_SaveSighting);
