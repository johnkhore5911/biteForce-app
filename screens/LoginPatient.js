import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import COLORS from '../constants/Colors'; // Ensure this path is correct
import Button from '../components/Button.js'; // Ensure this path is correct
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginPatient({ navigation }) {
    const [patientId, setPatientId] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigation();

    const onLogin = async() => {
        console.log("Login pressed");
        // navigation.navigate("UserDetails");
        // Handle login logic here (e.g., authentication with Firebase)
        try{
            const response = await axios.post("https://bite-force-server.vercel.app/api/v1/getPatientId",
                {
                    PatientId:patientId,
                    name,
                    Age:age
                }
            )
            console.log(response.data)
            console.log("User id is this -> ",response.data.UserId);
            
            try {
              const response2 = await axios.post("https://bite-force-server.vercel.app/api/v1/getPatientDetails",
                { PatientId: response.data.UserId }
              );
              console.log("This is the Updated Details of the Patient: ", response2.data.patients);
                const storeData = async (value) => {
                    try {
                      await AsyncStorage.setItem('token', value);
                      console.log("saved token:",value)
                      console.warn("saved token:",value)
                      console.log(value)
                    } catch (e) {
                        console.warn("Error while saving userId in async storage",e);
                    }
                };
                storeData(response2.data.patients._id);
                navigation.navigate('PatientDetails', { item: response2.data.patients });
            } catch (error) {
              console.error("Error while fetching patient slot data", error);
              console.warn("Not able to get Patient slot data");
            }
    //   };

        }
        catch(error){
            console.error(error);
            console.log("Error while Login the Patient")
        }
    };



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Enter your details to log in</Text>

                {/* Patient ID Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Patient ID</Text>
                    <TextInput
                        placeholder='Enter your Patient ID'
                        placeholderTextColor="#00000080"
                        onChangeText={(text) => setPatientId(text)}
                        style={styles.textInput}
                    />
                </View>

                {/* Name Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        placeholder='Enter your name'
                        placeholderTextColor="#00000080"
                        onChangeText={(text) => setName(text)}
                        style={styles.textInput}
                    />
                </View>

                {/* Age Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Age</Text>
                    <TextInput
                        placeholder='Enter your age'
                        placeholderTextColor="#00000080"
                        keyboardType='numeric'
                        onChangeText={(text) => setAge(text)}
                        style={styles.textInput}
                    />
                </View>


                {/* Login Button */}
                <Button
                    onPress={onLogin}
                    title="Login"
                    filled
                    style={styles.button}
                />

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 22,
    },
    title: {
        fontSize: 30, // Increased font size
        fontWeight: 'bold',
        marginVertical: 12,
        color: "#208B81",
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: "#222",
        textAlign: 'center',
        marginBottom: 20, // Added space below subtitle
    },
    inputContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        color: "#000",
        fontWeight: '400',
        marginVertical: 8,
        textAlign: 'left', // Align label text to the left
    },
    textInput: {
        width: "100%",
        height: 48,
        // borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 22,
        color: "#000",
    },
    passwordContainer: {
        position: 'relative',
    },
    togglePassword: {
        position: "absolute",
        right: 12,
        top: 8,
    },
    togglePasswordText: {
        color: COLORS.primary,
        marginTop: 5,
    },
    button: {
        marginTop: 18,
        marginBottom: 4,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    signUpText: {
        fontSize: 14,
        color: '#000',
    },
    signUpLink: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default LoginPatient;
