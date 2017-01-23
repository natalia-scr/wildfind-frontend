import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export const TabBar = ({changeTab}) => (
  <View style={styles.tabBar} >
    <TouchableOpacity style={styles.tab} onPress={changeTab.bind(this, 'all')}>
      <Text>All </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tab} onPress={changeTab.bind(this, 'common')}>
      <Text>Common </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tab} onPress={changeTab.bind(this, 'uncommon')}>
      <Text>Uncommon </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.tab} onPress={changeTab.bind(this, 'rare')}>
      <Text>Rare </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row'
  },
  tab: {
    margin: 5
  }
});
