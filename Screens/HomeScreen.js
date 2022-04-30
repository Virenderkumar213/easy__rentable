import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import {auth} from '../Screens/firebase';
import {collection, doc, setDoc} from 'firebase/firestore';
import {firebase, db} from '../Screens/firebase';
import {initializeFirestore} from '@firebase/firestore';
import PropTypes from 'prop-types';
import Item from '../Screens/item';
import {set} from 'react-native-reanimated';
//import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [items, setitems] = useState([]);
  const navigation = useNavigation();
  const [boolitem, setboolitem] = useState(true);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
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

  /*
  data1 = db.collection('items').get().then(snapshot => {
    
    return snapshot.forEach(doc => {
      const document = { [doc.id]: doc.data() };
      console.log(document)
      return document;
   }
    );
    console.log(data1)
       });
  console.log(data1);
*/

  function getItems(callback) {
    let ref = db.collection('items');
    this.unsubscribe = ref.onSnapshot(snapshot => {
      let items = [];
      snapshot.forEach(doc => {
        items.push({id: doc.id, ...doc.data()});
        var data = {
          id: doc.id,
          data: doc.data(),
        };
      });
      callback(items);
      //  setitems(arr => [...items]);
    });
  }
  if (boolitem == true) {
    getItems(items => {
      //   console.log(items);
      setboolitem(false);
      setitems(arr => [...items]);
    });
  }
  /* let data1 = [
    {id: 1, name: 'PS4', Price: 500},
    {id: 2, name: 'camera', Price: 199},
    {id: 3, name: 'gaming', Price: 900},
    {id: 4, name: 'laptop', Price: 600},
    {id: 5, name: 'Computer', Price: 800},
  ];*/

  //  data1 =  getItems(items => {
  //   return items;
  // })

  const renderList = items.map(item => {
    console.log(item.ename);
    return <Item key={item.id} name={item.ename} Price={item.eprice} />;
  });
  return (
    <ScrollView>{renderList}</ScrollView>
    // <View style={styles.container}>
    //   {/* <Text>HomeScreen</Text> */}
    //   <View>
    //     <ScrollView>
    //       <View style={styles.container}>
    //         <View
    //           style={
    //            styles.item
    //           }>
    //           <TouchableOpacity onPress={()=>{}}>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </ScrollView>
    //   </View>
    // </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
