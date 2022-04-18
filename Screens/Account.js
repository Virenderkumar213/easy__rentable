import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import {auth} from '../Screens/firebase';
import {Picker} from '@react-native-picker/picker';
//import {Dropdown} from 'react-native-material-dropdown'
import {Card, ListItem, Button, Icon} from 'react-native-elements';

const AccountScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message));
  };
  const [pickervalue, setpickervalue] = useState('User Detail');

  return (
    <View style={styles.container}>
      <View style={styles.Card}>
        <Picker
          style={styles.pickers}
          selectedValue={pickervalue}
          onValueChange={itemValue => setpickervalue(itemValue)}>
          <Picker.item label="User Name" value="User Name" />
          <Picker.item label="Email" value="Email" />
          <Picker.item label="java" value="java" />
        </Picker>
      </View>
      <Button color="#ff5c5c" style={{}} title="My Orders" />
      <Button color="#ff5c5c" style={{}} title="Sign Out" />

      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountScreen;
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
  pickers: {
    width: 300,
    height: 45,
    borderColor: 'blue',
  },
});
