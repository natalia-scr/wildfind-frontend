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
  ScrollView
} from 'react-native';

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
              animationType={'fade'}
              visible={this.props.visible}
              onRequestClose={this.props.closeModal}
            >
            <ScrollView style={{flex: 1}} >
              <View style={{flex: 1}} >
              <View>
                <Image
                  style={{ height: 200, width: 200 }}
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
              <TouchableOpacity onPress={this.handlePress.bind(this, 'search', 'Map')}>
                <Text>Find Animal </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handlePress.bind(this, 'return')}>
                <Text>Return to list</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
            </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

// const mapStateToProps = (state) => {
//   return {
//     modalVisible: state.modal.modalVisible,
//     animals: state.animals.list,
//     loading: state.animals.loading,
//     error: state.animals.error,
//     currentAnimal: state.animals.currentAnimal
//   };
// };
//
// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     fetchAnimals: () => {
//       dispatch(actions.fetchAnimals());
//     },
//     setModalVisibility: (payload) => {
//       dispatch(actions.setModalVisibility(payload));
//     },
//     setCurrentAnimal: (payload) => {
//       dispatch(actions.setCurrentAnimal(payload));
//     }
//   };
// };

// export const AnimalInfo = connect(mapStateToProps, mapDispatchToProps)(_AnimalInfo);
