import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';

import {Loading} from './containers';
import {ParkList} from './containers';

export class WFNavigator extends Component {

  renderScene (route, navigator) {
    switch (route.id) {
      case 'Loading':
        return (<Loading navigator={navigator} title='Loading' />);
      case 'ParkList':
        return (<ParkList navigator={navigator} title='ParkList' />);
    }
  }

  render () {
    return (
      <Navigator
      style={styles.container}
      initialRoute={{id: 'Loading'}}
      renderScene={this.renderScene}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
