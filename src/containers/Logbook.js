import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { BackButton } from '../UI';
import * as actions from '../actions';

class _Logbook extends Component {

  componentDidMount () {
    this.props.fetchUserLog(this.props.user.id);
  }

  render () {
    return (
      <View style={styles.container}>
        <Text>Im Logbook</Text>
        {this.props.userLog.map((sighting) => {
          return (
            <Text>{sighting.animal_name}</Text>
          );
        })}
        <BackButton navigator={this.props.navigator} id={'Welcome'} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.name,
    userLog: state.userLog.userLog
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchUserLog: (userId) => {
      dispatch(actions.fetchUserLog(userId));
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    textAlign: 'center',
    fontSize: 20
  }
});

export const Logbook = connect(mapStateToProps, mapDispatchToProps)(_Logbook);
