import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginInput } from './LoginInput';
import { Welcome } from './Welcome';
import { LoadingScreen } from './LoadingScreen';
import * as actions from '../actions';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from 'react-native';


class _LoginScreen extends Component {
  constructor () {
  super();
  this.state = {
    userInput: '',
    loading: false
  };
}
  componentDidMount () {
    // AsyncStorage.removeItem('user')
    this.setState({loading: true})
    AsyncStorage.getItem('user').then((value) => {
      if (value !== null) this.props.setUser(JSON.parse(value));
    })
    .then(
      setTimeout(() => {
        this.setState({loading: false})
      }, 500))
   .done();
  }

  handlePress = () => {
    const user = this.state.userInput;
    this.props.createUser(user, this.saveUser);
  }

  saveUser (user) {
    AsyncStorage.setItem('user', JSON.stringify(user));
  }

  handleChange = (value) => {
     this.setState({'userInput': value});
   }

  render () {
    return (
      <View style={styles.topContainer}>
      {this.state.loading === true && <LoadingScreen />}
      {this.state.loading === false && this.props.user === null &&
        <LoginInput handleChange={this.handleChange}
          handlePress={this.handlePress}
          userInput={this.state.userInput}
        />}
      {this.state.loading === false && this.props.user !== null && <Welcome user={this.props.user}
        fetchUserLog={this.props.fetchUserLog} navigator={this.props.navigator} /> }
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
    },
    fetchUserLog: (userId) => {
      dispatch(actions.fetchUserLog(userId));
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

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(_LoginScreen);
