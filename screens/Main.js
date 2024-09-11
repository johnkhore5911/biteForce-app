// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const Main = () => {
//   const [users, setUsers] = useState([]);
//   const [newUserId, setNewUserId] = useState('');
//   const [newUserName, setNewUserName] = useState('');
//   const [newUserAge, setNewUserAge] = useState('');
//   const navigation = useNavigation();
//   const [userId, setUserId] = useState('');

//   const fetchPatients = async () => {
//     try {
//       const response = await axios.post("http://192.168.18.208:3000/api/v1/getPatients", {
//         userId: userId
//       });
//       setUsers(response.data.patients);
//     } catch (error) {
//       console.error("Error while fetching patient data", error);
//       console.warn("Not able to get Patient Data");
//     }
//   };

//   useEffect(() => {
//     const getDataAndShowData = async () => {
//       try {
//         const value = await AsyncStorage.getItem('token');
//         if (value !== null) {
//           setUserId(value);
//           const response = await axios.post("http://192.168.18.208:3000/api/v1/getPatients", {
//             userId: value
//           });
//           setUsers(response.data.patients);
//         }
//       } catch (e) {
//         console.error("Error while retrieving token or fetching patient data", e);
//         console.warn("Not able to get Patient Data");
//       }
//     };
//     getDataAndShowData();
//   }, []);

//   const addUser = async () => {
//     if (newUserName && newUserAge) {
//       try {
//         const response = await axios.post(
//           "http://192.168.18.208:3000/api/v1/createNewPatient",
//           {
//             userId: userId,
//             PatientId: newUserId,
//             name: newUserName,
//             Age: newUserAge
//           }
//         );
//         if (response.data.success == true) {
//           Alert.alert("Success! 🎉", "New Patient has been Created successfully.");
//           await fetchPatients();
//         }
//       } catch (error) {
//         console.error("Error during adding Patient", error);
//       }
//     }
//   };

//   const navigateToUser = (item) => {
//     console.log("navigation in main and the item is this",item);
//     navigation.navigate('UserDetails', { item });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Add a New Patient</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Patient ID"
//         value={newUserId}
//         onChangeText={setNewUserId}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={newUserName}
//         onChangeText={setNewUserName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Age"
//         value={newUserAge}
//         onChangeText={setNewUserAge}
//         keyboardType="numeric"
//       />
//       <TouchableOpacity style={styles.button} onPress={addUser}>
//         <Text style={styles.buttonText}>Add Patient</Text>
//       </TouchableOpacity>

//       <View style={styles.prevUsers}>
//         <Text style={styles.prevUsersText}>Past Patients</Text>
//       </View>
//       <FlatList
//         data={users}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.userItemContainer} onPress={() => navigateToUser(item)}>
//             <Text style={styles.userItem}>Patient Id: {item.PatientId}</Text>
//             <Text style={styles.userItemName}>{item.name.toUpperCase()}</Text>
//           </TouchableOpacity>
//         )}
//         keyExtractor={item => item.PatientId}
//       />
//     </ScrollView>
//   );
// };

// export default Main;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#FAFAFB',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginVertical: 20,
//     color: '#333',
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//     padding: 15,
//     marginBottom: 15,
//     color: '#333',
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   button: {
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     backgroundColor: '#28A745',
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 20,
//     shadowColor: '#28A745',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.5,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   prevUsers: {
//     marginVertical: 15,
//   },
//   prevUsersText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   userItemContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     marginBottom: 10,
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   userItem: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   userItemName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#777',
//     marginTop: 5,
//   },
// });

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const [users, setUsers] = useState([]);
  const [newUserId, setNewUserId] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserAge, setNewUserAge] = useState('');
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();

  const fetchPatients = async () => {
    try {
      const response = await axios.post("https://bite-force-server.vercel.app/api/v1/getPatients", { userId });
      setUsers(response.data.patients);
    } catch (error) {
      console.error("Error while fetching patient data", error);
      console.warn("Not able to get Patient Data");
    }
  };

  useEffect(() => {
    const getDataAndShowData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setUserId(value);
          const response = await axios.post("https://bite-force-server.vercel.app/api/v1/getPatients", { userId: value });
          setUsers(response.data.patients);
        }
      } catch (e) {
        console.error("Error while retrieving token or fetching patient data", e);
        console.warn("Not able to get Patient Data");
      }
    };
    getDataAndShowData();
  }, []);

  const addUser = async () => {
    if (newUserName && newUserAge) {
      try {
        const response = await axios.post(
          "https://bite-force-server.vercel.app/api/v1/createNewPatient",
          { userId, PatientId: newUserId, name: newUserName, Age: newUserAge }
        );
        if (response.data.success) {
          Alert.alert("Success! 🎉", "New Patient has been Created successfully.");
          await fetchPatients();
        }
      } catch (error) {
        console.error("Error during adding Patient", error);
      }
    }
  };

  const navigateToUser = (item) => {
    navigation.navigate('UserDetails', { item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a New Patient</Text>
      <TextInput
        style={styles.input}
        placeholder="Patient ID"
        value={newUserId}
        onChangeText={setNewUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={newUserName}
        onChangeText={setNewUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={newUserAge}
        onChangeText={setNewUserAge}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={addUser}>
        <Text style={styles.buttonText}>Add Patient</Text>
      </TouchableOpacity>

      <View style={styles.prevUsers}>
        <Text style={styles.prevUsersText}>Past Patients</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userItemContainer} onPress={() => navigateToUser(item)}>
            <Text style={styles.userItem}>Patient Id: {item.PatientId}</Text>
            <Text style={styles.userItemName}>{item.name.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.PatientId}
      />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAFAFB',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 15,
    marginBottom: 15,
    color: '#333',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#28A745',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#28A745',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  prevUsers: {
    marginVertical: 15,
  },
  prevUsersText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
  },
  userItemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  userItem: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  userItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#777',
    marginTop: 5,
  },
});
