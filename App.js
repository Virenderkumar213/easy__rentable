import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import SignUpScreen from './Screens/SignUp';
import AccountScreen from './Screens/Account';
import Categories from './Screens/Categories';
import PostAd from './Screens/PostAd';
import MyCart from './Screens/MyCart';
import DetailScreen from './Screens/DetailScreen';
import CheckOut from './Screens/CheckOut';
import Invoice from './Screens/Invoice';
import {useState} from 'react';
//import temps from './Screens/temps;'

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigation = props => {
  user = props.route.params.user;
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home">
        {props => <HomeScreen {...props} extraData={user} />}
      </Tab.Screen>

      <Tab.Screen
        name="Account"
        component={AccountScreen}
      />
      <Tab.Screen name="Post Ad">
        {props => <PostAd {...props} extraData={user} />}
      </Tab.Screen>
      <Tab.Screen name="Invoice" component={Invoice} />
      <Tab.Screen
        name="Categories"
        component={Categories}
      /> 
      
    </Tab.Navigator>
  );
};
function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  console.log(user);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.length ? (
          <Stack.Screen
            name="Home"
            options={{headerShown: false}}
            component={TabNavigation}
            initialParams={{user}}></Stack.Screen>
        ) : (
          <>
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
            <Stack.Screen
              name="Home"
              component={TabNavigation}
              initialParams={{user}}
              options={{headerShown: false}}
            />
          </>
        )}
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
