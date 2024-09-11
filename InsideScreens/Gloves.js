// // import React, {useEffect, useState} from 'react';
// // import {
// //   Text,
// //   View,
// //   StatusBar,
// //   SafeAreaView,
// //   useColorScheme,
// //   Button,
// //   StyleSheet,
// //   TouchableOpacity
// // } from 'react-native';
// // import BlSerial from 'react-native-bluetooth-serial';
// // import firestore from '@react-native-firebase/firestore';
// // import { useNavigation, useRoute } from '@react-navigation/native';


// // const Gloves = ({route}) => {
// //   const {userId} = route.params; // Assuming userId is passed as a parameter
// //   const [unilateralLeft, setUnilateralLeft] = useState([]);
// //   const [unilateralRight, setUnilateralRight] = useState([]);
// //   const [bilateralLeft, setBilateralLeft] = useState([]);
// //   const [bilateralRight, setBilateralRight] = useState([]);
// //   const [incisors, setIncisors] = useState([]);

// //   const delimiter = '\n';
// //   let buffer = '';

// //   const onLoad = async () => {
// //     let isMounted = true;

// //     while (isMounted) {
// //       const result = await BlSerial.readFromDevice();
// //       if (result !== '' && result !== '0') {
// //         buffer += result;

// //         let delimiterIndex;
// //         while ((delimiterIndex = buffer.indexOf(delimiter)) !== -1) {
// //           const completeData = buffer.substring(0, delimiterIndex);
// //           buffer = buffer.substring(delimiterIndex + 1);

// //           if (completeData !== '') {
// //             console.log('Result: ', completeData);
// //             const [mode, force] = completeData.split(': ');
// //             const parsedForce = parseFloat(force);
// //             if (mode === 'Unilateral Left') {
// //               setUnilateralLeft(prev => [...prev, parsedForce]);
// //             }
// //             if (mode === 'Unilateral Right') {
// //               setUnilateralRight(prev => [...prev, parsedForce]);
// //             }
// //             if (mode === 'Bilateral Left') {
// //               setBilateralLeft(prev => [...prev, parsedForce]);
// //             }
// //             if (mode === 'Bilateral Right') {
// //               setBilateralRight(prev => [...prev, parsedForce]);
// //             }
// //             if (mode === 'Incisors') {
// //               setIncisors(prev => [...prev, parsedForce]);
// //             }
// //           }
// //         }
// //       }
// //     }

// //     return () => {
// //       isMounted = false;
// //     };
// //   };

// //   const saveData = async () => {
// //     try {
// //       await firestore()
// //         .collection('users')
// //         .doc(userId)
// //         .collection('slots')
// //         .add({
// //           bilateralLeft,
// //           bilateralRight,
// //           incisors,
// //           unilateralLeft,
// //           unilateralRight,
// //         });
// //       console.log('Data saved to Firestore!');
// //     } catch (error) {
// //       console.error('Error saving data: ', error);
// //     }
// //     navigation.goBack();
    
// //   };

// //   useEffect(() => {
// //     const cleanup = onLoad();
// //     return cleanup;
// //   }, []);
// //   const navigation = useNavigation();

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <View>
// //         <Text style={styles.Heading}>
// //           BiteForce
// //         </Text>
// //         <View>
// //           <Text style={styles.modeText}>
// //             Unilateral Left: {unilateralLeft.join(', ')}
// //           </Text>
// //         </View>
// //         <View>
// //           <Text style={styles.modeText}>
// //             Unilateral Right: {unilateralRight.join(', ')}
// //           </Text>
// //         </View>
// //         <View>
// //           <Text style={styles.modeText}>
// //             Bilateral Left: {bilateralLeft.join(', ')}
// //           </Text>
// //         </View>
// //         <View>
// //           <Text style={styles.modeText}>
// //             Bilateral Right: {bilateralRight.join(', ')}
// //           </Text>
// //         </View>
// //         <View>
// //           <Text style={styles.modeText}>
// //             Incisors: {incisors.join(', ')}
// //           </Text>
// //         </View>
// //         <TouchableOpacity style={styles.button} onPress={saveData}>
// //         <Text style={styles.buttonText}>Save Data</Text>
// //       </TouchableOpacity>

// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // export default Gloves;

// // const styles = StyleSheet.create({
// //   container:{
// //     flex: 1,
// //     paddingTop:20,
// //     padding:5,
// //     // color:`black`,
// //     backgroundColor: '#f2f3f5',
// //   },
// //   Heading:{
// //     fontSize:20,
// //     marginBottom:5,
// //     fontWeight:`bold`
// //   },
// //   button: {
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     backgroundColor: '#111',
// //     borderRadius: 10,
// //     position: 'relative',
// //     marginBottom:10,
// //     marginTop:10,
// //     marginBottom:20
// //   },
// //   buttonText: {
// //     color: 'white',
// //     textAlign: 'center',
// //   },
// //   modeText:{
// //     fontSize:18,
    
