import {Button, Card, Icon, ListItem} from 'react-native-elements';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {db, fb, firebase} from '../Screens/firebase';

import {Component} from 'react';
import React from 'react';
import {useState} from 'react';

const Item = props => {
  const navigation = useNavigation();
  //const [pictureURI, setPictureURI] = useState(null);
  //const image = firebase.storage().ref().child(props.pictureURL);
  // image.getDownloadURL().then(url => {
  //   setPictureURI(url);
  // });
  return (
    <View>
      <Card style={styles.card}>
        { (
          <>
            <Image
              // source={{uri:props.pictureURL}}
              source={{uri:"images"}}
              style={{
                width: 350,
                height: 200,
                borderRadius: 20,
                marginBottom: 15,
              }}></Image>
          </>
        )}

        <Text>{props.name}</Text>
        <Text>{props.price}</Text>
        <Text>{props.description}</Text>
        {/* <Text>{props.pictureURL}</Text> */}
        {/* <Text>{pictureURI}</Text> */}
        <TouchableOpacity style={{ width: '45%', backgroundColor: '#F75666',alignSelf: 'center',padding: 8,borderRadius: 10}}>
          <Text style={{ fontSize: 18, alignSelf: 'center', color: '#F1F1F1'}}>Show More</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

export default Item;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    backgroundColor: '#F75666',
    width: 120,
    marginBottom: 20,
    padding: 50,
    borderRadius: 10,
  },
  card: {
    height: 225,
    backgroundColor: '#F1F1F1',
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
