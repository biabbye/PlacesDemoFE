import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from './Screens/Onboarding';
// import Authentication from './Screens/Authentication';
import PhoneAuth from './Screens/PhoneAuth';
import OTPVerification from './Screens/OTPVerification';
import DrawerNav from './Navigation/DrawerNav';
import UserProfileForm from './Screens/UserProfileForm';
import UserProfileForm2 from './Screens/UserProfileForm2';

const Stack = createStackNavigator();


const Main = () => {

   return (
      <NavigationContainer >
        <Stack.Navigator>
          <Stack.Screen  component={Onboarding} name="Onboarding" options={{headerShown:false}}/>
          <Stack.Screen component={PhoneAuth} name="PhoneAuth" options={{headerShown:false}}/>
          {/* <Stack.Screen component={Authentication} name="Authentication"/> */}
          <Stack.Screen component={OTPVerification} name="OTPVerification" options={{headerShown:false}}/>
          <Stack.Screen component={UserProfileForm} name="UserProfileForm" options={{headerShown:false}}/>
          <Stack.Screen component={UserProfileForm2} name="UserProfileForm2" options={{headerShown:false}}/>
          <Stack.Screen component={DrawerNav} name="DrawerNav" options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>

      
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