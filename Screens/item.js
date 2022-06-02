import React from 'react';
import {useState} from 'react';
import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Component} from 'react';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {firebase, fb, db} from '../Screens/firebase';

const Item = props => {
  const navigation = useNavigation();
  const [pictureURI, setPictureURI] = useState(null);
  const image = firebase.storage().ref().child(props.pictureURL);
  image.getDownloadURL().then(url => {
    setPictureURI(url);
  });
  return (
    <View>
      <Card  style={styles.card}>
        {pictureURI && (
          <>
            <Image
              source={pictureURI}
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
        <Text>{props.pictureURL}</Text>
        <Text>{pictureURI}</Text>
        <Button
          style={styles.button}
          title="Add To Cart"
          onPress={() => {
            navigation.navigate('My Cart');
          }}
        />
        <Button
          style={styles.button}
          onPress={() => {
            navigation.navigate('Detail');
          }}
          title="Show More"
        />
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
    backgroundColor: '#0000FF',
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
  },
});
