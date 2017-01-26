import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';

import {ParkList, Logbook, LoginScreen, About, Welcome, AnimalList, Map} from './containers';
import { ParkInfo } from './UI';

export class WFNavigator extends Component {

  renderScene (route, navigator) {
    switch (route.id) {
      case 'LoginScreen':
        return <LoginScreen navigator={navigator} title='LoginScreen' />;
      case 'Welcome':
        return <Welcome navigator={navigator} title='Welcome' />;
      case 'ParkList':
        return <ParkList navigator={navigator} title='ParkList' />;
      case 'Logbook':
        return <Logbook navigator={navigator} title='Logbook' />;
      case 'About':
        return <About navigator={navigator} title='About' />;
      case 'AnimalList':
        return <AnimalList navigator={navigator} title='AnimalList' />;
      case 'ParkInfo':
        return <ParkInfo navigator={navigator} title='ParkInfo' />;
      case 'Map':
        return <Map navigator={navigator} title='Map' />;
    }
  }

  render () {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{id: 'LoginScreen'}}
        renderScene={this.renderScene}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FadeAndroid;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
