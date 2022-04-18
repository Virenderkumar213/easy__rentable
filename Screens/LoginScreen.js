import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {auth} from '../Screens/firebase';
import {useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native';
import HomeScreen from './HomeScreen';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user == setEmail && setPassword) {
        navigation.replace('Home');
      }
    });
    

    return unsubscribe;
  }, []);
  

  const handleLogin = () => {
    navigation.replace('Home');
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
    <ScrollView style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
          backgroundColor: 'white',
        }}>
        <View style={{flex: 0.2, margin: 30}}>
          <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
            <Text style={styles.Adminbuttontext}>Admin</Text>
          </TouchableOpacity>
        </View>
        <View style={{margin: 20, padding: 5}}
        
        ></View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../pictures/images/background.png')}
            style={{width: 178, height: 150}}></Image>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{width: '70%', display: 'flex', alignItems: 'center'}}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            styles={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.passwordInput}
            secureTextEntry
          />
        </View>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => handleLogin()} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={{margin: 10, padding: 5}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={styles.button}>
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
            <View style={{margin: 10, padding: 5}}></View>
          </View>
        </View>
        <Text style={{margin: 10, padding: 10}}>Don't have an account</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 10,
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
export default LoginScreen;
