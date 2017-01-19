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
import { AnimalInfo, BackButton, TabBar } from '../UI';

class _AnimalList extends Component {
  constructor (props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentDidMount () {
    const filteredList = this.props.animals.sort((a, b) => b.abundance - a.abundance);
    this.setState({dataSource: this.state.dataSource.cloneWithRows(filteredList)});
  }

  handlePress (visible, id) {
    this.props.setModalVisibility(visible);
    console.warn(id);
    this.props.setCurrentAnimal(id);
  }

  closeModal () {
    this.props.setModalVisibility(false);
  }

  changeTab (abundance) {

  }

  render () {
    return (
      <View style={styles.container}>
        <BackButton navigator={this.props.navigator} id={'ParkInfo'} />
        <TabBar changeTab={this.changeTab} />
        {this.props.loading === true && <Text>Loading animal list...</Text>}
        {this.props.loading === false && <ListView
          enableEmptySections={true}
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(animal) =>
            <View style={styles.animalCard} >
              <TouchableOpacity onPress={this.handlePress.bind(this, true, animal._id)} >
                <View style={styles.item}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={{uri: animal.small_img}}
                  />
                <View style={styles.animalCard}>
                  <Text>{animal.common_name}</Text>
                  <Text>{animal.latin_name}</Text>
                  <Text>{animal.abundance}</Text>
                </View>
                </View>
              </TouchableOpacity>
            </View>
          }
        /> }
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
    height: 100,
    flexDirection: 'row'
  },

});

export const AnimalList = connect(mapStateToProps, mapDispatchToProps)(_AnimalList);
