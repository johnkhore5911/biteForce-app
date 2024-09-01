import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';


const SlotGraph = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;
    console.log("SlotData: ",item);
  return (
    <View style={{padding:15}}>
      <Text>Show Graph</Text>
      <Text>Show Graph of Particular slot</Text>

    </View>
  )
}

export default SlotGraph

const styles = StyleSheet.create({})