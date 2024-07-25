import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import BleManager from 'react-native-ble-manager'

const Techviz = ({ route }) => {
  const { pid } = route.params
  const [msg, setMsg] = useState("")

  const onLoad = () => {
    try {
      BleManager.retrieveServices(pid).then(
        (peripheralInfo) => {
          // Success code
          console.log("Peripheral info:", peripheralInfo);
        }
      );
    } catch (err) { console.log(err) }
  }


  useEffect(() => {
    onLoad()
    console.log(pid, "pid")
  }, [])
  return (
    <View>
      <TextInput
        placeholder='enter something'
        placeholderTextColor="#00000080"
        style={{
          width: "100%",
          color: "#000",
          padding: 20
        }}
      />
      <Text style={{ color: "#000", padding: 20 }}>
        {pid}
      </Text>
    </View>
  )
}

export default Techviz








// ------------------------

// import React, { useState, useEffect } from 'react';
// import {
//     Text,
//     View,
//     Platform,
//     StatusBar,
//     ScrollView,
//     FlatList,
//     StyleSheet,
//     Dimensions,
//     SafeAreaView,
//     NativeModules,
//     useColorScheme,
//     TouchableOpacity,
//     NativeEventEmitter,
//     PermissionsAndroid,
//     Alert,
// } from 'react-native';
// import BleManager from 'react-native-ble-manager';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
// import { styles } from '../constants/styles';
// import { DeviceList } from '../components/DeviceList';

// const BleManagerModule = NativeModules.BleManager;
// const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const Home = ({ navigation }) => {
//     const peripherals = new Map()
//     const [connectedDevices, setConnectedDevices] = useState([]);
//     const [isScanning, setIsScanning] = useState(false);
//     const [discoveredDevices, setDiscoveredDevices] = useState([]);
//     const [reload, setReload] = useState(0)
//     const isDarkMode = useColorScheme() === 'dark';
//     const backgroundStyle = {
//         backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//     };

//     const blueCONN = async () => {
//         if (Platform.OS === 'android' && Platform.Version >= 23) {
//             console.log("in")
//             try {
//                 const granted = await PermissionsAndroid.request(
//                     PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
//                 );

//                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                     console.log('CONNECTION permission granted');
//                 } else {
//                     console.log('CONNECTION permission denied');
//                 }
//             } catch (error) {
//                 console.log('Error requesting CONNECTION permission:', error);
//             }
//         }
//     }

//     useEffect(() => {
//         if (Platform.OS === 'android' && Platform.Version >= 23) {
//             PermissionsAndroid.check(
//                 PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             ).then(result => {
//                 if (result) {
//                     console.log('Permission is OK');
//                 } else {
//                     PermissionsAndroid.request(
//                         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                     ).then(result => {
//                         if (result) {
//                             console.log('User accept');
//                         } else {
//                             console.log('User refuse');
//                         }
//                     });
//                 }
//             })
//         }
//         blueCONN()
//         BleManager.start({ showAlert: false }).then(() => {
//             console.log('BleManager initialized');
//             handleGetConnectedDevices();
//         });

//         let stopDiscoverListener = BleManagerEmitter.addListener(
//             'BleManagerDiscoverPeripheral',
//             peripheral => {
//                 peripherals.set(peripheral.id, peripheral);
//                 // setDiscoveredDevices(Array.from(peripherals.values()));
//             },
//         );

//         let stopConnectListener = BleManagerEmitter.addListener(
//             'BleManagerConnectPeripheral',
//             peripheral => {
//                 console.log('BleManagerConnectPeripheral:', peripheral);
//             },
//         );

//         let stopScanListener = BleManagerEmitter.addListener(
//             'BleManagerStopScan',
//             () => {
//                 setIsScanning(false);
//                 console.log('Scan is stopped');
//             },
//         );

//         return () => {
//             stopDiscoverListener.remove();
//             stopConnectListener.remove();
//             stopScanListener.remove();
//         };
//     }, [reload])
//     const startScan = () => {
//         if (!isScanning) {
//             PermissionsAndroid.check(
//                 PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//             ).then(result => {
//                 if (result) {
//                     if (!isScanning) {
//                         BleManager.scan([], 10, true)
//                             .then(() => {
//                                 setReload((prev) => prev + 1)
//                                 handleGetConnectedDevices();
//                                 console.log('Scanning...');
//                                 setIsScanning(true);
//                             })
//                             .catch(error => {
//                                 console.error(error);
//                             });
//                     }
//                 } else {
//                     PermissionsAndroid.request(
//                         PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
//                     ).then(result => {
//                         if (result) {
//                             console.log('User accept');
//                         } else {
//                             console.log('User refuse');
//                         }
//                     });
//                 }
//             })

