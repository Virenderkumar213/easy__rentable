import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { db, fb, firebase } from '../Screens/firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from './styles/icons';

const Cart = (props) => {
    console.log(props.route.params)
    const [pro, setPro] = useState(props.route.params)
    // const [dates, setDatesS] = useState(props.route.params.datesS)
    const [userId, setUserId] = useState(null)
    const [checkActi, setCheckAct] = useState(false)
    const [qty, setQty] = useState(1)
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
                productid: 'test',
                name: pro ? pro.prod.name : null,
                itemtotal: qty,
                startdate: new Date().toISOString(),
                enddate: new Date().toISOString(),
                topay: (JSON.parse(pro.prod.week * qty) + 179.64 + 999).toFixed(2),
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
                        { text: "OK", onPress: () => { navigation.navigate('Home') } }
                    ]
                );
            });
    }

    const increQty = () => {
        setQty(qty + 1)
    }

    const decQty = () => {
        if (qty < 2) {
            alert('Cannot Decrease Quantity')
        }
        else {
            setQty(qty - 1)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {
                props.route.params == undefined ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#000', fontSize: 20 }}>No Products available!</Text>
                    </View>
                    :
                    props.route.params.prod == "data" ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#000', fontSize: 20 }}>No Products available!</Text>
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity style={{ flex: 0.15, justifyContent: 'center', marginLeft: 10, }} onPress={() => { navigation.navigate('Detail') }}>
                                <Icon name="arrowleft" type={"ant"} size={23} color={"#000"} />
                            </TouchableOpacity>
                            <View
                                style={{
                                    alignItems: 'flex-start',
                                    padding: 10,
                                    height: 200,
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
                                        <Text style={{ color: "#000", fontSize: 17 }}>Rs. {pro ? pro.prod.week : null}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{ color: "#000", fontSize: 20, marginTop: 10 }}>Qty:</Text>
                                            <Text style={{ color: "#000", fontSize: 20, marginTop: 10, marginLeft: 10 }}>{qty}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => { decQty() }} style={{ width: 35, height: 35, backgroundColor: '#006FCE', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name="minus" type={"ant"} size={23} color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { increQty() }} style={{ width: 35, height: 35, backgroundColor: '#F75666', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
                                        <Icon name="plus" type={"ant"} size={23} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity style={{ width: '50%', backgroundColor: '#F75666', alignSelf: 'center', padding: 8, borderRadius: 10, marginTop: 10 }} onPress={() => { checkOut() }} >
                                <Text style={{ fontSize: 18, alignSelf: 'center', color: '#F1F1F1' }}>Checkout</Text>
                            </TouchableOpacity>

                            <View style={{ height: 40, marginTop: 20 }}>
                                {
                                    checkActi ?
                                        <ActivityIndicator size="small" color="#F75666" />
                                        :
                                        null
                                }
                            </View>
                        </View>
            }
        </View>
    );
};

export default Cart;