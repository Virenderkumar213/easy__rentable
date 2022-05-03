import React from 'react';
import {StyleSheet, Text, View,ImageBackground,Dimensions,ScrollView} from 'react-native';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import {firebase} from '../Screens/firebase';

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
            .then(() => {
              alert("register successful")
              navigation.navigate('Home');
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
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={text => setFullName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Mobile Number"
          value={mobileNumber}
          onChangeText={text => setMobileNumber(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={[styles.button]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
        <View style={{margin: 10, padding: 5, color: 'white'}}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.button}>
              <Text style={styles.buttonOutlineText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.buttonText}>Already have an account</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
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
