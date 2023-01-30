import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import 'react-native-gesture-handler';
import { Text,View,Image } from "react-native";

import Home from '../Screens/Home';
import Map from "../Screens/Map";
import Profile from '../Screens/Profile';
import Settings from '../Screens/Settings';
import CustomDrawer from '../Components/Onboarding/Drawer/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabNav from './TabNav';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator  drawerContent ={props => <CustomDrawer {...props}/>} 
        screenOptions={{
            headerShown:false,
            drawerActiveBackgroundColor:'#901f8f',
            drawerActiveTintColor:'#fff',
            drawerInactiveTintColor:'#333',
            drawerLabelStyle:{marginLeft:-20,fontFamily:'Roboto-Medium',fontSize:16}}}>
        <Drawer.Screen 
            name="News Feed" 
            component={TabNav} 
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="home-outline" size={22} color={color} />
                )
            }}
        />
        <Drawer.Screen 
            name="Profile" 
            component={Profile}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="person-outline" size={22} color={color} />
                )
            }}
            
        />
        <Drawer.Screen 
            name="Settings" 
            component={Settings}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="settings-outline" size={22} color={color} />
                )
            }}
            
        />
    </Drawer.Navigator>
  )
}

export default DrawerNav