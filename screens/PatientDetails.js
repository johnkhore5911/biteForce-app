import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaxValuesGraph from '../InsideScreens/MaxValuesGraph';

const PatientDetails = ({ route }) => {
  const navigation = useNavigation();
  const userDetails = route.params;
  console.log("USERDETAILS IN USER DETAILS: ", userDetails);

  const [slots, setSlots] = useState([]);
  const [showReadings, setShowReading] = useState(true);

  const [maxBilateralLeft, setMaxBilateralLeft] = useState([]);
  const [maxBilateralRight, setMaxBilateralRight] = useState([]);
  const [maxUnilateralLeft, setMaxUnilateralLeft] = useState([]);
  const [maxUnilateralRight, setMaxUnilateralRight] = useState([]);
  const [maxIncisors, setMaxIncisors] = useState([]);

  const [loading, setLoading] = useState(true); // Add loading state

  const renderSlotItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate("SlotGraph", { item })}>
      <View style={styles.slotContainer}>
        <Text style={styles.slotTitle}>Slot ID: {item.id}</Text>
        <Text style={styles.slotText}>Unilateral Left: {item.UnilateralLeft.join(', ')}</Text>
        <Text style={styles.slotText}>Unilateral Right: {item.UnilateralRight.join(', ')}</Text>
        <Text style={styles.slotText}>Bilateral Left: {item.BilateralLeft.join(', ')}</Text>
        <Text style={styles.slotText}>Bilateral Right: {item.BilateralRight.join(', ')}</Text>
        <Text style={styles.slotText}>Incisors: {item.Incisors.join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );

  const fetchPatients = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.post("http://192.168.18.208:3000/api/v1/getPatientSlot", {
        PatientId: userDetails.item._id
      });
      console.log("response.data.patients: ", response.data.patients);
      setSlots(response.data.patients);

      const bilateralLeft = [];
      const bilateralRight = [];
      const unilateralLeft = [];
      const unilateralRight = [];
      const incisors = [];

      response.data.patients.forEach(patient => {
        bilateralLeft.push(patient.MaxBilateralLeft);
        bilateralRight.push(patient.MaxBilateralRight);
        unilateralLeft.push(patient.MaxUnilateralLeft);
        unilateralRight.push(patient.MaxUnilateralRight);
        incisors.push(patient.MaxIncisors);
      });

      setMaxBilateralLeft(bilateralLeft);
      setMaxBilateralRight(bilateralRight);
      setMaxUnilateralLeft(unilateralLeft);
      setMaxUnilateralRight(unilateralRight);
      setMaxIncisors(incisors);
    } catch (error) {
      console.error("Error while fetching patient slot data", error);
      console.warn("Not able to get Patient slot data");
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [userDetails]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Patient Details</Text>
      <Text style={styles.headerSubtitle}>Patient ID: {userDetails.item.PatientId}</Text>
      <Text style={styles.headerSubtitle}>Name: {userDetails.item.name}</Text>
      <Text style={styles.headerSubtitle}>Age: {userDetails.item.Age}</Text>

      <TouchableOpacity style={styles.refreshButton} onPress={fetchPatients}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>

      <View style={styles.toggleView}>
        <TouchableOpacity onPress={() => setShowReading(true)}>
          <AntDesign
            name="filetext1"
            size={30}
            color={showReadings ? "#6200ee" : "#ccc"}
          />
          <Text style={showReadings ? styles.toggleActive : styles.toggleInactive}>Readings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowReading(false)}>
          <Entypo
            name="bar-graph"
            size={30}
            color={!showReadings ? "#6200ee" : "#ccc"}
          />
          <Text style={!showReadings ? styles.toggleActive : styles.toggleInactive}>Graphs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userDetailText}>Patient ID: {userDetails.item.PatientId}</Text>
        <Text style={styles.userDetailText}>Name: {userDetails.item.name}</Text>
        <Text style={styles.userDetailText}>Age: {userDetails.item.Age}</Text>
      </View>
      
      <TouchableOpacity style={styles.refreshButton} onPress={fetchPatients}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>

      <View style={styles.toggleView}>
        <TouchableOpacity onPress={() => setShowReading(true)}>
          <AntDesign
            name="filetext1"
            size={30}
            color={showReadings ? "#6200ee" : "#ccc"}
          />
          <Text style={showReadings ? styles.toggleActive : styles.toggleInactive}>Readings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowReading(false)}>
          <Entypo
            name="bar-graph"
            size={30}
            color={!showReadings ? "#6200ee" : "#ccc"}
          />
          <Text style={!showReadings ? styles.toggleActive : styles.toggleInactive}>Graphs</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
      ) : showReadings ? (
        <FlatList
          data={slots}
          renderItem={renderSlotItem}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <View style={styles.graphPlaceholder}>
          <Text style={styles.graphText}>
            Displaying weekly, monthly, and yearly graphs of the previous data.
          </Text>
          <MaxValuesGraph
            maxBilateralLeft={maxBilateralLeft}
            maxBilateralRight={maxBilateralRight}
            maxUnilateralLeft={maxUnilateralLeft}
            maxUnilateralRight={maxUnilateralRight}
            maxIncisors={maxIncisors}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  userInfoContainer: {
    padding: 20,
    backgroundColor: '#6200ee',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  userDetailText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  refreshButton: {
    backgroundColor: '#03dac6',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  refreshButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  toggleView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  toggleActive: {
    color: '#6200ee',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginLeft: -10
  },
  toggleInactive: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 5,
    marginLeft: -10
  },
  slotContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  slotTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  slotText: {
    fontSize: 16,
    marginBottom: 5,
  },
  graphPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  graphText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PatientDetails;
