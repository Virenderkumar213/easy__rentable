import React from 'react';
import { View } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const CheckOut = ()=> {
    return (
       <View>
           <Text>
               ps4
           </Text>
           <Text>
               500/Day
           </Text>
           
       </View>
    );
}

export default CheckOut;