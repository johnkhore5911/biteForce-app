import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PreWelcome = () => {
  const navigation = useNavigation();

  const handlePress1 = () => {

    const setType = async (value) => {
      try {
        await AsyncStorage.setItem('type', value);
        console.log("saved type:",value);
        console.warn("saved type:",value);
        console.log(value)
      } catch (e) {
          console.warn("Error while saving userId in async storage",e);
      }
    };
    setType('Doctor');

    navigation.navigate('Welcome');
  };
  const handlePress2 = async() => {

    const setType = async (value) => {
      try {
        await AsyncStorage.setItem('type', value);
        console.log("saved type:",value);
        console.warn("saved type:",value);
        console.log(value)
      } catch (e) {
          console.warn("Error while saving userId in async storage",e);
      }
    };
    setType('Patient');

    navigation.navigate('LoginPatient');
  };


  return (
    <LinearGradient colors={['#1E7E73', '#a8e063']} style={styles.container}>
        <Text style={styles.title}>Who are you today? Your journey starts here.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress1()}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>I am a Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress2()}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>I am a Patient</Text>
        </TouchableOpacity>
    </LinearGradient>
  );
};

export default PreWelcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 30, // Adjust padding for better centering
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#56ab2f',
    fontWeight: 'bold',
  },
});
