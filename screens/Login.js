import React, { useState } from 'react'
import { View, Text, Image, Pressable, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/Colors';
import CheckBox from "react-native-checkbox"
import Button from '../components/Button.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function Login({ navigation }) {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('')

  const onLogin = async () => {
    await auth().signInWithEmailAndPassword(email, pass).then(async () => {
      const user = auth().currentUser;
      setEmail(user.email)
      navigation.replace('Home', { userEmail: email })
    })
    console.log("user Valid")
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
            Hi Welcome Back ! 👋
          </Text>

          <Text style={{
            fontSize: 16,
            color: "#000"
          }}>Hello again you have been missed!</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            color: "#000",
            fontSize: 16,
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
              onChangeText={(text) => setEmail(text)}
              keyboardType='email-address'
              style={{
                width: "100%",
                color: "#000",
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
                width: "100%",
                color: "#000"
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12
              }}
            >

            </TouchableOpacity>
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
          marginVertical: 6
        }}>
          <CheckBox
            label="Remember me"
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : COLORS.black}
          />
        </View>

        <Button
          onPress={onLogin}
          title="Login"
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
          <Text style={{ fontSize: 14, color: "#000" }}>Or Login with</Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10
            }}
          />
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10
            }}
          >
            <Image
              source={require("../Assets/facebook.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8
              }}
              resizeMode='contain'
            />

            <Text style={{ color: "#000" }}>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10
            }}
          >
            <Image
              source={require("../Assets/google.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8
              }}
              resizeMode='contain'
            />

            <Text style={{ color: "#000" }}>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 22
        }}>
          <Text style={{ fontSize: 16, color: "#000" }}>Don't have an account ? </Text>
          <Pressable
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={{
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: "bold",
              marginLeft: 6
            }}>Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login