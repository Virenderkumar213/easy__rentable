import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import {auth} from '../Screens/firebase';
import {Picker} from '@react-native-picker/picker';
//import {Dropdown} from 'react-native-material-dropdown'
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
          <Picker.item label="user Profile" value="user Profile" />
        </Picker>
      </View>
      {/* <Button color="#ff5c5c" style={{}} title="My Orders" />
      <Button color="#ff5c5c" style={{}} title="Sign Out" /> */}
      <View>
      <TouchableOpacity  style={{}}>
        <Text style={styles.buttonText}>My Orders</Text>
        <View style={styles.icon}>
          <Icon name="" size={23} color="#900" />
        </View>
        <Text style={styles.buttonText} onPress={() => {
            navigation.navigate('My Cart');
          }}>Sign out</Text>
        <View style={styles.icon}>
          <Icon name="logout" size={23} color="#900" />
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    width: '60%',
    height: 60,
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    marginRight: 90,
    color: 'black',
    fontSize: 16,
  },
  pickers: {
    width: 410,
    height: 45,
    fontSize:16,
  },
  icon: {
    paddingLeft: 340,
  },
});
