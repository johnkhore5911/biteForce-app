import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/Colors';
import CheckBox from "react-native-checkbox";
import Button from '../components/Button.js';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

function SignUpCheck() {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [phno, setPhno] = useState('');
    const [username, setUsername] = useState('');
    const navigation = useNavigation();

    const onSignup = async ()=>{
        try{
            const response = await axios.post(
                "http://192.168.18.208:3000/api/v1/signup",
                {
                    name:username,
                    email,
                    mobileNumber:phno,
                    password:pass,
                }
            )
            console.log("SignUp successfully",response.data);
            console.warn(response.data);
            if(response.data.success==true){
                Alert.alert("Success! 🎉", "The User has been Created successfully. Welcome aboard!");
                navigation.navigate("LoginScreen");
            }
    
        }
        catch(error){
            console.error("Error during Sign Up",error);
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: "#208B81"
                    }}>
                        Create Account
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        color: "#222"
                    }}>Create a free account</Text>
                </View>
                {/* Existing form fields */}
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        color: "#000",
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Name</Text>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your full name'
                            placeholderTextColor="#00000080"
                            onChangeText={(text) => setUsername(text)}
                            style={{
                                width: "100%",
                                color: "#000"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        color: "#000",
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Email address</Text>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your email address'
                            placeholderTextColor="#00000080"
                            keyboardType='email-address'
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                width: "100%",
                                color: "#000"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        color: "#000",
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Mobile Number</Text>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 10
                    }}>
                        <TextInput
                            placeholder='+91'
                            placeholderTextColor="#00000080"
                            keyboardType='numeric'
                            editable={false}
                            style={{
                                color: "#208B81",
                                width: "12%",
                                borderRightWidth: 1,
                                borderLeftColor: COLORS.grey,
                                height: "100%"
                            }}
                        />
                        <TextInput
                            placeholder='Enter your phone number'
                            placeholderTextColor="#00000080"
                            keyboardType='numeric'
                            onChangeText={(text) => setPhno(text)}
                            style={{
                                width: "85%",
                                color: "#000"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        color: "#000",
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>
                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor="#00000080"
                            onChangeText={(text) => setPass(text)}
                            secureTextEntry={true}
                            style={{
                                color: "#000",
                                width: "100%"
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        />
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    <CheckBox
                        style={{ marginRight: 8 }}
                        label="I agree to the terms and condition"
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    />
                </View>

                <Button
                    onPress={onSignup}
                    title="Sign Up"
                    filled
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
                    <Text style={{ fontSize: 15, color: '#000' }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={{ color: COLORS.primary, fontSize: 15, fontWeight: 'bold' }}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SignUpCheck;
