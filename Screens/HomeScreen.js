import React, {useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import {auth} from '../Screens/firebase';
import FirebaseFirestore from '@react-native-firebase/firestore';
import {firebase} from '../Screens/firebase';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };
  firebase
    .firestore()
    .collection('product')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        let data = documentSnapshot.data();
      });
    });

  return (
    <View style={styles.container}>
      {/* <Text>HomeScreen</Text> */}
      <View>
        <ScrollView>
          <Image
            source={require('../pictures/images/1.png')}
            style={{
              width: 350,
              height: 200,
              borderRadius: 20,
              marginBottom: 15,
            }}></Image>
          <Image
            source={require('../pictures/images/2.png')}
            style={{
              width: 350,
              height: 200,
              borderRadius: 20,
              marginBottom: 15,
            }}></Image>
          <Image
            source={require('../pictures/images/3.png')}
            style={{
              width: 350,
              height: 150,
              borderRadius: 20,
              marginBottom: 15,
            }}></Image>
          <Image
            source={require('../pictures/images/4.png')}
            style={{
              width: 350,
              height: 150,
              borderRadius: 20,
              marginBottom: 15,
            }}></Image>
          <Image
            source={require('../pictures/images/5.png')}
            style={{width: 350, height: 150, borderRadius: 20}}></Image>

          {/*         
        <Text>{product.price}</Text>
        {/* <button title="Add to Cart" onPress={handlePress} /> */}
          {/* <Text>{product.description}</Text> */}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