//         }
//     };


//     const connect = peripheral => {
//         BleManager.createBond(peripheral.id)
//             .then(() => {
//                 peripheral.connected = true;
//                 peripherals.set(peripheral.id, peripheral);
//                 let devices = Array.from(peripherals.values());
//                 console.log(devices)
//                 setConnectedDevices(Array.from(devices));
//                 discoveredDevices.pop(Array.from(devices))
//                 console.log(connectedDevices)
//                 // setDiscoveredDevices(Array.from(devices));
//                 console.log('BLE device paired successfully');
//                 BleManager.retrieveServices(peripheral.id, []).then(
//                     (peripheralInfo) => {
//                         // Success code
//                         console.log("Peripheral info:", peripheralInfo);
//                     }
//                 ).catch(err=>console.log(err))
//             })
//             .catch(() => {
//                 throw Error('failed to bond');
//             });
//         // BleManager.read(peripheral.id)
//         //     .then()
//     };

//     const disconnect = peripheral => {
//         BleManager.removeBond(peripheral.id)
//             .then(() => {
//                 peripheral.connected = false;
//                 peripherals.set(peripheral.id, peripheral);
//                 let devices = Array.from(peripherals.values());
//                 // setConnectedDevices(Array.from(devices));
//                 setDiscoveredDevices(Array.from(devices));
//                 connectedDevices.pop(Array.from(devices))
//                 Alert.alert(`Disconnected from ${peripheral.name}`);
//             })
//             .catch(() => {
//                 throw Error('fail to remove the bond');
//             });
//     };


//     const handleGetConnectedDevices = () => {
//         BleManager.getBondedPeripherals([]).then(results => {
//             for (let i = 0; i < results.length; i++) {
//                 let peripheral = results[i];
//                 peripheral.connected = true;
//                 peripherals.set(peripheral.id, peripheral);
//                 setConnectedDevices(Array.from(peripherals.values()));

//             }

//         });
//     };
//     return (
//         <SafeAreaView style={[backgroundStyle, styles.container]}>
//             <StatusBar
//                 barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//                 backgroundColor={backgroundStyle.backgroundColor}
//             />
//             <View style={{ paddingHorizontal: 20 }}>
//                 <Text
//                     style={[
//                         styles.title,
//                         { color: isDarkMode ? Colors.white : Colors.black },
//                     ]}>
//                 </Text>
//                 <TouchableOpacity
//                     onPress={startScan}
//                     activeOpacity={0.5}
//                     style={styles.scanButton}>
//                     <Text style={styles.scanButtonText}>
//                         {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
//                     </Text>
//                 </TouchableOpacity>

//                 <Text
//                     style={[
//                         styles.subtitle,
//                         { color: isDarkMode ? Colors.white : Colors.black },
//                     ]}>
//                     Discovered Devices:
//                 </Text>
//                 {discoveredDevices.length > 0 ? (
//                     <FlatList
//                         data={discoveredDevices}
//                         renderItem={({ item }) => (
//                             <DeviceList
//                                 peripheral={item}
//                                 connect={connect}
//                                 disconnect={disconnect}
//                             />
//                         )}
//                         keyExtractor={item => item.id}
//                     />
//                 ) : (
//                     <Text style={styles.noDevicesText}>No Bluetooth devices found</Text>
//                 )}

//                 <Text
//                     style={[
//                         styles.subtitle,
//                         { color: isDarkMode ? Colors.white : Colors.black },
//                     ]}>
//                     Connected Devices:
//                 </Text>
//                 {connectedDevices.length > 0 ? (
//                     <FlatList
//                         data={connectedDevices}
//                         renderItem={({ item }) => (
//                             <DeviceList
//                                 peripheral={item}
//                                 connect={connect}
//                                 disconnect={disconnect}
//                             />
//                         )}
//                         keyExtractor={item => item.id}
//                     />
//                 ) : (
//                     <Text style={styles.noDevicesText}>No connected devices</Text>
//                 )}
//             </View>
//         </SafeAreaView>
//     );
// };
// const windowHeight = Dimensions.get('window').height;
// const Styles = StyleSheet.create({
//     mainBody: {
//         flex: 1,
//         justifyContent: 'center',
//         height: windowHeight,
//     },
//     buttonStyle: {
//         backgroundColor: '#307ecc',
//         borderWidth: 0,
//         color: '#FFFFFF',
//         borderColor: '#307ecc',
//         height: 40,
//         alignItems: 'center',
//         borderRadius: 30,
//         marginLeft: 35,
//         marginRight: 35,
//         marginTop: 15,
//     },
//     buttonTextStyle: {
//         color: '#FFFFFF',
//         paddingVertical: 10,
//         fontSize: 16,
//     },
// });
// export default Home;