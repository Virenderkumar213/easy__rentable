import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Component} from 'react/cjs/react.production.min';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

const ListedItem = () => {
  return (
    <View>
      <Text>Virender</Text>
      <Card title="CARD WITH DIVIDER">
        <View
          style={{
            alignItems: 'flex-start',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../pictures/images/1.png')}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              marginBottom: 15,
            }}></Image>
          <View style={{padding: 20}}>
            <Text>ps4</Text>
            <Text>500/Day</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Button style={{backgroundColor: 'black'}} title="-" color="black" />
          <Text> 1 </Text>
          <Button style={{backgroundColor: 'black'}} title="+" color="black" />

          {/* <Button color="#ff5c5c" style={{}} title="Delete" /> */}
        </View>
      </Card>
    </View>
  );
};

export default ListedItem;
