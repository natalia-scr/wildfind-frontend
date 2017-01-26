import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { TopBar } from './index';
import { AnimalInfo } from '../UI';
import * as actions from '../actions';
const { height, width } = Dimensions.get('window');

class _Logbook extends Component {
  constructor (props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentDidMount () {
    this.props.fetchUserLog(this.props.user.id);
    this.props.fetchAnimals();
    this.props.fetchParks();
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.userLog)});
  }

  handlePress (visibility, animalId) {
    this.props.setAnimalInfoVisibility(visibility);
    this.props.setCurrentAnimal(animalId);
  }

  closeModal () {
    this.props.setAnimalInfoVisibility(false);
  }

  render () {
    const id = this.props.mapNavMode ? 'Map' : 'Welcome';
    return (
      <View style={styles.container}>
        <TopBar navigator={this.props.navigator} id={id} title={`${this.props.user.name}\'s Logbook`} />
        <ScrollView style={{flex: 1}}>
          <View style={styles.logBookContainer}>

            {this.props.loading && <Text>Loading sighting list...</Text>}

            {!this.props.loading && !this.props.userLog.length &&
              <View style={styles.noSightings}>
                <Text style={styles.noSightingText}>Start exploring to add some sightings to your logbook!</Text>
              </View>
            }

            {!this.props.loading && this.props.userLog.length !== 0 &&
              <View>
                {this.props.userLog.map((sighting) => {
                  return <View key={sighting._id} style={styles.sightingContainer}>
                    <TouchableOpacity style={styles.sightingCard} onPress={this.handlePress.bind(this, true, sighting.animal_id)}>
                      <View style={styles.content}>
                        <View style={styles.sightingTextContainer}>
                          <Text style={styles.text}>{sighting.animal_name}</Text>
                          <Text style={styles.latin}>{sighting.latin_name}</Text>
                          <Text style={styles.date}>{sighting.date.slice(0, 15)}</Text>
                          {this.props.parks.length !== 0 && <Text>You spotted {sighting.obs_abundance} in {this.props.parks.filter((park) => park._id === sighting.park_id)[0].name}!</Text>}
                          <Text>{sighting.obs_comment}</Text>
                        </View>
                        <View style={styles.imageContainer}>
                          {!this.props.animalsLoading && <Image
                            style={styles.img}
                            source={{uri: this.props.animals.filter(animal => {
                              return animal._id === sighting.animal_id;
                            })[0].small_img}}
                          />}
                      </View>
                      </View>
                    </TouchableOpacity>
                  </View>;
                })}
              </View>
            }
          {this.props.currentAnimal !== null && <AnimalInfo animal={this.props.currentAnimal}
            visible={this.props.animalInfoVisible} closeModal={this.closeModal.bind(this)} />}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.logBook.loading,
    user: state.user.name,
    userLog: state.logBook.userLog,
    parks: state.parks.list,
    animals: state.animals.list,
    currentAnimal: state.animals.currentAnimal,
    animalInfoVisible: state.modal.animalInfoVisible,
    mapNavMode: state.user.mapNavMode,
    animalsLoading: state.animals.loading
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchParks: () => {
      dispatch(actions.fetchParks());
    },
    fetchAnimals: () => {
      dispatch(actions.fetchAnimals());
    },
    setAnimalInfoVisibility: (payload) => {
      dispatch(actions.setAnimalInfoVisibility(payload));
    },
    setCurrentAnimal: (payload) => {
      dispatch(actions.setCurrentAnimal(payload));
    },
    fetchUserLog: (userId) => {
      dispatch(actions.fetchUserLog(userId));
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logBookContainer: {
    flex: 1,
    height: height,
    backgroundColor: 'rgba(242, 247, 243, 0.98)'

  },
  sightingCard: {
    margin: 10
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
    justifyContent: 'center',
    color: '#3e3e3e',
    fontSize: 18,
    fontWeight: '500'
  },
  sightingContainer: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'aliceblue',
    marginTop: 5,
    backgroundColor: 'rgb(234, 249, 234)'
  },
  sightingTextContainer: {
    marginLeft: 1,
    width: width * 0.75
  },
  latin: {
    fontSize: 12,
    color: 'rgb(44, 157, 51)',
    fontStyle: 'italic'
  },
  date: {
    flexDirection: 'row',
    fontSize: 12
  },
  noSightings: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  noSightingText: {
    fontSize: 25
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  }
});

export const Logbook = connect(mapStateToProps, mapDispatchToProps)(_Logbook);
