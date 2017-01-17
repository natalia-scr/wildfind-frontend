import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login } from './LoginScreen';
import { Welcome } from './Welcome';
import * as actions from '../actions/user';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';

class LoadingScreen extends Component {
  constructor () {
  super();
  this.state = {
    userInput: ''
  };
}
  componentDidMount () {
    // AsyncStorage.removeItem('user')
    // this.setState({loading: true})
    AsyncStorage.getItem('user').then((value) => {
      if (value !== null) {
        this.props.setUser(value);
      }
    })
    // .then(
    //   setTimeout(() => {
    //     this.stopLoading()
    //   }, 2000))
   .done();
  }

  handlePress = () => {
    const user = this.state.userInput;
    AsyncStorage.setItem('user', user);
    this.props.createUser(user);
  }

  handleChange = (value) => {
     this.setState({'userInput': value});
   }

  render () {
    return (
      <View style={styles.topContainer}>
      {this.props.isLoading === true && <Text style={styles.loading}>WildFind</Text>}
      {this.props.isLoading === false && this.props.user === null &&
        <Login handleChange={this.handleChange}
          handlePress={this.handlePress}
          userInput={this.state.userInput}
        />}
      {this.props.isLoading === false && this.props.user !== null && <Welcome user={this.props.user.name} /> }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.user.loading,
    user: state.user.user
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setUser: (user) => {
      dispatch(actions.setUser(user));
    },
    createUser: (user) => {
      dispatch(actions.createUser(user));
    }
  };
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 1
  },
  loading: {
    flex: 1,
    margin: 100,
    textAlign: 'center',
    fontSize: 40
  }
});

export const Loading = connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
