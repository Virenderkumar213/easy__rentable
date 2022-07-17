import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { db, fb, firebase } from '../Screens/firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from './styles/icons';

const MyCart = (props) => {
  console.log('Porppsps-=-->' + JSON.stringify(props.route.params))
  const [pro, setPro] = useState(props.route.params)
  const [dates, setDatesS] = useState(props.route.params.datesS)
  const [userId,setUserId] = useState(null)
  const [checkActi,setCheckAct] = useState(false)
  const navigation = useNavigation();

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@signUpData');
      setUserId(value)
    } catch (e) {
    }
  };

  const checkOut = () => {
    setCheckAct(true)
    db.collection('checkout')
      .add({
        userid: userId,
        productid: 'erererer',
        name:  pro? pro.prod.name : null,
        itemtotal: "1",
        startdate: dates.startD,
        enddate: dates.endD,
        topay: (JSON.parse(pro.prod.week) + 179.64 + 999).toFixed(2),
      })
      .then(function () {
        setCheckAct(false)
        Alert.alert(
          "CheckOut!",
          "Checkout Successfully!",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => {navigation.navigate('Home')} }
          ]
        );
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={{ flex: 0.15, justifyContent: 'center', marginLeft: 10, }} onPress={() => { navigation.navigate('Detail') }}>
        <Icon name="arrowleft" type={"ant"} size={23} color={"#000"} />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'flex-start',
          padding: 10,
          height: 400,
          backgroundColor: '#fff',
          margin: 10,
          borderRadius: 10
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: pro ? pro.prod.pictureURL : null }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              marginBottom: 15,
            }}></Image>
          <View style={{ padding: 20 }}>
            <Text style={{ color: "#000", fontSize: 20 }}>{pro ? pro.prod.name : null}</Text>
            <Text style={{ color: "#000", fontSize: 20 }}>{dates.startD} - {dates.endD}</Text>
          </View>
        </View>
        <View style={{ borderWidth: 0.3, borderColor: '#000', width: '100%' }}>

        </View>
        <View style={{ height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
          <Text style={{ color: "#000", fontSize: 17 }}>Item total</Text>
          <Text style={{ color: "#000", fontSize: 17 }}>Rs. 1</Text>
        </View>

        <View style={{ height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
          <Text style={{ color: "#000", fontSize: 17 }}>Price</Text>
          <Text style={{ color: "#000", fontSize: 17 }}>Rs. {pro ? pro.prod.week : null}</Text>
        </View>

        <View style={{ height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
          <Text style={{ color: "#000", fontSize: 17 }}>GTS (18%)</Text>
          <Text style={{ color: "#000", fontSize: 17 }}>Rs. 179.64</Text>
        </View>

        <View style={{ height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
          <Text style={{ color: "#000", fontSize: 17 }}>Security Deposite</Text>
          <Text style={{ color: "#000", fontSize: 17 }}>Rs. 999</Text>
        </View>

        <View style={{ borderWidth: 0.3, borderColor: '#000', width: '100%' }}>
        </View>

        <View style={{ height: 50, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%' }}>
          <Text style={{ color: "#000", fontSize: 20 }}>To Pay</Text>
          <Text style={{ color: "#000", fontSize: 20 }}>Rs. {(JSON.parse(pro.prod.week) + 179.64 + 999).toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={{ width: '45%', backgroundColor: '#F75666', alignSelf: 'center', padding: 8, borderRadius: 10, marginTop: 10 }} onPress={() => { checkOut() }} >
          <Text style={{ fontSize: 18, alignSelf: 'center', color: '#F1F1F1' }}>CheckOut</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 40,marginTop: 20}}>
        {
          checkActi ?
            <ActivityIndicator size="small" color="#F75666" />
            : 
            null
        }
      </View>
    </View>
  );
};

export default MyCart;