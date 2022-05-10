import React from 'react';
import {StyleSheet, Text, View, Image, ImageBackground} from 'react-native';
import {useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native';
import {firebase} from '../Screens/firebase';

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
            navigation.navigate('Home', {user});
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
    <ScrollView style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../pictures/images/baks.jpg')}
          style={{
            height: Dimensions.get('window').height / 2.5,
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image
              source={require('../pictures/images/background.png')}
              style={{width: 178, height: 150}}></Image>
          </View>
        </ImageBackground>
        <View style={styles.bottomview}>
          <View style={{padding: 40}}>
            <Text style={{color: '#0000FF', fontSize: 34}}>Welcome</Text>
            <Text>
              Don't have an account?
              <Text    onPress={() => navigation.navigate('SignUp')} 
              style={{color: '#0000FF', fontStyle: 'italic'}}>
                Register now
              </Text>
            </Text>
            <View style={{marginTop: 50}}></View>
            <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.EmailInput}
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
          <Text>Don't have an account</Text>
        </View>
          </View>
        </View>
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
    borderColor: 'maroon',
    borderWidth: 1,
  },
  buttonContainer: {
    margin: 15,
    padding: 10,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#0000FF',
    width: 120,
    padding: 15,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: 'maroon',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    justifyContent:'center',
    letterSpacing: 0.25,
    alignItems:'center',
    fontSize: 16,
    textAlign: 'center',
  },
  Adminbuttontext: {
    color: 'black',
    fontWeight: 'bold',
    justifyContent:'center',
    alignItems:'center',
    fontSize: 18,
    
  },
  EmailInput: {
    backgroundColor: 'white',
    paddingHorizontal: 75,
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
export default LoginScreen;
