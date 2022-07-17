import { Button, Card, ListItem } from 'react-native-elements';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, firebase } from '../Screens/firebase';

import Icon from './styles/icons';

export default function UserHistory({ navigation }) {
    const [checkoutdata, setCheckOut] = useState()

    useEffect(() => {
        getItems().then((res) => {
            setCheckOut(res)
        })
    }, []);

    const getItems = async () => {
        let arrayOfProducts = [];
        let data1 = await db.collection('users').get()

        data1.forEach(function (doc) {
            if (doc.exists) {
                arrayOfProducts.push(doc.data());
            } else {
                console.log('No document found!');
            }
        });
        return arrayOfProducts;
    }

    const deleteUSer =async (id)=>{
        console.log("Yess")
        const res = await db.collection('users').doc(id).delete();
        getItems().then((res) => {
            setCheckOut(res)
        })
    }

    const renderItems = ({ item }) => {
        console.log("Itemmm-=-=>"+JSON.stringify(item))
        return (
            <View style={{ flex: 1 }}>
                <Card style={styles.card}>
                    <View style={{}}>
                        <Text style={{ color: '#000', fontSize: 18 }}>Name: {item.fullName}</Text>
                        <Text style={{ color: '#000', fontSize: 18 }}>Email: {item.email}</Text>
                        <Text style={{ color: '#000', marginRight: 10, fontSize: 17 }}>Phone Numbers: {item.mobileNumber}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        deleteUSer(item.id)
                    }} style={{ width: '40%', borderRadius: 10, backgroundColor: 'red', alignSelf: 'flex-end', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff' }}>Delete</Text>
                    </TouchableOpacity>
                </Card>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <Icon onPress={() => { navigation.navigate('dashboard') }} name="arrow-back" type='ionicon' size={23} color="#000" style={{ marginLeft: 5 }} />
                <Text style={{ fontSize: 30, color: '#0B80F9' }}>Total Users</Text>
                <Text></Text>
            </View>
            <View style={{ flex: 0.9 }}>
                <FlatList
                    data={checkoutdata}
                    renderItem={renderItems}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 225,
        backgroundColor: '#F1F1F1',
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
