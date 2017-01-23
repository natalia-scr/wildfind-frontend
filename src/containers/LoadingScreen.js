import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login } from './LoginScreen';
import { Welcome } from './Welcome';
import * as actions from '../actions';
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
      if (value !== null) this.props.setUser(JSON.parse(value));
    })
    // .then(
    //   setTimeout(() => {
    //     this.stopLoading()
    //   }, 2000))
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
      {this.props.isLoading === true && <Text style={styles.loading}>WildFind</Text>}
      {this.props.isLoading === false && this.props.user === null &&
        <Login handleChange={this.handleChange}
          handlePress={this.handlePress}
          userInput={this.state.userInput}
        />}
      {this.props.isLoading === false && this.props.user !== null && <Welcome user={this.props.user}
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

export const Loading = connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
