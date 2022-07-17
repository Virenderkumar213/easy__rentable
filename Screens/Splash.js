import {
    Dimensions,
    Image,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { Component, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({ navigation }) {
    const [dt, setDt] = useState(null)

    useEffect(() => {
        // Call only when screen open or when back on screen
        setTimeCall();
    }, []);

    setTimeCall = () => {
        setTimeout(() => {
            getData();
        }, 1000);
    };

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@signUpData');
            if (value !== null) {
                navigation.navigate('Home');
            } else {
                navigation.navigate('Login');
            }
        } catch (e) {
            console.log("EEE" + e)
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../pictures/images/logo-remov.png')} style={{ width: 100, height: 100 }} />
        </View>
    );
}