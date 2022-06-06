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
//import {firebase,firebaseConfig} from '../Screens/firebase';
//import {uploadBytes} from 'firebase/storage';
import {firebase, fb, db} from '../Screens/firebase';

import {initializeApp} from '@firebase/app';

const postAdScreen = props => {
  fb.storage;
  const [products, setproducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const [boolproduct, setboolproduct] = useState(true);
  const [photo, setPhoto] = React.useState(null);
  const [pictureData, setPictureData] = React.useState(null);

  function showProduct(data) {
    let Userid = props.extraData;
    console.log(data.secure_url)
    // let pictureName = Userid + name;
     let pictureURL = data.secure_url
    console.log(photo);
    db.collection('products')
      .add({
        Userid: Userid,
        name: name,
        price: price,
        description: description,
        pictureURL: pictureURL,
      })
      .then(function () {
        console.log('document success');
      });
  }
  const handleChoosePhoto = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        //path: 'Image_Italy_',
      },
    };
    launchImageLibrary(options, response => {
      // console.log(response);
      if (response) {
        setPhoto(response);
        console.log('photo Choosen');
      }
    });
  };
  const handleUploadPhoto = () => {
    const uri =photo.assets[0].uri;
    const type = 'image/jpg';
    const name = photo.assets[0].fileName;
    const source = {uri, type, name};
    // console.log(source);
    handleUpdata(source);
  };
  // const handleUploadPhoto = pictureName => {
  //   let extension = photo.assets[0].uri.slice(
  //     ((photo.assets[0].uri.lastIndexOf('.') - 1) >>> 0) + 2,
  //   );
  //   const metadata = {
  //     contentType: 'image/jpg'
  //   };
  //   const storage = fb.storage;
  //   let pictureURL = 'images/' + pictureName + '.' + extension;
  //   let reference = firebase.storage().ref().child(pictureURL); // 2
  //   reference.updateMetadata(metadata);
  //   console.log(metadata,photo.assets[0].uri)
  //   // reference.prefix;
  //   // reference.setMetadata(metadata)
  //   console.log(reference);
  //    let task = reference.put(photo.assets[0].uri); // 3
  //    //let task = uploadBytes(reference,photo.assets[0].uri,metadata)
  //   //  let task = fb.uploadBytes(reference,photo.assets[0].uri)
  //   // let task = firebase.storage().uploadBytes(reference,photo.assets[0].uri,metadata)
  //   task
  //     .then(() => {
  //       // 4
  //       console.log('Image uploaded to the bucket!');
  //     })
  //     .catch(e => console.log('uploading image error => ', e));
  //   return pictureURL;
  // };

  const handleUpdata = photo => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'z9jlndcp');
    data.append('cloud_name', 'dwb5e8sxr');
    fetch('https://api.cloudinary.com/v1_1/dwb5e8sxr/image/upload', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        // setPictureData(data);
        // setModal(false);
        showProduct(data)
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
        alert('Error While Uploading');
      });
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
      <Button title="Choose Photo" onPress={handleChoosePhoto} />

      <View style={styles.buttonContainer}>
        <View style={{margin: 10, padding: 5, color: 'white'}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {photo && (
              <>
                <Image
                  source={{uri: photo.assets[0].uri}}
                  style={{width: 100, height: 100}}
                />
                <Button
                  title="Add Product"
                  onPress={handleUploadPhoto}
                  style={styles.button}
                />
                {/* <Button
                  title="Upload Photo"
                  onPress={handleUploadPhoto}
                  style={styles.button}
                /> */}
              </>
            )}
            {/* <Button title="Choose Photo" onPress={handleChoosePhoto} /> */}
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
