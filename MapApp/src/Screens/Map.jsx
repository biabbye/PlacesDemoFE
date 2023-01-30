import React, { useState,useEffect,useRef } from 'react';
import MapView, {Circle, Marker } from 'react-native-maps';
import { StyleSheet, View,Text, Image } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const Map = () => {

  const [userLocation, setUserLocation] = useState({});
  const mapRef = useRef();
  

  useEffect(() => {
      (async () => {
      
        let { status } = await Location.requestForegroundPermissionsAsync();
        if(status == 'granted') {
          console.log("Permission granted.")
        }
        if (status !== 'granted') {
          console.log("Permission not granted.")
          
        }
        
        //const currentLoc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
        let currentLocation = await Location.watchPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 1,
          timeInterval: 2000
        }, 
        (loc) => { 
          setUserLocation(loc.coords)
          mapRef.current.animateToRegion({
          
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009
        });
        
        });
      
        console.log(userLocation);
        
      })();
    
    
  },[]);
  
  
  

  return (
   
    <View style={styles.container}>
      
       <MapView ref={mapRef}
            style={styles.map}
            provider="google"
        >

          <Marker coordinate={{
            latitude:userLocation.latitude,
            longitude:userLocation.longitude
          }}/>

          
         </MapView>



         {/* <Text>{JSON.stringify(userLocation)}</Text> */}
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  map: {
    width: '100%',
    height: '100%',
  },

});

// import * as Location from 'expo-location';
// import * as Notifications from 'expo-notifications';

// const watchId = await Location.watchPositionAsync({
//   accuracy: Location.Accuracy.BestForNavigation,
//   timeInterval: 1000,
//   distanceInterval: 1,
// }, location => {
//   // Check if another user is within a certain distance of the user's location
//   if (userIsClose(location)) {
//     // Schedule a notification
//     Notifications.scheduleLocalNotificationAsync({
//       title: 'Another user is nearby!',
//       body: 'You are close to another user',
//       data: {},
//     });
//   }
// });
