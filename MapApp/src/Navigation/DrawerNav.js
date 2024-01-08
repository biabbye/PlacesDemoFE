import React,{useState,useEffect,useContext} from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import 'react-native-gesture-handler';

import Profile from '../Screens/ProfileScreen';
import Settings from '../Screens/SettingsScreen';
import CustomDrawer from '../Components/Onboarding/Drawer/CustomDrawer';
// import UserContextProvider from '../context/UserContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TabNav from './TabNav';
import axios from 'axios';
import { config } from '../urlConfig';
import Connections from '../Screens/ConnectionsScreen';

const Drawer = createDrawerNavigator();

const DrawerNav = ({route}) => {

  const phoneNumber = route.params?.phoneNumber;

  console.log("DRAWER NAV AICI:" )
  console.log(phoneNumber);


  console.log("DRAWER NAV S-A TERMINAT:" )

  return (

      <Drawer.Navigator  drawerContent ={props => <CustomDrawer {...props} initialParams={{phoneNumber:phoneNumber}}/>} 
              screenOptions={{
                  headerShown:false,
                  drawerActiveBackgroundColor:'#901f8f',
                  drawerActiveTintColor:'#fff',
                  drawerInactiveTintColor:'#333',
                  drawerLabelStyle:{marginLeft:-20,fontFamily:'Roboto-Medium',fontSize:16}}}
                  
              >
                
                
              <Drawer.Screen 
                  name="News Feed" 
                  component={TabNav} 
                  options={{
                      drawerIcon: ({color}) => (
                          <Ionicons name="home-outline" size={22} color={color} />
                      ),
                  }}
                  initialParams={{phoneNumber:phoneNumber}}
              />
              <Drawer.Screen 
                  name="Profile" 
                  component={Profile}
                  options={{
                      drawerIcon: ({color}) => (
                          <Ionicons name="person-outline" size={22} color={color} />
                      )
                  }}
                  initialParams={{phoneNumber:phoneNumber}}
              />
              <Drawer.Screen 
                  name="Connections" 
                  component={Connections}
                  options={{
                      drawerIcon: ({color}) => (
                          <Ionicons name="heart-outline" size={22} color={color} />
                      )
                  }}
                  initialParams={{phoneNumber:phoneNumber}}
              />
              <Drawer.Screen 
                  name="Settings" 
                  component={Settings}
                  options={{
                      drawerIcon: ({color}) => (
                          <Ionicons name="settings-outline" size={22} color={color} />
                      )
                  }}
                  initialParams={{phoneNumber:phoneNumber}}
              />
          </Drawer.Navigator>
    
  )
}

export default DrawerNav