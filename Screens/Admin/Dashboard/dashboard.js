import { Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { db, firebase } from '../../firebase';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../../styles/icons';
import Smallbox from '../../components/atoms/touchables/smallbox'
import { colors } from './colors'
import { style } from './style';

export default function dashboard({ navigation }) {
    const [dashboardData, setDashboardData] = React.useState(null)
    const [pro, setPro] = React.useState(null)
    const [user, setUser] = React.useState(null)
    const [Completed, setCompleted] = React.useState(null)
    const [productData, setProductData] = useState()

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Dashboard",
            "Are you Sure You Want to Logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const handleSignOut = () => {
        AsyncStorage.removeItem('@signUpData');
        navigation.navigate('Login')
    };

    useEffect(() => {
        getItems().then((res) => {
            setPro(res)
        })

        getUsers().then((res) => {
            setUser(res)
        })

        getCompletedOrders().then((res) => {
            console.log(res)
            setCompleted(res)
        })
    }, []);

    const getItems = async () => {
        let arrayOfProducts = [];
        let data1 = await db.collection('products').get()
        data1.forEach(function (doc) {
            if (doc.exists) {
                arrayOfProducts.push(doc.data());
            } else {
                console.log('No document found!');
            }
        });
        return arrayOfProducts.length;
    }

    const getUsers = async () => {
        let arrayOfProducts = [];
        let data1 = await db.collection('users').get()
        data1.forEach(function (doc) {
            if (doc.exists) {
                arrayOfProducts.push(doc.data());
            } else {
                console.log('No document found!');
            }
        });
        return arrayOfProducts.length;
    }

    const getCompletedOrders = async () => {
        let arrayOfProducts = [];
        let data1 = await db.collection('checkout').get()
        data1.forEach(function (doc) {
            if (doc.exists) {
                arrayOfProducts.push(doc.data());
            } else {
                console.log('No document found!');
            }
        });
        return arrayOfProducts.length;
    }

    return (
        <View style={style.container}>
            <View style={{ flex: 0.2, }}>
                <View style={style.appbar}>
                    <Text style={style.dummytext}>Easy Rentable</Text>
                    <Text style={style.dummytext4}>Rent Any thing from US !</Text>
                </View>
                <View style={style.textcont}>
                    <View style={{ width: '60%', alignItems: 'flex-end' }}>
                        <Text style={style.dummytext2}>Dashboard</Text>
                    </View>
                    <TouchableOpacity style={{ width: '40%', alignItems: 'flex-end', paddingRight: 10 }} onPress={() => { handleSignOut() }}>
                        <Icon name='log-out' size={22} type="entypo" color={"#000"} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 0.05 }}>
            </View>
            <View style={{ paddingHorizontal: '5%', justifyContent: 'space-evenly', flex: 0.5, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Smallbox screenname='Jobdetails' numbercolor={colors.GREY} number={user ? user : '00'} icontype='fa' iconcolor={colors.PRIMARYGREEN} iconname='briefcase' iconsize={25} text='Total Users' />
                    <Smallbox screenname='Jobdetails' numbercolor={colors.GREY} number={pro ? pro : '00'} icontype='fa' iconcolor={colors.GREY} iconname='envelope' iconsize={25} text='Total Products' />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Smallbox screenname='Jobdetails' numbercolor={colors.GREY} number={Completed ? Completed : '00'} icontype='fa' iconcolor='#FC544B' iconname='envelope' iconsize={25} text='Completed Orders' />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Smallbox screenname='Jobdetails' numbercolor={colors.GREY} number={dashboardData ? "00" : '00'} icontype='fa' iconcolor={colors.GREY} iconname='envelope' iconsize={25} text='Total Rents' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
