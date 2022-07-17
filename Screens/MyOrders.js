import { Button, Card, ListItem } from 'react-native-elements';
import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, firebase } from '../Screens/firebase';

import Icon from './styles/icons';

export default function MyOrders({navigation}) {
    const [checkoutdata, setCheckOut] = useState()

    useEffect(() => {
        getItems().then((res) => {
            setCheckOut(res)
        })
    }, []);

    const getItems = async () => {
        let arrayOfProducts = [];
        let data1 = await db.collection('checkout').get()

        data1.forEach(function (doc) {
            if (doc.exists) {
                arrayOfProducts.push(doc.data());
            } else {
                console.log('No document found!');
            }
        });
        return arrayOfProducts;
    }

    const renderItems = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <Card style={styles.card}>
                    <View style={{}}>
                        <Text style={{ color: '#000',fontSize: 18 }}>{item.name}</Text>
                        <Text style={{ color: '#000', alignSelf: 'flex-end',marginRight: 10,fontSize: 17 }}>Total Pay: {item.topay}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ color: '#000', fontSize: 18 }}>{item.startdate}</Text>
                            <Text style={{ color: '#000', fontSize: 18 }}> - {item.enddate}</Text>
                        </View>
                        <Text style={{ color: '#000', fontSize: 18 }}>Total Items: {item.itemtotal}</Text>
                    </View>
                    <View style={{width: '40%',borderRadius: 10,backgroundColor: 'green',alignSelf: 'flex-end',padding: 10,justifyContent: 'center',alignItems: 'center'}}>
                        <Text style={{color: '#fff'}}>Completed</Text>
                    </View>
                </Card>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.1, justifyContent: 'space-between', alignItems: 'center',flexDirection: 'row' }}>
                <Icon onPress={() => { navigation.navigate('Account')}} name="arrow-back" type='ionicon' size={23} color="#000" style={{marginLeft: 5}}/>
                <Text style={{ fontSize: 30, color: '#0B80F9' }}>My Orders</Text>
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
