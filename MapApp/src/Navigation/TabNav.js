import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from '../Screens/Home'
import Map from '../Screens/Map'
import Events from '../Screens/Events'

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarShowLabe:false,
        tabBarStyle:{backgroundColor:'#F8F8FF'},
        tabBarInactiveTintColor:'#25383C',
        tabBarActiveTintColor:'#901f8f'
    }}>
        <Tab.Screen name='Home' component={Home} 
           options={{
            tabBarIcon:({color,size}) => (
                <Ionicons name="home-outline" color={color} size={size} />
            )
           }}
        />
        <Tab.Screen name='Map' component={Map}  
            options={{
            tabBarIcon:({color,size}) => (
                <Feather name="map" color={color} size={size} />
            )
           }}
        />
        <Tab.Screen name='Events' component={Events} 
             options={{
                tabBarIcon:({color,size}) => (
                    <FontAwesome5 name="glass-cheers" color={color} size={size} />
                )
               }}
        />
    </Tab.Navigator>
  )
}

export default TabNav