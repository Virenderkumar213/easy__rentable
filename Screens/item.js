import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Component} from 'react/cjs/react.production.min';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

const Item = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Virender</Text>
      <Card title="CARD WITH DIVIDER">
        <Image
          source={require('../pictures/images/1.png')}
          style={{
            width: 350,
            height: 200,
            borderRadius: 20,
            marginBottom: 15,
          }}></Image>
        <Text style={{}}>ps4</Text>
        <Text>500/Day</Text>
        <Text>this is Ps4 game ahjbbsbsbdbdw</Text>
        <Button>Add to Cart</Button>
        <Button
          style={{}}
          onPress={() => {
            navigation.navigate('Detail');
          }}
          title="Show More"
          color="#841584"
        />
      </Card>
    </View>
  );
};

export default Item;
