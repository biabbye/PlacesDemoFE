import React, { useContext,useState,useEffect } from 'react';
import 'react-native-gesture-handler';
import { StyleSheet,View,ActivityIndicator } from 'react-native';
import {NavigationContainer} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import UserContextProvider from '../src/context/UserContext';
import Onboarding from './Screens/Onboarding';
// import Authentication from './Screens/Authentication';
import PhoneAuth from './Screens/PhoneAuth';
import OTPVerification from './Screens/OTPVerification';
import DrawerNav from './Navigation/DrawerNav';
import UserProfileForm from './Screens/UserProfileForm';
import LoginScreen from './Screens/LoginScreen';
import { AuthContext } from './context/AuthContext';
import { UserContext } from './context/UserContext';
import axios from 'axios';

const Stack = createStackNavigator();


const Main = () => {

  const {isLoading,userToken,phoneNumber} = useContext(AuthContext);

  if(isLoading)
  {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    )

  }

  
  console.log("AICI MAIN");
  console.log(phoneNumber);
  console.log(userToken);




   return (
    
    // <UserContextProvider phoneNumber={phoneNumber}>
      <NavigationContainer >
        {userToken!==null ?
            <Stack.Navigator>
              <Stack.Screen name="DrawerNav" component={DrawerNav} initialParams={{phoneNumber:phoneNumber}} options={{headerShown:false}} />
            </Stack.Navigator>
          :
            <Stack.Navigator>
              <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown:false}}/>
              <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
              <Stack.Screen name="PhoneAuth" component={PhoneAuth} options={{headerShown:false}}/>
              <Stack.Screen name="UserProfileForm" component={UserProfileForm} options={{headerShown:false}}/>
            </Stack.Navigator>
          
          }

      </NavigationContainer>
    // </UserContextProvider>
      

      
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
})