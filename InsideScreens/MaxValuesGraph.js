// MaxValuesDisplay.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MaxValuesGraph = ({ maxBilateralLeft, maxBilateralRight, maxUnilateralLeft, maxUnilateralRight, maxIncisors }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Max Values:</Text>
      <Text style={styles.text}>Max Bilateral Left: {maxBilateralLeft.flat().join(', ')}</Text>
      <Text style={styles.text}>Max Bilateral Right: {maxBilateralRight.flat().join(', ')}</Text>
      <Text style={styles.text}>Max Unilateral Left: {maxUnilateralLeft.flat().join(', ')}</Text>
      <Text style={styles.text}>Max Unilateral Right: {maxUnilateralRight.flat().join(', ')}</Text>
      <Text style={styles.text}>Max Incisors: {maxIncisors.flat().join(', ')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   marginHorizontal: 20,
  //   paddingVertical: 20,
  //   backgroundColor: '#fff',
  //   borderRadius: 10,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});

export default MaxValuesGraph;
