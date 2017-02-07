import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export const AudioCall = ({playSound, playing}) => (
  <View>
    {!playing && <TouchableOpacity onPress={playSound.bind(this, 'play')} style={styles.audio} >
      <Icon name='play' size={22} color={'rgb(44, 157, 51)'} />
      <Text style={styles.audioText}>Play Call</Text>
      </TouchableOpacity>}
    {playing && <TouchableOpacity onPress={playSound.bind(this, 'stop')} style={styles.audio} >
      <Icon name='stop' size={22} color={'rgb(179, 15, 15)'} />
      <Text style={styles.audioText}>Stop Call</Text>
    </TouchableOpacity>}
  </View>
);

export default AudioCall;

const styles = StyleSheet.create({
  audio: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5
  },
  audioText: {
    fontSize: 11,
    padding: 4
  }
});
