import React from 'react';
import {View, Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Component} from 'react';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

const Item = props => {
  const navigation = useNavigation();
  return (
    <View>
      <Card title="CARD WITH DIVIDER">
        <Image
          source={require('../pictures/images/1.png')}
          style={{
            width: 350,
            height: 200,
            borderRadius: 20,
            marginBottom: 15,
          }}></Image>
        <Text style={{}}>{props.name}</Text>
        <Text>500/Day</Text>
        <Text>this is Ps4 game </Text>
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
    flex:1,
    backgroundColor: '#0000FF',
    width: 120,
    marginBottom: 20,
    padding: 50,
    borderRadius: 10,
  },
});
