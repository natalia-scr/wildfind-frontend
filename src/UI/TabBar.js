import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Button from 'apsl-react-native-button';

export const TabBar = ({changeTab}) => (
  <View style={styles.tabBar} >
    <Button style={[styles.tab, {borderBottomColor: 'rgb(200, 198, 170)'}]} onPress={changeTab.bind(this, 'all')}>
      <Text style={styles.buttonText}>All</Text>
    </Button>
    <Button style={[styles.tab, {borderColor: 'green'}]} onPress={changeTab.bind(this, 'common')}>
      <Text style={styles.buttonText}>Common</Text>
    </Button>
    <Button style={[styles.tab, {borderColor: 'yellow'}]} onPress={changeTab.bind(this, 'uncommon')}>
      <Text style={styles.buttonText}>Uncommon</Text>
    </Button>
    <Button style={[styles.tab, {borderColor: 'red'}]} onPress={changeTab.bind(this, 'rare')}>
      <Text style={styles.buttonText}>Rare</Text>
    </Button>
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 50,
    flexDirection: 'row',
    marginBottom: 15
  },
  tab: {
    flex: 1,
    borderRadius: 0,
    margin: 1,
    marginTop: 5,
    borderWidth: 0,
    borderBottomWidth: 3
  },
  buttonText: {
    color: 'rgb(5, 26, 0)'
  }
});
