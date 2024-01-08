import React, {createContext,useEffect,useState,useRef} from 'react'
import axios from 'axios';
import { config } from '../urlConfig';
import HaversineGeolocation from 'haversine-geolocation';
import { useIsFocused } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUser, fetchLocationOfUser } from '../Features/Api/apiSlice'
//imports used for location tracking


export const UserContext = createContext();

const UserContextProvider = ({children,phoneNumber}) => {

  const dispatch = useDispatch();
  const apiState = useSelector((state) => state.api);

    // USE EFFECT MOVED FROM MAP HERE
    const [loggedUser,setLoggedUser] = useState();
    const [currUserLatitude,setCurrUserLatitude] = useState();
    const [currUserLongitude,setCurrUserLongitude] = useState();
    const [otherUsers,setOtherUsers] = useState({});
    const [nearbyUsers,setNearbyUsers] = useState({});


    var otherUsersLocations = [];
    var nearbyUsersArray = [];

      //REGISTER FOR NOTIFICATIONS
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  
    async function sendPushNotification(expoPushToken,nearbyUsersLength) {
      const message = {
        to: expoPushToken,
        sound: 'default',
        title: `${nearbyUsers.length} Nearby`,
        body: 'Enter the Places App to see the Users nearby',
        data: { },
      };
    
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    }
  

    async function registerForPushNotificationsAsync() {
      let token;
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C', 
        }); 
      } 
      
      return token;
    }
  

    //API CALLS HERE FROM REDUX
    //GET LOGGED IN USER ( BY PHONE NUMBER)
    // useEffect(() => {
    //   console.log("PRIMUL USE EFFECT DIN USER CONTEXT", phoneNumber);
    //   dispatch(fetchLoggedInUser(phoneNumber));  
    // }, [dispatch,phoneNumber]);
    
    // useEffect(() => { 
    //   console.log("API STATE HERE: ", apiState); 
    //   if(apiState.loggedUser) {
    //     setLoggedUser(apiState.loggedUser);
    //     console.log(apiState.loggedUser.id);
    //     dispatch(fetchLocationOfUser(apiState.loggedUser.id));
    //   }
    // },[dispatch,apiState.loggedUser]);

    // console.log("Logged user saved in user context here:", loggedUser);
  
    // useEffect(() => { 
    //   console.log("API STATE HERE: ", apiState);
    //   if(apiState.userLocation) {
    //     setCurrUserLatitude(apiState.userLocation.latitude);
    //     setCurrUserLongitude(apiState.userLocation.longitude);
    //   }
    // },[apiState.userLocation]);

    // useEffect(() => {  
    //      function getLoggedInUser(){ 
    //        axios.get(`${config.BASE_URL}/api/UserProfile/GetUserProfileByPhone/${phoneNumber}`).then(
    //         loggedUser => { 
    //             if (loggedUser.data) {
    //               console.log('GET LOGGED IN USER A MERS') 
    //               setLoggedUser(loggedUser.data);  
 
    //               if(loggedUser.data)
    //               { 
    //                 //nearbyUsers = [];
    //                 // FIRST GET THE LOCATION OF THE CURRENT USER
    //                 axios.get(`${config.BASE_URL}/api/Location/GetLocationOfAUser/userProfiles/${loggedUser.data.id}`).then(
    //                   loggedUserLoc => {
    //                     if (loggedUserLoc.data) {
    //                       console.log("GET LOCATION OF THE USER A MERS")
    //                         setCurrUserLatitude(loggedUserLoc.data.latitude);
    //                         setCurrUserLongitude(loggedUserLoc.data.longitude);
    //                       }
    //                   }
    //                 );

    //                 if(currUserLatitude && currUserLongitude)
    //                 {
    //                 //THEN GET THE OTHER USER PROFILES
    //                 axios.get(`${config.BASE_URL}/api/Location/GetOtherUserProfiles/${loggedUser.data.id}`).then(
    //                   otherProfiles => {
    //                     console.log("THIS IS THE DATA FOR OTHER USERS")
    //                     console.log(otherProfiles.data);

    //                 //setOtherUsers(response.data);

    //                     for (let i = 0; i < otherProfiles.data.length; i++) {
    //                       console.log(otherProfiles.data[i].currentLocationId);
    //                       axios.get(`${config.BASE_URL}/api/Location/${otherProfiles.data[i].currentLocationId}`).then(
    //                         otherProfileLoc => {
    //                           console.log("-------------------------------")
    //                           console.log(otherProfileLoc.data)
    //                           console.log("-------------------------------")
    //                           otherUsersLocations.push(otherProfileLoc.data);

    //                           const myLoc = { latitude: currUserLatitude, longitude: currUserLongitude}
    //                           const otherLoc = { latitude: otherProfileLoc.data.latitude, longitude: otherProfileLoc.data.longitude }
                              
    //                           const distanceInKm = HaversineGeolocation.getDistanceBetween(myLoc,otherLoc);
                          
    //                           console.log(distanceInKm);
    //                           if(distanceInKm < 10 && distanceInKm > -1){
    //                             nearbyUsersArray.push(otherProfiles.data[i]);
    //                           } 

    //                         }
    //                       )
    //                   }

    //                   setNearbyUsers(nearbyUsersArray);
                      
    //                   })
    //                 }
             
    //               } 
            
    //               registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
                
    //               notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //                 setNotification(notification);
    //               });
            
    //               responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //                 console.log(response);
    //               });
            
    //               return () => {
    //                 Notifications.removeNotificationSubscription(notificationListener.current); 
    //                 Notifications.removeNotificationSubscription(responseListener.current);
    //               };
    //           }
    //         })
    //       }  
    //       getLoggedInUser();
    // },[]);  



 
    return (
        <UserContext.Provider value={{loggedUser,currUserLatitude,currUserLongitude,otherUsers,otherUsersLocations,nearbyUsers,sendPushNotification,expoPushToken}}> 
            {children} 
        </UserContext.Provider>
    );
};

export default UserContextProvider;