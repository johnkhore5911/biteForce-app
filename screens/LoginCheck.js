import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView,Alert } from 'react-native';
import COLORS from '../constants/Colors'; // Ensure this path is correct
import Button from '../components/Button.js'; // Ensure this path is correct
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


function LoginCheck() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const navigation = useNavigation();

    const onLogin = async() => {
        console.log("Login pressed");
        // navigation.navigate('Main');
        try{
            const response = await axios.post(
                "https://bite-force-server.vercel.app/api/v1/login",
                {
                    email,
                    password,
                }
            )
            console.log("Login successfully",response.data);
            if(response.data.success==true){
                Alert.alert("Success! 🎉", "The User has been Login successfully.");

                const storeData = async (value) => {
                    try {
                      await AsyncStorage.setItem('token', value);
                      console.log("saved")
                      console.warn("saved token",value);
                      console.log(value)
                    } catch (e) {
                        console.warn("Error while saving userId in async storage",e);
                    }
                };
                storeData(response.data.userId);


                navigation.navigate("Main");

            }

    
        }
        catch(error){
            console.error("Error during Sign Up",error);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Enter your email and password</Text>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email address</Text>
                    <TextInput
                        placeholder='Enter your email address'
                        placeholderTextColor="#00000080"
                        keyboardType='email-address'
                        onChangeText={(text) => setEmail(text)}
                        style={styles.textInput}
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor="#00000080"
                            secureTextEntry={!isPasswordShown}
                            onChangeText={(text) => setPassword(text)}
                            style={styles.textInput}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={styles.togglePassword}
                        >
                            <Text style={styles.togglePasswordText}>{isPasswordShown ? 'Hide' : 'Show'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Login Button */}
                <Button
                    onPress={onLogin}
                    title="Login"
                    filled
                    style={styles.button}
                />

                {/* Navigate to Sign Up */}
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                        <Text style={styles.signUpLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
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
        marginTop:5
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

export default LoginCheck;
