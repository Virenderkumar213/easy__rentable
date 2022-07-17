import {
  ActivityIndicator,
  Button,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { db, fb, firebase } from '../Screens/firebase';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { initializeApp } from '@firebase/app';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

//import {firebase,firebaseConfig} from '../Screens/firebase';
//import {uploadBytes} from 'firebase/storage';




const postAdScreen = props => {
  fb.storage;
  const [products, setproducts] = useState([]);
  const [name, setName] = useState('');
  const [day,setDay] = useState('');
  const [week, setWeek] = useState('');
  const [monthly, setMonthly] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();
  const [boolproduct, setboolproduct] = useState(true);
  const [photo, setPhoto] = React.useState(null);
  const [pictureData, setPictureData] = React.useState(null);
  const [checkAct,setCheckAct] = React.useState(false);

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
    console.log("Phhhh-=-==--=>" + photo.assets[0].uri)

    if (name === "" || description === "" || photo.assets[0].uri == null || day === "" || week === "" || monthly === "") {
      alert("Please fill all the fields");
    }
    else {
      setCheckAct(true)
      const uri = photo.assets[0].uri;
      const type = 'image/jpg';
      const name = photo.assets[0].fileName;
      const source = { uri, type, name };
      // console.log(source);
      handleUpdata(source);
    }
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
        setCheckAct(false)
        // setPictureData(data);
        // setModal(false);
        showProduct(data)
        // console.log(data);
      })
      .catch(err => {
        console.log(err);
        checkAct(false)
        alert('Error While Uploading');
      });
  };

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
        day: day,
        week: week,
        monthly: monthly,
        description: description,
        pictureURL: pictureURL,
      })
      .then(function () {
        console.log('document success');
        alert('Product Added Successfully');
      });
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Product Name"
          placeholderTextColor={"#000"}
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Product Description"
          placeholderTextColor={"#000"}
          value={description}
          onChangeText={text => setDescription(text)}
          style={styles.input}
        />
        <View style={{flexDirection: 'row',justifyContent: 'space-around'}}>
          <TextInput
            placeholder="Day"
            placeholderTextColor={"#000"}
            value={day}
            keyboardType={'numeric'}
            onChangeText={text => setDay(text)}
            style={styles.inputData}
          />
          <TextInput
            placeholder="Week"
            placeholderTextColor={"#000"}
            value={week}
            keyboardType={'numeric'}
            onChangeText={text => setWeek(text)}
            style={styles.inputData}
          />
          <TextInput
            placeholder="Monthly"
            placeholderTextColor={"#000"}
            value={monthly}
            keyboardType={'numeric'}
            onChangeText={text => setMonthly(text)}
            style={styles.inputData}
          />
        </View>
      </View>
      <View style={{ height: 50 }}>
      </View>

      {
        photo ? (
          <View style={{ flex: 0.55, width: '90%', alignItems: 'center' }}>
            {
              photo ?
                <Image
                  source={{ uri: photo.assets[0].uri }}
                  style={{ width: '90%', height: 250 }}
                />
                :
                null
            }
          </View>
        ) : (null)
      }

      <View style={{ flex: 0.2, }}>
        <TouchableOpacity style={{ width: '45%', backgroundColor: '#F75666', alignSelf: 'center', padding: 8, borderRadius: 10, marginTop: 10 }} onPress={handleChoosePhoto} >
          <Text style={{ fontSize: 18, alignSelf: 'center', color: '#F1F1F1' }}>Select Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ width: '45%', backgroundColor: '#B2B2B2', alignSelf: 'center', padding: 8, borderRadius: 10, marginTop: 10 }} onPress={handleUploadPhoto} >
          <Text style={{ fontSize: 18, alignSelf: 'center', color: '#F1F1F1' }}>Add Product</Text>
        </TouchableOpacity>
      </View>

      <View style={{justifyContent: 'center',alignItems: 'center'}}>
        {
          checkAct ?
            <ActivityIndicator size="small" color="#F75666" />
            : 
            null
        }
      </View>
      {/* <Button title="Choose Photo" onPress={handleChoosePhoto} /> */}

      {/* <View style={styles.buttonContainer}>
        <View style={{ margin: 10, padding: 5, color: 'white' }}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {photo && (
              <>
                <Image
                  source={{ uri: photo.assets[0].uri }}
                  style={{ width: 100, height: 100 }}
                />
                <Button
                  title="Add Product"
                  onPress={handleUploadPhoto}
                  style={styles.button}
                />
              </>
            )}
          </View>
        </View>
      </View> */}
    </KeyboardAvoidingView>
  );
};
export default postAdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  inputContainer: {
    width: '95%',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    color: '#000',
  },
  inputData: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '25%',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    color: '#000',
    textAlign: 'center',
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
