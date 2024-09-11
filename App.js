//toshow
import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import {
  NavigationContainer,
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Welcome from './screens/Welcome.js';
import Icon from 'react-native-vector-icons/Entypo';
import Techviz from './InsideScreens/Techviz.js';
import Gloves from './InsideScreens/Gloves.js';
import DrawerContent from './InsideScreens/DrawerContent.js';
import {DeviceList} from './components/DeviceList.js';
import Main from './screens/Main.js';
import UserDetails from './screens/UserDetails.js';
import SlotGraph from './InsideScreens/SlotGraph.js';
import LoginCheck from './screens/LoginCheck.js';
import SignUpCheck from './screens/SignUpCheck.js';
import PreWelcome from './screens/PreWelcome.js';
import LoginPatient from './screens/LoginPatient.js';
import MaxValuesGraph from './InsideScreens/MaxValuesGraph.js';
import PatientDetails from './screens/PatientDetails.js';


const InsideLayout = () => {
  const InsideStack = createNativeStackNavigator();
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);
  const [userData, setUser] = useState([]);
  const [userState, setUserState] = useState(false);
  const [email, setEmail] = useState('');
  const [uid, setUid] = useState('');

  const authChanged = user => {
    setUser(user);
    // console.log(user)
    if (user) {
      setUserState(true);
    }
    if (!user) {
      setUserState(false);
    }
    if (initializing) setInitializing(false);
  };

  const check = () => {
    if (initializing) {
      return null;
    }
    console.log(userState);
  };

  // useEffect(() => {
  //   auth().onAuthStateChanged(authChanged);
  //   if (userData) {
  //     setUserState(true);
  //     console.log(userState);
  //   }
  //   check();
  // }, []);

  return (
    <InsideStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleStyle: {
          color: 'black',
        },
        drawerStatusBarAnimation: 'slide',
        headerTintColor: '#208B81',
      }}>
      {userState ? (
        <>
          <InsideStack.Screen
            name="Home"
            //compoment is home so replace it later on
            component={Main}
            options={{
              headerLeft: () => {
                return (
                  <Icon
                    name="menu"
                    onPress={() =>
                      navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                    size={30}
                    color="black"
                  />
                );
              },
              headerTitleAlign: 'center',
            }}
          />
        </>
      ) : (
        <>
          <InsideStack.Screen
          name="PreWelcome"
          component={PreWelcome}
          options={{
            headerShown: false,
          }}
          />
        </>
      )}
      <InsideStack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <InsideStack.Screen
        name="LoginScreen"
        component={LoginCheck}
        options={{
          headerShown: false,
        }}
      />
      <InsideStack.Screen
        name="LoginPatient"
        component={LoginPatient}
        options={{
          headerShown: false,
        }}
      />
      <InsideStack.Screen
        name="PatientDetails"
        component={PatientDetails}
        options={{
          headerShown: false,
        }}
      />
      <InsideStack.Screen
        name="SignUpScreen"
        component={SignUpCheck}
        options={{
          headerShown: false,
        }}
      />

      <InsideStack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
      <InsideStack.Screen
        name="MaxValuesGraph"
        component={MaxValuesGraph}
        options={{
          headerShown: false,
        }}
      />
      <InsideStack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{
          headerShown: false,
        }}
      />
      <InsideStack.Screen
        name="SlotGraph"
        component={SlotGraph}
        options={{
          headerShown: false,
        }}
      />

      <InsideStack.Screen name="Techviz" component={Techviz} />
      <InsideStack.Screen
        name="Gloves"
        component={Gloves}
        options={{
          headerShown: false,
        }}
      />
      <InsideStack.Screen name="DeviceList" component={DeviceList} />
    </InsideStack.Navigator>
  );
};

const DrawerNav = props => {
  // const [email, setEmail] = useState('')
  // const [username, setUsername] = useState('')
  // useEffect(() => {
  //   const user = auth().currentUser

  //   const onLoad = async () => {
  //     try {
  //       const userData = await firestore().collection('Users').doc(user.uid).get()
  //       const data = userData.data();
  //       setUsername(data.Name)
  //       setEmail(user.email)
  //     } catch (err) { console.log(err) }
  //   }
  //   onLoad()
  // }, [])
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Home" component={InsideLayout} />
    </Drawer.Navigator>
  );
};

function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <DrawerNav />
    </NavigationContainer>
  );
}

export default App;
