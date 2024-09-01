import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';


const UserDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;
  const [slots, setSlots] = useState([]);

  const [showReadings,setShowReading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      const slotsCollection = await firestore()
        .collection('users')
        .doc(user.id)
        .collection('slots')
        .get();
      setSlots(slotsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchSlots();
  });


  console.log("User details: ", slots);

  const addSlot = () => {
    navigation.navigate('Gloves', { userId: user.id });
  };

  const renderSlotItem = ({ item }) => (
    <TouchableOpacity onPress={()=> navigation.navigate("SlotGraph",{item})}>
      <View style={styles.slotContainer}>
        <Text style={styles.slotTitle}>Slot ID: {item.id}</Text>
        <Text style={{color:`black`,fontSize:16,padding:3}}>Unilateral Left: {item.unilateralLeft.join(', ')}</Text>
        <Text style={{color:`black`,fontSize:16,padding:3}}>Unilateral Right: {item.unilateralRight.join(', ')}</Text>
        <Text style={{color:`black`,fontSize:16,padding:3}}>Bilateral Left: {item.bilateralLeft.join(', ')}</Text>
        <Text style={{color:`black`,fontSize:16,padding:3}}>Bilateral Right: {item.bilateralRight.join(', ')}</Text>
        <Text style={{color:`black`,fontSize:16,padding:3}}>Incisors: {item.incisors.join(', ')}</Text>
      </View>
    </TouchableOpacity>

  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Name: {(user.name).toUpperCase()}</Text>
      <TouchableOpacity style={styles.button} onPress={addSlot}>
        <Text style={styles.buttonText}>Add New Slot</Text>
      </TouchableOpacity>

      <View style={styles.ToggleView}>
        <View>
          <AntDesign
            name="filetext1"
            onPress={() => setShowReading(true)}
            size={30}
            color={showReadings ? "black" : "gray"}
          />
        </View>
        <View>
          <Entypo
            name="bar-graph"
            onPress={() => setShowReading(false)}
            size={30}
            color={!showReadings ? "black" : "gray"} 
          />
        </View>
      </View>

      { showReadings && <FlatList
        data={slots}
        renderItem={renderSlotItem}
        keyExtractor={item => item.id}
      />}

      {
        !showReadings &&
        <View>
          <Text>Show Graph on the bases of all the previous data weekly, monthly, yearly  </Text>
        </View>
      }
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  ToggleText:{
    fontSize:16,
    fontWeight:`bold`,
    color:`black`
  },
  ToggleView:{
    display:`flex`,
    flexDirection:`row`,
    width:`100%`,
    backgroundColor:`white`,
    justifyContent:`space-evenly`,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:6,
    borderWidth:.6,
    borderColor:`black`,
    marginBottom:10
  },
  container: {
    flex: 1,
    padding: 20,
    // color:`black`,
    backgroundColor: '#f2f3f5',

  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color:`black`,
    marginTop:10
  },
  slotContainer: {
    padding: 15,
    backgroundColor: '#E0D1E8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color:`black`,
    borderRadius:15,
    marginBottom:10
  },
  slotTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color:`black`
  },
  button: {
    paddingVertical: 15,
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
});
