import React from 'react';
import Button from 'apsl-react-native-button';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native';
let { height, width } = Dimensions.get('window');

export const LoginInput = ({userInput, handleChange, handlePress}) => (
  <View style={styles.loginContainer}>
    <View style={styles.inputBox}>
      <View style={styles.loginTextBox}>
        <Text style={styles.loginText}>Enter your name to start exploring</Text>
      </View>
      <View>
        <TextInput
          style={styles.formInput}
          onChangeText={handleChange}
          placeholder={'your name'}
          value={userInput} />
      </View>
      <View>
        <Button onPress={handlePress}
          style={styles.button} >
          <Text style={styles.buttonText}>Continue</Text>
        </Button>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  formInput: {
    height: 50,
    padding: 6,
    borderRadius: 5,
    marginTop: 20,
    fontSize: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(229, 238, 242, 0.4)',
    borderColor: 'rgba(229, 238, 242, 0.4)',
    width: width * 0.7,
    color: 'rgb(61, 64, 61)'
  },
  button: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(229, 238, 242, 0.7)',
    borderRadius: 6,
    justifyContent: 'center',
    backgroundColor: 'rgba(229, 238, 242, 0.6)',
    height: 50,
    marginTop: 20,
    width: width * 0.7
  },
  buttonText: {
    fontSize: 20,
    color: 'rgb(61, 64, 61)'
  },
  inputBox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -80,
    backgroundColor: 'rgba(229, 238, 242, 0.35)',
    padding: 20,
    paddingTop: 30,
    borderRadius: 10
  },
  loginText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
    color: 'rgb(176, 245, 183)'
  }
});
