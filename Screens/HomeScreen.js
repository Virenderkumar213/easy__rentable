import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import {auth} from '../Screens/firebase';
import FirebaseFirestore from '@react-native-firebase/firestore';
import {firebase} from '../Screens/firebase';
import PropTypes from 'prop-types';
import Item from '../Screens/item'

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
    <View>
      <Item/>
      <Item/>
      </View>
    // <View style={styles.container}>
    //   {/* <Text>HomeScreen</Text> */}
    //   <View>
    //     <ScrollView>
    //       <View style={styles.container}>
    //         <View
    //           style={
    //            styles.item
    //           }>
    //           <TouchableOpacity onPress={()=>{}}>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </ScrollView>
    //   </View>
    // </View>
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
  item:{
    backgroundColor:"black" ,
       overflow: 'hidden',
            padding: 5,
                width: 5,
                borderRadius: 1,

  }  
});
