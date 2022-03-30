import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {auth} from '../Screens/firebase';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import react, {component} from 'react';
import {KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import {render} from 'react-dom';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [FirstName, setFirstname] = useState('');
  const [LastName, setLastname] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');
  const [CNIC, setCNIC] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    let em = email;
    let atpos = em.indexOf('@');
    let domain = em.split('@')[1];

    if (em == null || em == '') {
      alert('Email can not be empty.');
      return false;
    } else if (atpos < 1 || domain != 'szabist.pk') {
      alert(
        'Not a valid e-mail address. Please write your gmail address like this: BBA1234567@szabist.pk.' +
          atpos +
          ' ' +
          domain[1] +
          '',
      );

      return false;
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;

          console.log('Registered with:', user.email);
        })
        .catch(error => alert(error.message));
    }
  };
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={FirstName}
          onChangeText={text => setFirstname(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={LastName}
          onChangeText={text => setLastname(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Mobile Number"
          value={MobileNumber}
          onChangeText={text => setMobileNumber(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="CNIC"
          value={CNIC}
          onChangeText={text => setCNIC(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
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
};

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
});
