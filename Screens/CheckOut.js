import React from 'react';
import { View,Text } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Card, ListItem, Button, Icon} from 'react-native-elements';

const CheckOut = ()=> {
    return (
       <View>
           <Text>
               ps4
           </Text>
           <Text>
               500/Day
           </Text>
           <Button
             title="Check Out"
             color="#841584"
           />
           
       </View>
    );
}

export default CheckOut;