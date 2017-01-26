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
  AsyncStorage,
  Image
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
        <View>
        {this.state.loading === true && <LoadingScreen />}
        {this.state.loading === false && this.props.user === null &&
          <LoginInput handleChange={this.handleChange}
            handlePress={this.handlePress}
            userInput={this.state.userInput}
          />}
        {this.state.loading === false && this.props.user !== null && <Welcome user={this.props.user}
          fetchUserLog={this.props.fetchUserLog} navigator={this.props.navigator} /> }
        </View>
      </View>
      </Image>
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

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(_LoginScreen);
