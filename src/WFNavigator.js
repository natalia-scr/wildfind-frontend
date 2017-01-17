import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';

import {ParkList, Logbook, Loading, About, Welcome} from './containers';

export class WFNavigator extends Component {

  renderScene (route, navigator) {
    switch (route.id) {
      case 'Loading':
        return <Loading navigator={navigator} title='Loading' />;
      case 'Welcome':
        return <Welcome navigator={navigator} title='Welcome' />;
      case 'ParkList':
        return <ParkList navigator={navigator} title='ParkList' />;
      case 'Logbook':
        return <Logbook navigator={navigator} title='Logbook' />;
      case 'About':
        return <About navigator={navigator} title='About' />;
    }
  }

  render () {
    return (
      <Navigator
      style={styles.container}
      initialRoute={{id: 'Loading'}}
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
  },
});
