import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  useColorScheme,
  Button,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import BlSerial from 'react-native-bluetooth-serial';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';


const Gloves = ({route}) => {
  const {userId} = route.params; // Assuming userId is passed as a parameter
  const [unilateralLeft, setUnilateralLeft] = useState([]);
  const [unilateralRight, setUnilateralRight] = useState([]);
  const [bilateralLeft, setBilateralLeft] = useState([]);
  const [bilateralRight, setBilateralRight] = useState([]);
  const [incisors, setIncisors] = useState([]);

  const delimiter = '\n';
  let buffer = '';

  const onLoad = async () => {
    let isMounted = true;

    while (isMounted) {
      const result = await BlSerial.readFromDevice();
      if (result !== '' && result !== '0') {
        buffer += result;

        let delimiterIndex;
        while ((delimiterIndex = buffer.indexOf(delimiter)) !== -1) {
          const completeData = buffer.substring(0, delimiterIndex);
          buffer = buffer.substring(delimiterIndex + 1);

          if (completeData !== '') {
            console.log('Result: ', completeData);
            const [mode, force] = completeData.split(': ');
            const parsedForce = parseFloat(force);
            if (mode === 'Unilateral Left') {
              setUnilateralLeft(prev => [...prev, parsedForce]);
            }
            if (mode === 'Unilateral Right') {
              setUnilateralRight(prev => [...prev, parsedForce]);
            }
            if (mode === 'Bilateral Left') {
              setBilateralLeft(prev => [...prev, parsedForce]);
            }
            if (mode === 'Bilateral Right') {
              setBilateralRight(prev => [...prev, parsedForce]);
            }
            if (mode === 'Incisors') {
              setIncisors(prev => [...prev, parsedForce]);
            }
          }
        }
      }
    }

    return () => {
      isMounted = false;
    };
  };

  const saveData = async () => {
    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('slots')
        .add({
          bilateralLeft,
          bilateralRight,
          incisors,
          unilateralLeft,
          unilateralRight,
        });
      console.log('Data saved to Firestore!');
    } catch (error) {
      console.error('Error saving data: ', error);
    }
    navigation.goBack();
    
  };

  useEffect(() => {
    const cleanup = onLoad();
    return cleanup;
  }, []);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.Heading}>
          BiteForce
        </Text>
        <View>
          <Text style={styles.modeText}>
            Unilateral Left: {unilateralLeft.join(', ')}
          </Text>
        </View>
        <View>
          <Text style={styles.modeText}>
            Unilateral Right: {unilateralRight.join(', ')}
          </Text>
        </View>
        <View>
          <Text style={styles.modeText}>
            Bilateral Left: {bilateralLeft.join(', ')}
          </Text>
        </View>
        <View>
          <Text style={styles.modeText}>
            Bilateral Right: {bilateralRight.join(', ')}
          </Text>
        </View>
        <View>
          <Text style={styles.modeText}>
            Incisors: {incisors.join(', ')}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.buttonText}>Save Data</Text>
      </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default Gloves;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop:20,
    padding:5,
    // color:`black`,
    backgroundColor: '#f2f3f5',
  },
  Heading:{
    fontSize:20,
    marginBottom:5,
    fontWeight:`bold`
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#111',
    borderRadius: 10,
    position: 'relative',
    marginBottom:10,
    marginTop:10,
    marginBottom:20
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  modeText:{
    fontSize:18,
    
  }
})