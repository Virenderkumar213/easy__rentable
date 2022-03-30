import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import react, {component} from 'react';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import SignUpScreen from './Screens/SignUp';
import AccountScreen from './Screens/Account';
//import AdminLoginScreen from './Screens/Admin/AdminLogin';
import Categories from './Screens/Categories';
import PostAd from './Screens/PostAd';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen name="PostAd" component={PostAd} />
      <Tab.Screen
        name="Categories"
        options={{headerShown: false}}
        component={Categories}
      />
    </Tab.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen name="Home" component={TabNavigation} />
        {/* <Stack.Screen options={{ headerShown: false }} name="Admin" component={AdminLoginScreen} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
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
