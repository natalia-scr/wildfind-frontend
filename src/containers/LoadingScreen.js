import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    position: 'absolute',
    left: -160,
    top: 100
  }
});