// //   }
// // })

// import React, {useEffect, useState} from 'react';
// import {
//   Text,
//   View,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   Alert
// } from 'react-native';
// import BlSerial from 'react-native-bluetooth-serial';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import axios from 'axios';

// const Gloves = ({route}) => {
//   const {userId} = route.params; // Assuming userId is passed as a parameter
//   const {userDetails}= route.params;
//   // const [userDetails,setuserDetails]= useState();
//   console.log("userId in BiteForce: ",userId);
//   console.log("userDetails in BiteForce: ",userDetails);
//   const [unilateralLeft, setUnilateralLeft] = useState([60,43,65,32,80]);
//   const [unilateralRight, setUnilateralRight] = useState([43,67,54]);
//   const [bilateralLeft, setBilateralLeft] = useState([20]);
//   const [bilateralRight, setBilateralRight] = useState([10]);
//   const [incisors, setIncisors] = useState([32,54,76,87,92]);
//   const [details, setDetails] = useState();



//   const delimiter = '\n';
//   let buffer = '';

//   const onLoad = async () => {
//     let isMounted = true;

//     while (isMounted) {
//       const result = await BlSerial.readFromDevice();
//       if (result !== '' && result !== '0') {
//         buffer += result;

//         let delimiterIndex;
//         while ((delimiterIndex = buffer.indexOf(delimiter)) !== -1) {
//           const completeData = buffer.substring(0, delimiterIndex);
//           buffer = buffer.substring(delimiterIndex + 1);

//           if (completeData !== '') {
//             console.log('Result: ', completeData);
//             const [mode, force] = completeData.split(': ');
//             const parsedForce = parseFloat(force);
//             if (mode === 'Unilateral Left') {
//               setUnilateralLeft(prev => [...prev, parsedForce]);
//             }
//             if (mode === 'Unilateral Right') {
//               setUnilateralRight(prev => [...prev, parsedForce]);
//             }
//             if (mode === 'Bilateral Left') {
//               setBilateralLeft(prev => [...prev, parsedForce]);
//             }
//             if (mode === 'Bilateral Right') {
//               setBilateralRight(prev => [...prev, parsedForce]);
//             }
//             if (mode === 'Incisors') {
//               setIncisors(prev => [...prev, parsedForce]);
//             }
//           }
//         }
//       }
//     }

//     return () => {
//       isMounted = false;
//     };
//   };

//   const saveData = async () => {

//     const maxBilateralLeft = bilateralLeft.length > 0 ? Math.max(...bilateralLeft) : 0;
//     const maxBilateralRight = bilateralRight.length > 0 ? Math.max(...bilateralRight) : 0;
//     const maxUnilateralLeft = unilateralLeft.length > 0 ? Math.max(...unilateralLeft) : 0;
//     const maxUnilateralRight = unilateralRight.length > 0 ? Math.max(...unilateralRight) : 0;
//     const maxIncisors = incisors.length > 0 ? Math.max(...incisors) : 0;

//     try {
//       const response = await axios.post("http://192.168.18.208:3000/api/v1/savePatientSlot", {
//         PatientId: userId,
//         BilateralLeft:bilateralLeft,
//         BilateralRight:bilateralRight,
//         UnilateralLeft:unilateralLeft,
//         UnilateralRight:unilateralRight,
//         Incisors:incisors,
//         MaxBilateralLeft:maxBilateralLeft,
//         MaxBilateralRight:maxBilateralRight,
//         MaxUnilateralLeft:maxUnilateralLeft,
//         MaxUnilateralRight:maxUnilateralRight,
//         MaxIncisors:maxIncisors
//       });
//       // setUsers(response.data.patients);
//       console.log("Success:",response.data);
//       Alert.alert("Success! 🎉","Reading Saved Sucessfully");

//       // now use the userId and again fetch the userDetails, I am fetching it again
//       await fetchPatientsDetails();
//     } catch (error) {
//       console.error('Error saving data: ', error);
//     }
//     // navigation.goBack();
//     console.log("details:",details);
//     // navigation.navigate('UserDetails', {item:details });
//   };

//   useEffect(() => {
//     const cleanup = onLoad();
//     return cleanup;
//   }, []);

//   const navigation = useNavigation();


//   const fetchPatientsDetails = async () => {
//     try {
//       const response = await axios.post("http://192.168.18.208:3000/api/v1/getPatientDetails",
//         {PatientId:userDetails.item._id}
//       );
//       // console.log("response.data.patients: ",response.data.patients);
//       console.log("This is the Updated Details of the Patient: ",response.data.patients);
//       // setDetails(response.data.patients);
//     navigation.navigate('UserDetails', {item:response.data.patients });

