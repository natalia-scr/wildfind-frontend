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
      dataSource: ds.cloneWithRows([])
    };
  }

  componentDidMount () {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.animals)});
  }

  handlePress (visible, id) {
    this.props.setCurrentAnimal(id);
    if (!this.props.mapNavMode) {
      this.props.setAnimalInfoVisibility(visible);
    } else {
      this.props.setSightingInfoVisibility(visible);
    }
  }

  closeModal () {
    this.props.setAnimalInfoVisibility(false);
  }

  closeSaveModal () {
    this.props.setSightingInfoVisibility(false);
    this.props.navigator.push({id: 'Map'})
  }

  changeTab = (rarity) => {
    if (rarity === 'all') {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.animals)});
    }
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
        <View style={styles.topBar}>
          <BackButton navigator={this.props.navigator} id={id} />
        </View>
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
        {this.props.currentAnimal !== null && !this.props.mapNavMode && <AnimalInfo animal={this.props.currentAnimal} visible={this.props.animalInfoVisible}
          closeModal={this.closeModal.bind(this)} navigator={this.props.navigator} clearSightings={this.props.clearSightings}/> }
        {this.props.mapNavMode && this.props.currentAnimal !== null &&
          <SaveSighting
            sightingInfo={sightingInfo}
            closeModal={this.closeSaveModal.bind(this)}
            visible={this.props.sightingInfoVisible}
            currentMarkerId={null}
            callsaveAnimation={null}
            /> }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    animalInfoVisible: state.modal.animalInfoVisible,
    animals: state.animals.list,
    loading: state.animals.loading,
    error: state.animals.error,
    currentAnimal: state.animals.currentAnimal,
    mapNavMode: state.user.mapNavMode,
    currentPark: state.parks.currentPark,
    user: state.user.name,
    userLocation: state.user.lat_lng,
    sightingInfoVisible: state.modal.sightingInfoVisible
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAnimals: () => {
      dispatch(actions.fetchAnimals());
    },
    setAnimalInfoVisibility: (payload) => {
      dispatch(actions.setAnimalInfoVisibility(payload));
    },
    setCurrentAnimal: (payload) => {
      dispatch(actions.setCurrentAnimal(payload));
    },
    clearSightings: () => {
      dispatch(actions.clearSightings());
    },
    setSightingInfoVisibility: (payload) => {
      dispatch(actions.setSightingInfoVisibility(payload));
    },
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
  },
  topBar: {
    backgroundColor: 'darkolivegreen',
    height: 30,
    justifyContent: 'center'
  }
});

export const AnimalList = connect(mapStateToProps, mapDispatchToProps)(_AnimalList);
