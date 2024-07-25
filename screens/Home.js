import React, { useState, useEffect, useRef } from 'react';
import {
    Text,
    View,
    Button,
    Platform,
    StatusBar,
    ScrollView,
    FlatList,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    NativeModules,
    useColorScheme,
    TouchableOpacity,
    NativeEventEmitter,
    PermissionsAndroid,
    Alert,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import { styles } from '../constants/styles';
import { DeviceList } from '../components/DeviceList';
import BlSerial from 'react-native-bluetooth-serial';
import Loader from '../Modals/Loader';
import { green100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';


const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const Home = ({ navigation }) => {
    const peripherals = new Map()
    const [connectedDevices, setConnectedDevices] = useState([]);
    const [connected, setConnected] = useState(false)
    const [receivedData, setReceivedData] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [discoveredDevices, setDiscoveredDevices] = useState([]);
    const [reload, setReload] = useState(0)
    const [loader, setLoader] = useState()
    const [dataref,setDataref] = useState([])
    const loadref = useRef(true)
    const [loadState, setLoadState]= useState()
    const disconref = useRef([])
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const blueCONN = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            console.log("in")
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('CONNECTION permission granted');
                } else {
                    console.log('CONNECTION permission denied');
                }
            } catch (error) {
                console.log('Error requesting CONNECTION permission:', error);
            }
        }
    }

    useEffect(() => {
        let subscription;
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then(result => {
                if (result) {
                    console.log('Permission is OK');
                } else {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    ).then(result => {
                        if (result) {
                            console.log('User accept');
                        } else {
                            console.log('User refuse');
                        }
                    });
                }
            })
        }
        blueCONN()
        BlSerial.isEnabled()
            .then(enabled => console.log('Bluetooth enabled:', enabled))
            .catch(err => console.error('Error checking Bluetooth status:', err));

        subscription = BlSerial.on('bluetoothDeviceFound', (device) => {
            setDiscoveredDevices(prevDevices => [...prevDevices, device]);
        });
        return () => {
            if (subscription) {
                subscription.remove();
            }
        }
    }, [reload])
    const startScan = () => {
        setLoadState(<Loader visible={loadref.current}/>)
        if (!isScanning) {
            PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            ).then(result => {
                if (result) {
                    BlSerial.list()
                        .then(devices => {
                            setTimeout(()=>{
                                setLoadState(<></>)
                            },2500)
                            setDiscoveredDevices(devices)
                        })
                        .catch(err => console.error('Error scanning devices:', err));
                } else {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                    ).then(result => {
                        if (result) {
                            console.log('User accept');
                        } else {
                            console.log('User refuse');
                        }
                    });
                }
            })

        }
    };
    // const readData = async () => {
    //     for (var i = 1; i > 0; i++) {
    //         const result = await BlSerial.readFromDevice();
    //         if (result !== "" ) {
    //         console.log("RESULT in Home: ",result);
    //             console.log(result);
    //             // Append received data to buffer
    //             if(result!=0){
    //                 // dataref.current += result;
    //                 setDataref(prev=> [...prev,result])
    //                 console.log("dataref",dataref)
    //                 // Set receivedData state with buffer content
    //                 setReceivedData(dataref.current);
    //             }
    //         }
    //     }
    // }
    const readData = () => {
        const intervalId = setInterval(async () => {
            const result = await BlSerial.readFromDevice();
            if (result !== "") {
                console.log("RESULT in home: ", result);
                if (result != 0) {
                    setDataref(prev => [...prev, result]);
                    console.log("dataref", dataref);
                    setReceivedData(dataref.join(''));
                }
            }
        }, 1000); // Adjust the interval as needed
    
        // Clear the interval when the component unmounts or the device disconnects
        return () => clearInterval(intervalId);
    };
    const connectToDevice = async (device) => {
        setLoadState(<Loader visible={loadref.current}/>)
        await BlSerial.connect(device.id)
            .then(async () => {
                setLoadState(<></>)
                console.log('Connected to device:', device.name);
                console.log(device)
                setDiscoveredDevices(prev => prev.filter(dev => dev.id !== device.id))
                connectedDevices.push(device);
                setConnected(true)
                console.log(connectedDevices, "connected")
                console.log(discoveredDevices, "Discovered")
                readData()
                await navigation.navigate('Gloves', {data: dataref})
                

            })
            .catch(err => {
                setLoadState(<></>)
                Alert.alert(`Unable to connect with ${device.name} : ${err}`)
                console.log(err)
            });

        // readData()
    };
    const disconnectToDevice = async (device) => {
        await BlSerial.disconnect()
            .then(() => {
                console.log("Disconnected to device:", device.name)
                setConnectedDevices(prev => prev.filter(dev => dev.id !== device.id))
                discoveredDevices.push(device);
            })
    }
    // const renderItem = ({ item }) => (
    //     <View style={{ marginVertical: 5 }}>
    //         <Button title={item.name} onPress={async () => {
    //             await connectToDevice(item)
    //             // navigation.navigate('Gloves', { data: item })
    //             navigation.navigate('Gloves', { data: item })

    //         }} />
    //     </View>
    // );

    const renderItem = ({ item }) => (
        <View style={{ marginVertical: 5 }}>
            <Button title={item.name} onPress={async () => {
                await connectToDevice(item);
                navigation.navigate('Gloves', { data: dataref, device: item });
            }} />
        </View>
    );
    return (
        <SafeAreaView style={[backgroundStyle, styles.container]}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />


            <View>
                {loadState}
                <View style={{marginTop: 15}}>
                <Button title="Scan Devices" color="#208b81" onPress={startScan} />
                </View>
                <Text style={[
                    styles.subtitle,
                    { color: isDarkMode ? Colors.white : Colors.black },
                ]}>Paired Devices: ({discoveredDevices.length})</Text>
                <FlatList
                    data={discoveredDevices}
                    renderItem={({ item }) => (
                        <DeviceList peripheral={item} btnFunc={connectToDevice} con={false} />
                    )}
                    keyExtractor={item => item.id}
                />
                <Text style={[
                    styles.subtitle,
                    { color: isDarkMode ? Colors.white : Colors.black },
                ]}>Connected Devices:({connectedDevices.length})</Text>
                <FlatList
                    data={connectedDevices}
                    renderItem={({ item }) => (
                        <DeviceList peripheral={item} btnFunc={disconnectToDevice} con={true} />
                    )}
                    keyExtractor={item => item.id}
                />
                {/* {connectedDevices && (
                    <View>
                        <Text>Connected to: {connectedDevices.name}</Text>
                        <Text>Received data: {dataref.current}</Text>
                    </View>
                )} */}
                
            </View>
        </SafeAreaView>

    );
};
const windowHeight = Dimensions.get('window').height;
const windowstyles = StyleSheet.create({
    container: {
        backgroundColor: '#CCCCCC',
        height: Dimensions.get('window').height,
        padding: 15,
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        paddingTop: 50
    }
});
export default Home;