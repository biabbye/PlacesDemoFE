import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext,useEffect,useState} from 'react'
import {Alert} from 'react-native';
import axios from 'axios';
import { config } from '../urlConfig';
import { useDispatch } from 'react-redux';
import { setLoggedUserPhoneNumber } from '../Features/Api/apiSlice';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [userToken,setUserToken] = useState(null);
    const [phoneNumber,setPhoneNumber] = useState(null);



    const login = async (phoneNumber) => {
        console.log(phoneNumber);
        setIsLoading(true);
        axios.get(`${config.BASE_URL}/api/UserProfile/GetUserProfileByPhone/${phoneNumber}`).then(
            response => {
                if (response.data != undefined) {
                    setUserToken('token');
                    setPhoneNumber(phoneNumber);
                    
                    AsyncStorage.setItem('userToken','token');
                    AsyncStorage.setItem('phoneNumber',phoneNumber);
                    setIsLoading(false);
                }else
                {
                    console.log("AICI")
                    setIsLoading(false);
                    Alert.alert('Number not found', 'Please register below', [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ]);
                };
            }
        );

        console.log("PHONE NUMBER AICI IN LOGIN")
        
        
    }
    
    const signUp = async (currentLocationId,userData) => {
        console.log(currentLocationId);
        console.log(userData);
        setIsLoading(true);
          
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
          };
        try {
            const response = await axios.post(`${config.BASE_URL}/api/UserProfile?locationId=${currentLocationId}`,
                userData,axiosConfig
            );
            console.log(response.data);
            if (response.data) {
                setUserToken('token');
                setPhoneNumber(userData.phoneNumber); 
                AsyncStorage.setItem('userToken','token');
                AsyncStorage.setItem('phoneNumber',userData.phoneNumber);
                setIsLoading(false);
            }
          }catch(err) {
            console.log(err);
          }   
        
    } 

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        setPhoneNumber(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('phoneNumber');
        setIsLoading(false);
    }


    const isLoggedIn = async () => {
        try 
        {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);

            let phoneNumber = await AsyncStorage.getItem('phoneNumber');
            setPhoneNumber(phoneNumber);

            setIsLoading(false);
        }catch(e)
        {
            console.log(e);
        }
        
    }

    

    useEffect(() => {
        isLoggedIn();
    },[]);

    return (
        <AuthContext.Provider value={{login,signUp,logout,isLoading,userToken,phoneNumber}}> 
            {children} 
        </AuthContext.Provider>
    );
}

