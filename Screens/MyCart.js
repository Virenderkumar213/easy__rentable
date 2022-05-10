import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import ListedItem from '../Screens/ListedItem';

const MyCart = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ListedItem />
      <Button 
         style={{flex:1}}
         title="Check Out"
         color="#841584"
        //  onPress={() => {
        //    navigation.navigate('My Cart');
        //  }}
        />
    </View>
  );
};

export default MyCart;
