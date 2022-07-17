import { LogBox, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { db, firebase } from './Screens/firebase';

import AccountScreen from './Screens/Account';
import Cart from './Screens/Cart';
import Categories from './Screens/Categories';
import CheckOut from './Screens/CheckOut';
import DetailScreen from './Screens/DetailScreen';
import HomeScreen from './Screens/HomeScreen';
import Icon from './Screens/styles/icons'
import Invoice from './Screens/Invoice';
import LoginScreen from './Screens/LoginScreen';
import MyCart from './Screens/MyCart';
import MyOrders from './Screens/MyOrders';
import { NavigationContainer } from '@react-navigation/native';
import OrdersHistory from './Screens/OrdersHistory';
import PostAd from './Screens/PostAd';
import SignUpScreen from './Screens/SignUp';
import Splash from './Screens/Splash';
import UserHistory from './Screens/UsersHistory';
import { auth } from './Screens/firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import dashboard from './Screens/Admin/Dashboard/dashboard';
import { useState } from 'react';

//import temps from './Screens/temps;'

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigation = props => {
  // user = props.route.params.user;
  // console.log("user-=-=>" + JSON.stringify(user))
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home"
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#F75666',
          tabBarIcon: ({ color }) => (
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <Icon
                name='home'
                type='fa'
                color={color}
                size={25}
              />
            </View>
          ),
          tabBarLabel: 'Home'
        }}
      >
        {props => <HomeScreen {...props} />}
      </Tab.Screen>

      <Tab.Screen name="Post Ad"
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#F75666',
          tabBarIcon: ({ color }) => (
            <View style={{ justifyContent: 'center', flex: 1, }}>
              <Icon
                name='post-add'
                type='material'
                color={color}
                size={25}
              />
            </View>
          ),
          tabBarLabel: 'Post Ad'
        }}>
        {props => <PostAd {...props} />}
      </Tab.Screen>

      <Tab.Screen name="Cart"
        // component={Cart}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#F75666',
          tabBarIcon: ({ color }) => (
            <View style={{ justifyContent: 'center', flex: 1 }}>
              <Icon
                name='shopping-cart'
                type='fa5'
                color={color}
                size={25}
              />
            </View>
          ),
          tabBarLabel: 'Cart'
        }}
      >
        {props => <Cart {...props} prod = "data"/> }
      </Tab.Screen>

      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: '#F75666',
          tabBarIcon: ({ color }) => (
            <View style={{ justifyContent: 'center', flex: 1, }}>
              <Icon
                name='account'
                type='materialCommunity'
                color={color}
                size={25}
              />
            </View>
          ),
          tabBarLabel: 'Account'
        }}
      />
    </Tab.Navigator>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  console.log(user);

  LogBox.ignoreAllLogs()

  // useEffect(() => {
  //   getItems().then((res) => {
  //     setUser(res)
  //   })
  // }, []);

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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={TabNavigation}
        ></Stack.Screen>

        <Stack.Screen
          name="Detail"
          options={{ headerShown: false }}
          component={DetailScreen}
          initialParams={{ user }}></Stack.Screen>

        <Stack.Screen
          name="MyCart"
          options={{ headerShown: false }}
          component={MyCart}
          initialParams={{ user }}></Stack.Screen>
        <Stack.Screen
          name="MyOrders"
          options={{ headerShown: false }}
          component={MyOrders}
          initialParams={{ user }}></Stack.Screen>
        <Stack.Screen
          name="Cart"
          options={{ headerShown: false }}
          component={Cart}
          initialParams={{ user }}></Stack.Screen>
        <Stack.Screen
          name="dashboard"
          options={{ headerShown: false }}
          component={dashboard}
          initialParams={{ user }}></Stack.Screen>

        <Stack.Screen
          name="UserHistory"
          options={{ headerShown: false }}
          component={UserHistory}
          initialParams={{ user }}></Stack.Screen>

        <Stack.Screen
          name="OrdersHistory"
          options={{ headerShown: false }}
          component={OrdersHistory}
          initialParams={{ user }}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );


  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       {user.length ? (
  //         <>
  //           <Stack.Screen
  //             name="Home"
  //             options={{ headerShown: false }}
  //             component={TabNavigation}
  //             ></Stack.Screen>

  //           <Stack.Screen
  //             name="Detail"
  //             options={{ headerShown: false }}
  //             component={DetailScreen}
  //             initialParams={{ user }}></Stack.Screen>

  //           <Stack.Screen
  //             name="MyCart"
  //             options={{ headerShown: false }}
  //             component={MyCart}
  //             initialParams={{ user }}></Stack.Screen>
  //           <Stack.Screen
  //             name="MyOrders"
  //             options={{ headerShown: false }}
  //             component={MyOrders}
  //             initialParams={{ user }}></Stack.Screen>
  //         </>

  //       ) : (
  //         <>
  //           <Stack.Screen
  //             options={{ headerShown: false }}
  //             name="Login"
  //             component={LoginScreen}
  //           />
  //           <Stack.Screen
  //             options={{ headerShown: false }}
  //             name="SignUp"
  //             component={SignUpScreen}
  //           />
  //           <Stack.Screen
  //             name="Home"
  //             component={TabNavigation}
  //             initialParams={{ user }}
  //             options={{ headerShown: false }}
  //           />
  //           <Stack.Screen
  //             name="Detail"
  //             options={{ headerShown: false }}
  //             component={DetailScreen}
  //             initialParams={{ user }}></Stack.Screen>
  //           <Stack.Screen
  //             options={{ headerShown: false }}
  //             name="My Cart"
  //             component={MyCart}
  //           />
  //           <Stack.Screen
  //             name="MyOrders"
  //             options={{ headerShown: false }}
  //             component={MyOrders}
  //             initialParams={{ user }}></Stack.Screen>
  //         </>
  //       )}
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
