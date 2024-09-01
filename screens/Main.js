import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [newUserAge, setNewUserAge] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const usersCollection = await firestore().collection('users').get();
      setUsers(usersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const addUser = async () => {
    if (newUserName && newUserAge) {
      const newUser = { name: newUserName, age: newUserAge };
      const addedUser = await firestore().collection('users').add(newUser);
      setUsers([...users, { id: addedUser.id, ...newUser }]);
      setNewUserName('');
      setNewUserAge('');
    }
  };

  const navigateToUser = (user) => {
    navigation.navigate('UserDetails', { user });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New User</Text>
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
        <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity>

      <View style={styles.prevUsers}>
        <Text style={styles.prevUsersText}>Past Users</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToUser(item)}>
            <Text style={styles.userItem}>{(item.name).toUpperCase()}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f3f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#0B1120',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    color: '#0B1120',
    borderRadius:20,
    paddingLeft:20,
    borderWidth:1,
  },
  userItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#0B1120',
    fontWeight:`bold`,
    marginBottom:10,
    borderWidth:1,
    borderColor:`#B2BEB5`,
    borderRadius:15,
    fontSize:16

  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    // backgroundColor: '#111',
    backgroundColor:`#1CAC78`,
    borderRadius: 10,
    position: 'relative',
    marginBottom:10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight:'500'
    },
  prevUsers:{
    padding:10
  },
  prevUsersText:{
    fontSize:18
  },
});
