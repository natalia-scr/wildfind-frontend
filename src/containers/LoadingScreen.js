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
      console.warn(value);
        this.props.setUser(value);
    })
    // .then(
    //   setTimeout(() => {
    //     this.stopLoading()
    //   }, 2000))
   .done();
  }

  handlePress = () => {
    const user = this.state.userInput;
    console.warn(this.saveUser);
    this.props.createUser(user, this.saveUser);
  }

  saveUser (user) {
    console.warn(user);
    AsyncStorage.setItem('user', user.name);
    AsyncStorage.setItem('userId', user.id);
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
      {this.props.isLoading === false && this.props.user !== null && <Welcome user={this.props.user} navigator={this.props.navigator} /> }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.user.loading,
    user: state.user.name
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    setUser: (user) => {
      dispatch(actions.setUser(user));
    },
    createUser: (user, cb) => {
      dispatch(actions.createUser(user, cb));
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