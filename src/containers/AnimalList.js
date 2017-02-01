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
import { TopBar } from './index';
import { AnimalInfo, BackButton, TabBar, SaveSighting } from '../UI';

class _AnimalList extends Component {
  constructor (props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      active: 'all',
      animalInfo: false
    };
  }

  componentDidMount () {
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.animals)});
  }

  handlePress (visible, id) {
    if (!this.props.mapNavMode) {
      this.props.setAnimalInfoVisibility(visible);
      this.setState({animalInfo: true});
    } else {
      this.props.setSightingInfoVisibility(visible);
    }
    this.props.setCurrentAnimal(id);
  }

  closeModal () {
    this.props.setAnimalInfoVisibility(false);
    this.setState({animalInfo: false})
  }

  closeSaveModal (status) {
    this.props.setSightingInfoVisibility(false);
    if (status === 'save') this.props.navigator.push({id: 'Map'});
  }

  changeTab = (rarity) => {
    let active = 'all';
    let list = this.props.animals;
    if (rarity === 'common') {
      list = this.props.animals.filter(animal => animal.abundance > 3);
      active = 'common';
    }
    if (rarity === 'uncommon') {
      list = this.props.animals.filter(animal => animal.abundance < 4 && animal.abundance > 0);
      active = 'uncommon';
    }
    if (rarity === 'rare') {
      list = this.props.animals.filter(animal => animal.abundance === 0);
      active = 'rare';
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(list),
      active
    })
  }

  render () {
    const id = this.props.mapNavMode ? 'Map' : 'ParkInfo';
    const title = this.props.mapNavMode ? 'What have you spotted?' : 'Species List';
    return (
      <View style={styles.container}>
        <TopBar title={title} id={id} navigator={this.props.navigator} />
        <TabBar changeTab={this.changeTab} active={this.state.active} />
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
                    style={styles.image}
                    source={{uri: animal.small_img}}
                  />
                  <View style={styles.animalTextContainer}>
                    <Text style={styles.title} >{animal.common_name}</Text>
                    <Text style={styles.small}>{animal.latin_name}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          }
        /> }
        {this.props.currentAnimal !== null && this.state.animalInfo && !this.props.mapNavMode && <AnimalInfo animal={this.props.currentAnimal} visible={this.props.animalInfoVisible}
          closeModal={this.closeModal.bind(this)} navigator={this.props.navigator} clearSightings={this.props.clearSightings} animalList={true} /> }
        {this.props.mapNavMode && this.props.currentAnimal !== null &&
          <SaveSighting
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
    flex: 1,
    backgroundColor: 'rgb(235, 232, 225)'
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 45,
    padding: 10,
    margin: 2
  },
  list: {
    flexWrap: 'wrap',
    padding: 10
  },
  item: {
    height: 110,
    flexDirection: 'row'
  },
  animalTextContainer: {
    marginLeft: 15,
    marginTop: 20,
    paddingTop: 5
  },
  animalContainer: {
    borderBottomColor: 'rgb(195, 219, 202)',
    borderBottomWidth: 1,
    marginBottom: 5
  },
  title: {
    justifyContent: 'center',
    color: '#3e3e3e',
    fontSize: 18,
    fontWeight: '500'
  },
  small: {
    fontSize: 12,
    color: 'rgb(44, 157, 51)',
    fontStyle: 'italic'
  },
});

export const AnimalList = connect(mapStateToProps, mapDispatchToProps)(_AnimalList);
