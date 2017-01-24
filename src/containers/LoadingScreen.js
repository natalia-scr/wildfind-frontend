import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

export class LoadingScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Image
          source={require('../img/WildFind.png')}
          style={styles.logo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 40,
    paddingRight: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {

  }
});
