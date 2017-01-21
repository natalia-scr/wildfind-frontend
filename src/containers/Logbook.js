import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { AnimalInfo, BackButton } from '../UI';
import * as actions from '../actions';

class _Logbook extends Component {

  constructor (props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount () {
    this.props.fetchAnimals();
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.userLog)});
  }

  handlePress (visibility, animalId) {
    this.props.setModalVisibility(visibility);
    this.props.setCurrentAnimal(animalId);
  }

  closeModal () {
    this.props.setModalVisibility(false);
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Your Logbook</Text>


        {this.props.loading === true && <Text>Loading sighting list...</Text>}
        {this.props.loading === false && <ListView
          enableEmptySections={true}
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(sighting) =>
            <View style={styles.sightingContainer}>
              <TouchableOpacity onPress={this.handlePress.bind(this, true, sighting.animal_id)}>
                <View style={styles.item}>
                  <View style={styles.sightingTextContainer}>
                    <Text>{sighting.animal_name}</Text>
                    <Text>{sighting.date.slice(0, 15)}</Text>
                    <Text>{sighting.obs_abundance}</Text>
                    <Text>{sighting.obs_comment}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          }
        />}
        {this.props.currentAnimal !== null && <AnimalInfo animal={this.props.currentAnimal} visible={this.props.modalVisible} closeModal={this.closeModal.bind(this)} />}

        <BackButton navigator={this.props.navigator} id={'Welcome'} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.userLog.loading,
    user: state.user.name,
    userLog: state.userLog.userLog,
    currentAnimal: state.animals.currentAnimal,
    modalVisible: state.modal.modalVisible
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
  button: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    height: 40,
    marginTop: 20,
    width: 200
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  },
  list: {
    flexWrap: 'wrap'
  },
  sightingContainer: {
    borderWidth: 1,
    borderColor: 'black'
  },
  sightingTextContainer: {
    marginLeft: 1
  },
  item: {
    height: 100,
    flexDirection: 'row'
  }
});

export const Logbook = connect(mapStateToProps, mapDispatchToProps)(_Logbook);
