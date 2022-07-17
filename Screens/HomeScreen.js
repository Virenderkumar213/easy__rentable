import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button, Card, Icon, ListItem } from 'react-native-elements';
import React, { useEffect, useState } from 'react';
import { db, firebase } from '../Screens/firebase';

import Item from '../Screens/item';
import { auth } from '../Screens/firebase';
import firestore from '@react-native-firebase/firestore';
import postAdScreen from '../Screens/PostAd';
import { useNavigation } from '@react-navigation/native';

//import TabNavigation from './Navigations';

const HomeScreen = (props) => {
  const [items, setitems] = useState([]);
  const [productData, setProductData] = useState()
  const navigation = useNavigation();
  const [boolitem, setboolitem] = useState(true);
  const [Data, setData] = useState([
    { id: 1, name: 'PS3', Price: 20, imgName: require('../pictures/images/5.png') },
    { id: 2, name: 'PS4', Price: 500, imgName: require('../pictures/images/6.png') },
    { id: 3, name: 'PS5', Price: 500, imgName: require('../pictures/images/7.png') },
    { id: 4, name: 'PS1', Price: 500, imgName: require('../pictures/images/8.png') }
  ])

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => alert(error.message));
  };

  /*DO NOT DELETE THIS
  const data = [
    {id: 1, name: 'PS4', Price: 500},
    {id: 2, name: 'camera', Price: 199},
    {id: 3, name: 'gaming', Price: 900},
    {id: 4, name: 'laptop', Price: 600},
    {id: 5, name: 'Computer', Price: 800},
  ];
  data.forEach((item)=>{
    db.collection('items').add({
      ename : item.name,
      eprice : item.Price
    }).then(function(){
      console.log("document success")
    })
  })

  */

  useEffect(() => {
    getItems().then((res)=>{
      setProductData(res)
    })
  }, []);

  const getItems = async () => {
    let arrayOfProducts = [];
    let data1 =await db.collection('products').get()
    data1.forEach(function (doc) {
      if (doc.exists) {
        arrayOfProducts.push(doc.data());
      } else {
        console.log('No document found!');
      }
    });
    return arrayOfProducts;
  }


  // function getItems(callback) {
  //   let ref = db.collection('products');
  //   this.unsubscribe = ref.onSnapshot(snapshot => {
  //     let items = [];
  //     snapshot.forEach(doc => {
  //       items.push({ id: doc.id, ...doc.data() });
  //       var data = {
  //         id: doc.id,
  //         data: doc.data(),
  //       };
  //     });
  //     callback(items);
  //   });
  // }

  // if (boolitem == true) {
  //   getItems(items => {
  //     setboolitem(false);
  //     setitems(arr => [...items]);
  //   });
  // }


  // const renderList = items.map(item => {
  //   return (
  //     <Item
  //       key={item.id}
  //       name={item.name}
  //       price={item.price}
  //       description={item.description}
  //       pictureURL={item.pictureURL}
  //     />

  //   );
  // });

  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('products')
  //     .doc('Cot38j3YjhWJojCmcJ68')
  //     .onSnapshot(documentSnapshot => {
  //       console.log('User data: ', documentSnapshot.data());
  //     });

  //   return () => subscriber();
  // }, []);

  const renderItems = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <Card style={styles.card}>
          {(
            <>
              <Image
                source={{uri: item.pictureURL}}
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 10,
                }}></Image>
            </>
          )}
          <TouchableOpacity style={{ width: '45%', backgroundColor: '#F75666', alignSelf: 'center', padding: 8, borderRadius: 10, marginTop: 10 }} onPress={() => { navigation.navigate('Detail',{pordcuts: item}) }} >
            <Text style={{ fontSize: 18, alignSelf: 'center', color: '#F1F1F1' }}>Show More</Text>
          </TouchableOpacity>
        </Card>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, }}>
      <View style={{
        backgroundColor: '#fff', flex: 0.06, justifyContent: 'center', alignItems: 'center', shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        <Text style={{ fontSize: 18, color: "#000" }}>Home</Text>
      </View>
      <View style={{ flex: 0.9 }}>
        <FlatList
          data={productData}
          renderItem={renderItems}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  item: {
    backgroundColor: 'black',
    overflow: 'hidden',
    padding: 5,
    width: 5,
    borderRadius: 1,
  },
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
