import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {NavigationContainer} from '@react-navigation/native';
// import {auth} from '../Screens/firebase';
// import {firebase, db} from '../Screens/firebase';
const postAdScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
        console.log('photo Choosen');
      }
    });
  };
  const handleUploadPhoto = () => {
    uploadImageToStorage(photo.assets[0].uri, 'temp');
    console.log('photo uploaded');
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Product Name"
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Product Price"
          value={price}
          onChangeText={text => setPrice(text)}
          style={styles.input}
        />
        
        <TextInput
          placeholder="Product Description"
          value={description}
          onChangeText={text => setDescription(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
    

        <View style={{margin: 10, padding: 5, color: 'white'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {photo && (
        <>
          <Image
            source={{uri: photo.assets[0].uri}}
            style={{width: 300, height: 300}}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} style={styles.button}/>
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
  
 
  
};
export default postAdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },
  inputContainer: {
    width: '95%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonOutlineText: {
    color: 'blue',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: 'blue',
    width: 200,
    paddingTop: 5,
    height: 40,
    
    borderRadius: 10,
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
});
