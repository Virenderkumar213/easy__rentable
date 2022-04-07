import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import ListedItem from '../Screens/ListedItem';

const MyCart = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Button onPress={navigation.navigate('Check Out')} />

      <ListedItem />
    </View>
  );
};

export default MyCart;
