import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

class _Welcome extends Component {

  // componentWillMount () {
  //   this.props.fetchUserLog(this.props.user.id);
  // }

  handlePress (id) {
    this.props.navigator.push({id});
  }

  render () {
    return (
      <Image
        source={require('../img/bird2.jpg')}
        style={styles.background}
        resizeMode={'cover'}>
      <View style={styles.container}>
        <View style={styles.intro}>
        <Image
          source={require('../img/WildFind.png')}
          style={styles.logo}
        />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, 'ParkList')} ><Text style={styles.text}>Explore</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handlePress.bind(this, 'Logbook')} ><Text style={styles.text}>Log Book</Text></TouchableOpacity>
        </View>
      </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1,0.6)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent'
  },
  logo: {
    marginTop: 100
  },
  intro: {
    marginBottom: 150
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    color: 'rgb(176, 245, 183)'
  },
  buttonsContainer: {
    marginTop: -60
  },
  button: {
    borderRadius: 15,
    height: 80,
    borderWidth: 3,
    borderColor: 'rgb(176, 245, 183)',
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    user: state.user.name
  };
};

export const Welcome = connect(mapStateToProps)(_Welcome);
