import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './Screens/HomeScreen';
import AccountScreen from './Screens/Account';
import Categories from './Screens/Categories';
import PostAd from './Screens/PostAd';
import Invoice from './Screens/Invoice';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TabNavigation = props => {
  
    user = props.route.params.user
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home">
              {props => <HomeScreen {...props} extraData={user} />}
            </Tab.Screen>
        {/* <Tab.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{user}}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen name="PostAd" component={PostAd} />
        <Tab.Screen name="Invoice" component={Invoice} />
        <Tab.Screen
          name="Categories"
          options={{headerShown: false}}
          component={Categories}
        /> */}
      </Tab.Navigator>
    );
  };
export default TabNavigation;