//       // setSlots(response.data.patients);
//       // setUsers(response.data.patients);
//     } catch (error) {
//       console.error("Error while fetching patient slot data", error);
//       console.warn("Not able to get Patient slot data");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.Heading}>BiteForce Monitor</Text>
//       <View style={styles.dataContainer}>
//         <Text style={styles.modeText}>Unilateral Left: {unilateralLeft.join(', ')}</Text>
//         <Text style={styles.modeText}>Unilateral Right: {unilateralRight.join(', ')}</Text>
//         <Text style={styles.modeText}>Bilateral Left: {bilateralLeft.join(', ')}</Text>
//         <Text style={styles.modeText}>Bilateral Right: {bilateralRight.join(', ')}</Text>
//         <Text style={styles.modeText}>Incisors: {incisors.join(', ')}</Text>
//       </View>
//       <TouchableOpacity style={styles.button} onPress={saveData}>
//         <Text style={styles.buttonText}>Save Data</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// export default Gloves;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//     padding: 20,
//     justifyContent: 'center',
//   },
//   Heading: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#0B1120',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   dataContainer: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     marginBottom: 20,
//   },
//   modeText: {
//     fontSize: 18,
//     color: '#333',
//     marginBottom: 10,
//     fontWeight: '600',
//   },
//   button: {
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     backgroundColor: '#1CAC78',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });


import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import BlSerial from 'react-native-bluetooth-serial';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const Gloves = ({ route }) => {
  const { userId, userDetails } = route.params;
  const [unilateralLeft, setUnilateralLeft] = useState([60, 43, 65,65, 80]);
  const [unilateralRight, setUnilateralRight] = useState([43, 67,100, 54]);
  const [bilateralLeft, setBilateralLeft] = useState([20,43,9]);
  const [bilateralRight, setBilateralRight] = useState([10,32]);
  const [incisors, setIncisors] = useState([32, 54, 76, 87, 92]);
  const [details, setDetails] = useState();

  const delimiter = '\n';
  let buffer = '';

  useEffect(() => {
    let isMounted = true;

    const onLoad = async () => {
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
    };

    onLoad();

    return () => {
      isMounted = false;
    };
  }, []);

  const saveData = async () => {
    const maxBilateralLeft = bilateralLeft.length > 0 ? Math.max(...bilateralLeft) : 0;
    const maxBilateralRight = bilateralRight.length > 0 ? Math.max(...bilateralRight) : 0;
    const maxUnilateralLeft = unilateralLeft.length > 0 ? Math.max(...unilateralLeft) : 0;
    const maxUnilateralRight = unilateralRight.length > 0 ? Math.max(...unilateralRight) : 0;
    const maxIncisors = incisors.length > 0 ? Math.max(...incisors) : 0;

    try {
      const response = await axios.post("https://bite-force-server.vercel.app/api/v1/savePatientSlot", {
        PatientId: userId,
        BilateralLeft: bilateralLeft,
        BilateralRight: bilateralRight,
        UnilateralLeft: unilateralLeft,
        UnilateralRight: unilateralRight,
        Incisors: incisors,
        MaxBilateralLeft: maxBilateralLeft,
        MaxBilateralRight: maxBilateralRight,
        MaxUnilateralLeft: maxUnilateralLeft,
        MaxUnilateralRight: maxUnilateralRight,
        MaxIncisors: maxIncisors
      });
      console.log("Success:", response.data);
      Alert.alert("Success! 🎉", "Reading Saved Successfully");

      await fetchPatientsDetails();
    } catch (error) {
      console.error('Error saving data: ', error);
    }
  };

  const fetchPatientsDetails = async () => {
    try {
      const response = await axios.post("https://bite-force-server.vercel.app/api/v1/getPatientDetails",
        { PatientId: userDetails.item._id }
      );
      console.log("This is the Updated Details of the Patient: ", response.data.patients);
      setDetails(response.data.patients);
      navigation.navigate('UserDetails', { item: response.data.patients });
    } catch (error) {
      console.error("Error while fetching patient slot data", error);
      console.warn("Not able to get Patient slot data");
    }
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.Heading}>BiteForce Monitor</Text>
      <View style={styles.dataContainer}>
        <Text style={styles.modeText}>Unilateral Left: {unilateralLeft.join(', ')}</Text>
        <Text style={styles.modeText}>Unilateral Right: {unilateralRight.join(', ')}</Text>
        <Text style={styles.modeText}>Bilateral Left: {bilateralLeft.join(', ')}</Text>
        <Text style={styles.modeText}>Bilateral Right: {bilateralRight.join(', ')}</Text>
        <Text style={styles.modeText}>Incisors: {incisors.join(', ')}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={saveData}>
        <Text style={styles.buttonText}>Save Data</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Gloves;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    justifyContent: 'center',
  },
  Heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0B1120',
    textAlign: 'center',
    marginBottom: 20,
  },
  dataContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  modeText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#1CAC78',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
