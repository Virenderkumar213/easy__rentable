import { Alert, Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { firebase } from '../Screens/firebase';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    let em = email;
    let atpos = em.indexOf('@');
    let domain = em.split('@')[1];

    if (em == null || em == '') {
      alert('Email can not be empty.');
      return;
    } else if (atpos < 1 || domain != 'szabist.pk') {
      alert(
        'Not a valid e-mail address. Please write your gmail address like this: BBA1234567@szabist.pk.' +
        atpos +
        ' ' +
        domain[1] +
        '',
      );

      return;
    } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const uid = response.user.uid;
        // AsyncStorage.setItem('@signUpData', JSON.stringify(uid));

        var user = firebase.auth().currentUser;
        console.log('User: ', user.emailVerified)

        if (user.emailVerified == false) {
          user.sendEmailVerification().then(function () {
              Alert.alert(
                "Verification!",
                "Please Check Your Email for Verification.",
                [
                  {
                    text: "Cancel",
                    onPress: () => navigation.navigate('Login'),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => navigation.navigate('Login') }
                ]
              );
          }
          ).catch(function (error) {
            alert(error);
          }
          );
        }

        const data = {
          id: uid,
          email,
          fullName,
          mobileNumber,
        };
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .set(data)
          .then((res) => {
            // var emaill = email;
            // var name = emaill.substring(0, emaill.lastIndexOf("@"));
            // if (name == "admin") {
            //   navigation.navigate('dashboard');
            // }
            // else {
            //   navigation.navigate('Home');
            // }
          })
          .catch(error => {
            alert(error);
          });
      })
      .catch(error => {
        alert(error);
      });

    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.1, justifyContent: 'flex-end' }}>
        <Text style={{ fontSize: 30, color: '#0B80F9' }}>Sign Up</Text>
      </View>
      <View style={{ flex: 0.9, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
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
        }}>
          <TextInput
            placeholderTextColor={'#000'}
            placeholder="Full Name"
            value={fullName}
            onChangeText={text => setFullName(text)}
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
        }}>
          <TextInput
            placeholderTextColor={'#000'}
            placeholder="Email"
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
        }}>
          <TextInput
            placeholderTextColor={'#000'}
            placeholder="Mobile Number"
            value={mobileNumber}
            onChangeText={text => setMobileNumber(text)}
            style={{ marginLeft: 5, width: '85%', color: '#000', }}
          />
        </View>
        <View style={{
          width: '90%',
          backgroundColor: '#D1D3D7',
          borderRadius: 10,
          marginTop: '5%'
        }}>
          <TextInput
            placeholderTextColor={'#000'}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={{ marginLeft: 5, width: '85%', color: '#000', }}
            secureTextEntry
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
        }}>
          <TextInput
            placeholderTextColor={'#000'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            style={{ marginLeft: 5, width: '85%', color: '#000', }}
            secureTextEntry
          />
        </View>


        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignUp} style={[styles.button]}>
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
          <View style={{ margin: 10, padding: 5, color: 'white' }}>
            {/* <View style={styles.button}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.button}>
                <Text style={styles.buttonOutlineText}>Login</Text>
              </TouchableOpacity>
            </View> */}
            <View style={{ margin: 10, padding: 5 }}>
              <View style={{ margin: 10, padding: 5 }}></View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#000', fontSize: 17 }}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{ color: '#0B80F9', marginLeft: 5, fontSize: 17 }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    color: "#000"
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: 200,
    paddingTop: 5,

    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    paddingTop: 16,
    color: 'blue',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  EmailInput: {
    backgroundColor: 'white',
    paddingHorizontal: 58,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: 'Maroon',
    borderWidth: 1,
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
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
});
