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
import { AnimalInfo, BackButton, TabBar, SaveSighting } from '../UI';

class _AnimalList extends Component {
  constructor (props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      saveModalVisible: false
    };
  }

  componentDidMount () {
    const filteredList = this.props.animals.filter(animal => animal.abundance > 3);
    this.setState({dataSource: this.state.dataSource.cloneWithRows(filteredList)});
  }

  handlePress (visible, id) {
    this.props.setCurrentAnimal(id);
    if (!this.props.mapNavMode) {
      this.props.setModalVisibility(visible);
    } else {
      this.setState({
        saveModalVisible: true
      })
    }
  }

  closeModal () {
    this.props.setModalVisibility(false);
  }

  closeSaveModal () {
    this.setState({
      saveModalVisible: false
    })
    this.props.navigator.push({id: 'Map'})
  }

  changeTab = (rarity) => {
    if (rarity === 'common') {
      const commonList = this.props.animals.filter(animal => animal.abundance > 3);
      this.setState({dataSource: this.state.dataSource.cloneWithRows(commonList)});
    }
    if (rarity === 'uncommon') {
      const uncommonList = this.props.animals.filter(animal => animal.abundance < 4 && animal.abundance > 0);
      this.setState({dataSource: this.state.dataSource.cloneWithRows(uncommonList)});
    }
    if (rarity === 'rare') {
      const rareList = this.props.animals.filter(animal => animal.abundance === 0);
      this.setState({dataSource: this.state.dataSource.cloneWithRows(rareList)});
    }
  }

  render () {
    const park = this.props.currentPark;
    const sightingInfo = {
      observer_id: this.props.user.id,
      park_id: park.id,
      lat_lng: this.props.userLocation
    }
    const id = this.props.mapNavMode ? 'Map' : 'ParkInfo';
    return (
      <View style={styles.container}>
        <BackButton navigator={this.props.navigator} id={id} />
        <TabBar changeTab={this.changeTab} />
        {this.props.loading === true && <Text>Loading animal list...</Text>}
        {this.props.loading === false && <ListView
          enableEmptySections={true}
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={(animal) =>
            <View style={styles.animalContainer}>
              <TouchableOpacity onPress={this.handlePress.bind(this, true, animal._id)} >
                <View style={styles.item}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={{uri: animal.small_img}}
                  />
                  <View style={styles.animalTextContainer}>
                    <Text>{animal.common_name}</Text>
                    <Text>{animal.latin_name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          }
        /> }
        {this.props.currentAnimal !== null && !this.props.mapNavMode && <AnimalInfo animal={this.props.currentAnimal} visible={this.props.modalVisible}
          closeModal={this.closeModal.bind(this)} navigator={this.props.navigator} clearSightings={this.props.clearSightings}/> }
        {this.props.mapNavMode &&
          <SaveSighting
            sightingInfo={sightingInfo}
            closeSaveModal={this.closeSaveModal.bind(this)}
            visible={this.state.saveModalVisible}
            currentMarkerId={null}
            /> }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modalVisible: state.modal.animalInfoVisible,
    animals: state.animals.list,
    loading: state.animals.loading,
    error: state.animals.error,
    currentAnimal: state.animals.currentAnimal,
    mapNavMode: state.user.mapNavMode,
    currentPark: state.parks.currentPark,
    user: state.user.name,
    userLocation: state.user.lat_lng
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAnimals: () => {
      dispatch(actions.fetchAnimals());
    },
    setModalVisibility: (payload) => {
      dispatch(actions.setAnimalInfoVisibility(payload));
    },
    setCurrentAnimal: (payload) => {
      dispatch(actions.setCurrentAnimal(payload));
    },
    clearSightings: () => {
      dispatch(actions.clearSightings());
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
  animalTextContainer: {
    marginLeft: 1
  },
  animalContainer: {
    borderWidth: 1,
    borderColor: 'black'
  }
});

export const AnimalList = connect(mapStateToProps, mapDispatchToProps)(_AnimalList);
