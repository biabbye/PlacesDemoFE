import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from '../Screens/HomeScreen'
import Map from '../Screens/MapScreen'
import Events from '../Screens/EventsScreen'
import ChatsScreen from '../Screens/ChatsScreen'
import UserContextProvider from '../context/UserContext';
// import axios from 'axios';
// import { config } from '../urlConfig';
// import HaversineGeolocation from 'haversine-geolocation';
// import { useIsFocused } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNav = ({route}) => {

    const phoneNumber = route.params?.phoneNumber;


    console.log("TAB NAV AICI:" )
    console.log(phoneNumber);

    
  return (

        <Tab.Navigator screenOptions={{ 
                headerShown:false,
                tabBarShowLabe:false,
                tabBarStyle:{backgroundColor:'#F8F8FF'},
                tabBarInactiveTintColor:'#25383C',
                tabBarActiveTintColor:'#901f8f'
            }}
           >
            
            <Tab.Screen name='Map' component={Map}  
                    options={{
                    tabBarIcon:({color,size}) => (
                        <Feather name="map" color={color} size={size} />
                    )
                }}
                initialParams={{phoneNumber:phoneNumber}}
                />
                
                <Tab.Screen name='Home' component={Home} 
                options={{
                    tabBarIcon:({color,size}) => (
                        <Ionicons name="home-outline" color={color} size={size} />
                    )
                }}
                initialParams={{phoneNumber:phoneNumber}}
                />
                
                
                <Tab.Screen name='Events' component={Events} 
                    options={{
                        tabBarIcon:({color,size}) => (
                            <FontAwesome5 name="glass-cheers" color={color} size={size} />
                        )
                    }}
                    initialParams={{phoneNumber:phoneNumber}}
                />
                <Tab.Screen name='Chats' component={ChatsScreen} 
                    options={{
                        tabBarIcon:({color,size}) => (
                            <FontAwesome5 name="comments" color={color} size={size} />
                        )
                    }}
                    initialParams={{phoneNumber:phoneNumber}}
                />

            </Tab.Navigator>

        
    
    
  )
}

export default TabNav