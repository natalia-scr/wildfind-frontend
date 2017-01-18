import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Image
} from 'react-native';
import { AnimalInfo } from '../UI';

class _AnimalList extends Component {
  constructor (props) {
    super(props);
    console.warn(this.props.animals.length);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.animals)
    };
  }

  handlePress (visible, id) {
    this.props.setModalVisibility(visible);
    console.warn(id);
    this.props.setCurrentAnimal(id);
  }

  closeModal () {
    this.props.setModalVisibility(false);
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(animal) =>
            <View>
              <TouchableOpacity onPress={this.handlePress.bind(this, true, animal._id)} >
                <View style={styles.item}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={{uri: animal.small_img}}
                  />
                  <Text>{animal.common_name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
        />
        {this.props.currentAnimal !== null && <AnimalInfo animal={this.props.currentAnimal} visible={this.props.modalVisible}
          closeModal={this.closeModal.bind(this)} /> }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalVisible: state.modal.modalVisible,
    animals: state.animals.list,
    loading: state.animals.loading,
    error: state.animals.error,
    currentAnimal: state.animals.currentAnimal
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAnimals: () => {
      dispatch(actions.fetchAnimals());
    },
    setModalVisibility: (payload) => {
      dispatch(actions.setModalVisibility(payload));
    },
    setCurrentAnimal: (payload) => {
      dispatch(actions.setCurrentAnimal(payload));
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    flexWrap: 'wrap'
  },
  item: {
    width: 100,
    height: 110,
    margin: 5
  }
});

export const AnimalList = connect(mapStateToProps, mapDispatchToProps)(_AnimalList);
