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
let { height, width } = Dimensions.get('window');
import Button from 'apsl-react-native-button';

export class AnimalInfo extends Component {

  handlePress = (choice, id) => {
    if (choice === 'return') this.props.closeModal();
    if (choice === 'search') {
      this.props.clearSightings();
      this.props.closeModal();
      this.props.navigator.push({id});
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
                  source={{uri: this.props.animal.photo}}
                />
              </View>
              <View>
                <Text>{this.props.animal.common_name}</Text>
                <Text>{this.props.animal.latin_name}</Text>
              </View>
              <View>
                <Text>{this.props.animal.description}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button style={styles.buttonSave} onPress={this.handlePress.bind(this, 'search', 'Map')}>
                  <Text>Find Animal </Text>
                </Button>
                <Button style={styles.buttonCancel} onPress={this.handlePress.bind(this, 'return')}>
                  <Text>Return to list</Text>
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
  buttonSave: {
    width: width * 0.7,
    borderColor: 'rgb(44, 157, 51)',
    backgroundColor: 'rgb(135, 203, 139)'
  },
  buttonCancel: {
    width: width * 0.7,
    borderColor: 'rgb(247, 121, 51)',
    backgroundColor: 'rgb(247, 168, 124)'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 5
  }
});
