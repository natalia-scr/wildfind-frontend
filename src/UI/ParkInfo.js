import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { TopBar } from '../containers';
const { width } = Dimensions.get('window');

export class _ParkInfo extends Component {

  componentDidMount () {
    this.props.clearSightings();
    if (this.props.animals === 0) this.fetchAnimals();
  }

  handlePress (id, randomSearch) {
    this.props.selectRandomSearchMode(randomSearch);
    this.props.navigator.push({id});
  }

  render () {
    const { park } = this.props;
    return (
      <View style={styles.container}>
        <TopBar navigator={this.props.navigator} id={'ParkList'} title={this.props.park.name} />
        <Image
          source={require('../img/alexlake.jpg')}
          style={styles.background}
          resizeMode={'cover'}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{park.name} </Text>
            <Text style={styles.location}>{park.location} </Text>
          </View>
        </Image>
        <View style={styles.parkInfoContainer}>
          <Text style={styles.quote} >{park.quote}</Text>
          <Text style={styles.author}>{park.quoteAuthor}</Text>
          <Text style={styles.text}>{park.info}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, 'Map', true)} >
            <Text style={styles.buttonText} >Start Exploring</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, 'AnimalList', false)} >
            <Text style={styles.buttonText} >Species List</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    animals: state.animals.list,
    loading: state.animals.loading,
    error: state.animals.error,
    park: state.parks.currentPark
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAnimals: () => {
      dispatch(actions.fetchAnimals());
    },
    selectRandomSearchMode: (payload) => {
      dispatch(actions.selectRandomSearchMode(payload));
    },
    clearSightings: () => {
      dispatch(actions.clearSightings());
    }
  };
};
const styles = StyleSheet.create({
  background: {
    height: height / 2.4,
    width: width,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  container: {
    flex: 1
  },
  parkInfoContainer: {
    backgroundColor: 'rgba(242, 247, 243, 0.98)',
    padding: 8
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    borderRadius: 6,
    borderColor: 'rgb(175, 180, 180)',
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    height: 35,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  buttonText: {
    color: 'rgb(44, 157, 51)',
    fontSize: 14,
    fontWeight: '400'
  },
  text: {
    fontSize: 14,
    color: '#3e3e3e',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 0
  },
  author: {
    fontSize: 10,
    color: '#3e3e3e',
    textAlign: 'center'
  },
  quote: {
    fontSize: 15,
    color: '#3e3e3e',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  titleContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 1,
    margin: 12
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'right',
    fontWeight: '300'
  },
  subTitle: {
    fontSize: 18,
    color: '#3e3e3e',
    textAlign: 'left'
  },
  location: {
    fontSize: 15,
    color: 'white'
  },
  infoContainer: {
    flex: 0.4,
    margin: 8
  },
  quoteContainer: {
    flex: 0.4,
    margin: 12
  }
});

export const ParkInfo = connect(mapStateToProps, mapDispatchToProps)(_ParkInfo);
