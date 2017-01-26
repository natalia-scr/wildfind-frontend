import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Button from 'apsl-react-native-button';

export const TabBar = ({changeTab, active}) => {
  const all = active === 'all' ? {backgroundColor: 'rgba(200, 198, 170, 0.8)'} : styles.nonActive;
  const common = active === 'common' ? {backgroundColor: 'rgba(45, 209, 42, 0.7)'} : styles.nonActive;
  const uncommon = active === 'uncommon' ? {backgroundColor: 'rgba(236, 234, 46, 0.8)'} : styles.nonActive;
  const rare = active === 'rare' ? {backgroundColor: 'rgba(233, 55, 55, 0.7)'} : styles.nonActive;
  return (
    <View style={styles.tabBar} >
      <Button style={[styles.tab, {borderBottomColor: 'rgb(200, 198, 170)'}, all]} onPress={changeTab.bind(this, 'all')}>
        <Text style={styles.buttonText}>All</Text>
      </Button>
      <Button style={[styles.tab, {borderColor: 'green'}, common]} onPress={changeTab.bind(this, 'common')}>
        <Text style={styles.buttonText}>Common</Text>
      </Button>
      <Button style={[styles.tab, {borderColor: 'yellow'}, uncommon]} onPress={changeTab.bind(this, 'uncommon')}>
        <Text style={styles.buttonText}>Uncommon</Text>
      </Button>
      <Button style={[styles.tab, {borderColor: 'red'}, rare]} onPress={changeTab.bind(this, 'rare')}>
        <Text style={styles.buttonText}>Rare</Text>
      </Button>
    </View>
  )
};

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
