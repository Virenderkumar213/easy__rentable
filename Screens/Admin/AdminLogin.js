import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
//import { database } from '../../firebase'
import {useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import {firebase} from '../Admin/firebase';
//import firestore from '@react-native-firebase/firestore';

const AdminLoginScreen = () => {
  const [UserName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleAdminLogin = () => {
    let hook = false;
    firebase
      .firestore()
      .collection('Admin')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          let data = documentSnapshot.data();
          let dbUserName = data['UserName'];
          let dbPassword = data['Password'];
          console.log(UserName, dbUserName, password, dbPassword);
          if (dbUserName == UserName && dbPassword == password) {
            console.log(hook);
            hook = true;
            alert('logged in!');
            navigation.navigate('Home');
          } else {
            alert('you entered wrong username or password.');
          }
          firebase
            .firestore()
            .collection('product')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                let data = documentSnapshot.data();
                console.log(UserName, dbUserName, password, dbPassword);
                if (dbUserName == UserName && dbPassword == password) {
                  console.log(hook);
                  hook = true;
                  alert('logged in!');
                  navigation.navigate();
                }
              });
            });
        });
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={{backgroundColor: 'white'}}>
        <View style={{margin: 10, padding: 5}}></View>

        <View style={styles.inputContainer}>
          <TextInput
            style={{width: '70%', display: 'flex', alignItems: 'center'}}
            placeholder="UserName"
            value={UserName}
            onChangeText={text => setUserName(text)}
            styles={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.passwordInput}
            secureTextEntry
          />
          <View style={{margin: 20, padding: 5}}></View>

          <TouchableOpacity
            onPress={() => handleAdminLogin()}
            style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={{margin: 200, padding: 5}}></View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  inputContainer: {
    backgroundColor: 'white',
    borderColor: 'black',
    margin: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 75,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonContainer: {
    margin: 15,
    padding: 50,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#0782F9',
    width: 120,

    padding: 15,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: 'blue',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  Adminbuttontext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },

  passwordInput: {
    backgroundColor: 'white',
    paddingHorizontal: 58,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
});
export default AdminLoginScreen;
