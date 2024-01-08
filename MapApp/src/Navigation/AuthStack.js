import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from '../Screens/Onboarding';
import PhoneAuth from '../Screens/PhoneAuth';
import UserProfileForm from '../Screens/UserProfileForm';
import LoginScreen from '../Screens/LoginScreen';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      {/* <Stack.Screen name="PhoneAuth" component={PhoneAuth} /> */}
      <Stack.Screen name="UserProfileForm" component={UserProfileForm} />
    </Stack.Navigator>
  );
};

export default AuthStack;