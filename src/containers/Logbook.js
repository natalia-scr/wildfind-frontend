import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { TopBar } from './index';
import { AnimalInfo, BackButton } from '../UI';
import * as actions from '../actions';
let { height, width } = Dimensions.get('window');


class _Logbook extends Component {
  constructor (props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  componentWillMount () {
    this.props.fetchUserLog(this.props.user.id);
    this.props.fetchAnimals();
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
          {this.props.loading === true && <Text>Loading sighting list...</Text>}
          {this.props.loading === false &&
              <View>
                {this.props.userLog.map((sighting) => {
                return <View key={sighting._id} style={styles.sightingContainer}>
                  <TouchableOpacity style={styles.sightingCard} onPress={this.handlePress.bind(this, true, sighting.animal_id)}>
                      <View style={styles.sightingTextContainer}>
                        <Text style={styles.text}>{sighting.animal_name}</Text>
                        <Text style={styles.latin}>{sighting.latin_name}</Text>
                        <Text>{sighting.date.slice(0, 15)}</Text>
                        <Text>You spotted {sighting.obs_abundance}!</Text>
                        <Text>{sighting.obs_comment}</Text>
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
    currentAnimal: state.animals.currentAnimal,
    animalInfoVisible: state.modal.animalInfoVisible,
    mapNavMode: state.user.mapNavMode
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
    fetchUserLog: (userId) => {
      dispatch(actions.fetchUserLog(userId));
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: height * 0.4
  },
  logBookContainer: {
    flex: 1
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

  },
  sightingContainer: {
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'lightgray',
    marginTop: 5
  },
  sightingTextContainer: {
    marginLeft: 1
  },
  latin: {
    fontStyle: 'italic'
  }
});

export const Logbook = connect(mapStateToProps, mapDispatchToProps)(_Logbook);
