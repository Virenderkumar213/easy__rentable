import {
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { ScrollView } from 'react-native';
import { firebase } from '../Screens/firebase';
import { useState } from 'react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const handleLogin = () => {
    // navigation.navigate('Home');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid;
        AsyncStorage.setItem('@signUpData', JSON.stringify(uid));
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .get()
          .then(firestoreDocument => {
            if (!firestoreDocument.exists) {
              alert('User does not exist anymore.');
              return;
            }

            const user = firestoreDocument.data();
            var emaill = email;
            var name = emaill.substring(0, emaill.lastIndexOf("@"));
            if (name == "admin") {
              navigation.navigate('dashboard');
            }
            else {
              navigation.navigate('Home', { user });
            }
            
          })
          .catch(error => {
            alert(error);
          });
      })
      .catch(error => {
        alert(error);
      });
    //navigation.replace('Home');
    //   let em = email;
    //   let atpos = em.indexOf("@");
    //   let domain = em.split("@")[1];
    //   if (em == null || em == "") {
    //     alert("Email can not be empty.");
    //     return false;
    //   }
    //   else if (atpos < 1 || domain != "szabist.pk") {
    //     alert("Not a valid e-mail address. Please write your gmail address like this: BBA1213456@szabist.pk \n cs1812345@szabist.pk " + atpos + " " + domain[1] + "");
    //     return false;
    //   }
    //   else {

    //   auth
    //     .signInWithEmailAndPassword(email, password)
    //     .then(userCredentials => {
    //       const user = userCredentials.user;
    //       console.log('Logged in with:', user.email);
    //     })
    //     .catch(error => alert(error.message))
    // }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.3,justifyContent: 'center',alignItems: 'center' }}>
        <Image source={require('../pictures/images/logo-remov.png')} style={{width: 100,height: 100}}/>
      </View>
      <View style={styles.bottomview}>
        <View style={{ padding: 40 }}>
          <Text style={{ color: '#0B80F9', fontSize: 34, alignSelf: 'center' }}>Welcome</Text>
          <Text style={{ color: '#000',marginTop: 10,fontSize: 17,width: '100%',textAlign: 'center'}}>Success is never Owned, It's Rented. And The Rent is Due EVERYDAY</Text>
          <View style={{ marginTop: 40 }}></View>
          <View style={{
            width: '90%',
            backgroundColor: '#D1D3D7',
            borderRadius: 10,

            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            alignSelf: 'center'
          }}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={'#000'}
              value={email}
              onChangeText={text => setEmail(text)}
              style={{ marginLeft: 5, width: '85%', color: '#000', }}
            />
          </View>
          <View style={{
            width: '90%',
            backgroundColor: '#D1D3D7',
            borderRadius: 10,
            marginTop: '5%',

            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            alignSelf: 'center'
          }}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'#000'}
              value={password}
              onChangeText={text => setPassword(text)}
              style={{ marginLeft: 5, width: '85%', color: '#000' }}
              secureTextEntry
            />
          </View>
          <View style={{ flex: 0.05 }}></View>
          <View style={{ alignItems: 'center', marginTop: '10%', }}>
            <TouchableOpacity
              onPress={() => handleLogin()}
              style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={{ margin: 10, padding: 5 }}>
              <View style={{ margin: 10, padding: 5 }}></View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#000', fontSize: 17 }}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text
                  style={{ color: '#0B80F9', marginLeft: 5, fontSize: 17 }}>
                  Register now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    flex: 1,
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
    borderColor: 'maroon',
    borderWidth: 1,
  },
  buttonContainer: {
    margin: 15,
    padding: 10,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#0B80F9',
    width: '50%',
    padding: 15,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: 'maroon',
    marginTop: 5,
    borderColor: '#0B80F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    letterSpacing: 0.25,
    alignItems: 'center',
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
  },
  Adminbuttontext: {
    color: 'black',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  EmailInput: {
    backgroundColor: 'white',
    width: '80%',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 1,
    color: '#000'
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
  brandViewText: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomview: {
    flex: 0.7,
    backgroundColor: '#ffffff',
    bottom: 50,

  },
});
export default LoginScreen;
