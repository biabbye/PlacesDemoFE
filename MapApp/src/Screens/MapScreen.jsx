import React, { useState,useEffect,useRef,useContext,useCallback } from 'react';
import MapView, {Circle, Marker } from 'react-native-maps'; 
import { StyleSheet, View,Text, Image, Modal, ScrollView, Animated, TouchableOpacity,Dimensions,
  Platform} from 'react-native';
import Svg,{Image as SvgImage} from 'react-native-svg';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import PlacesLogo from '../../assets/PlacesLogo.svg';   
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUser, fetchLocationOfUser,fetchEvents,fetchLocationById } from '../Features/Api/apiSlice'
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

// const { Value, Clock, useCode,not,eq,block, cond, set, startClock, stopClock, clockRunning, timing, interpolate, Extrapolate } = Animated;

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Map =  ({route,navigation}) => {  


  const {phoneNumber} = useContext(AuthContext);

  const dispatch = useDispatch();
  const apiState = useSelector((state) => state.api);
  const mapRef = useRef(null);  

  const [loggedUser,setLoggedUser] = useState({});
  const [currUserLatitude,setCurrUserLatitude] = useState();
  const [currUserLongitude,setCurrUserLongitude] = useState();
  const [eventsArray,setEventsArray] = useState();
  const [eventsLocationsArray,setEventsLocationsArray] = useState(); 

  // const {loggedUser,currUserLatitude,currUserLongitude,nearbyUsers,sendPushNotification,expoPushToken} = useContext(UserContext);
 
  useEffect(() => {
    dispatch(fetchLoggedInUser(phoneNumber));
  }, [dispatch, phoneNumber]);

  useEffect(() => {
    dispatch(fetchEvents());
  },[dispatch]);

  useEffect(() => { 
    if(apiState.eventsData)
    {
      setEventsArray(apiState.eventsData);
    }

    console.log("AICI E EVENTS ARRAY ", eventsArray);
  },[apiState.eventsData,dispatch]);
 
  useEffect(() => {
    const fetchLocationsOfEvents = async () => {
      const eventLocationsArray = [];

      if(eventsArray)
      { 
        for (const eventItem of eventsArray)
        {
          console.log(eventItem.eventLocationId);
          eventLocationsArray.push({
            ...eventItem,
            locationDetails: await dispatch(
              fetchLocationById(eventItem.eventLocationId)
            )
          })
        }
        console.log(eventLocationsArray);
        for(const locationDet of eventLocationsArray)
        {
          console.log(locationDet.locationDetails.payload);
        }
        setEventsLocationsArray(eventLocationsArray);
        //console.log("AICI EVENTS LOCATION DETAILS:", eventsLocationsArray.eventLocationDetails.payload);

      
      }
    }
    fetchLocationsOfEvents();
  },[dispatch,eventsArray])

  useEffect(() => {
    if (apiState.loggedUser) { 
      setLoggedUser(apiState.loggedUser);
      dispatch(fetchLocationOfUser(apiState.loggedUser.id)); 
    }
  }, [apiState.loggedUser, dispatch]);

  useEffect(() => {
    if (apiState.userLocation) {
      setCurrUserLatitude(apiState.userLocation.latitude);
      setCurrUserLongitude(apiState.userLocation.longitude);
    }

    mapRef?.current?.animateToRegion({    
      
      latitude: apiState.userLocation.latitude, 
      longitude: apiState.userLocation.longitude, 
      latitudeDelta: 0.0300, 
      longitudeDelta: 0.0300 
    });   
  }, [apiState.userLocation, apiState.loggedUser, dispatch]);

  const CustomMarker = () => {
    return (
            <View style={styles.marker}>
              {loggedUser.imageUrl === 'DefaultUserIcon.png' ? 
                      <Image
                      source={require('../../assets/DefaultUserIcon.png')}
                      style={styles.markerImage}
                      /> : 
                      <Image  
                      source={{uri:loggedUser.imageUrl}}
                      style={styles.markerImage}
                      /> 
                } 

              <View style={styles.markerBadge}>
                <View style={styles.markerBadgeInner} /> 
              </View>
            </View>
  
    )
  }

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  const _scrollView = React.useRef(null);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 20); // animate 30% away from landing on the next item
      if (index >= eventsLocationsArray.length) {
        index = eventsLocationsArray.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const { coordinate } = eventsLocationsArray[index];
          mapRef.current.animateToRegion(
            {
              latitude:coordinate.locationDetails.latitude,
              longitude:coordinate.locationDetails.longitude,
              latitudeDelta: 0.04864195044303443,
              longitudeDelta: 0.040142817690068,
            },
            350
          );
        }
      }, 10);
    });
  },[eventsLocationsArray]);

  const interpolations = eventsLocationsArray?.map((item, index) => {
    const inputRange = [
      (index - 1) * (CARD_WIDTH+20),
      index * (CARD_WIDTH+20),
      (index + 1) * (CARD_WIDTH+20),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (item) => {
    const markerID = item._targetInst.return.key;

    let x = markerID * (CARD_WIDTH+20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }

 

  return (
    
    <View style={styles.container}> 
       <MapView ref={mapRef}
            style={styles.map}
            provider="google"
        >
            <Marker coordinate={{latitude:currUserLatitude, longitude:currUserLongitude}}>
              
                <CustomMarker />    
       
                        
            </Marker> 

            {eventsLocationsArray?.map((item,index) => {
                const scaleStyle = {
                  transform: [
                    {
                      scale: interpolations[index].scale,
                    },
                  ],
                };

                return (
                  <Marker key={item.id} 
                    coordinate={{latitude:item.locationDetails.payload.latitude,longitude:item.locationDetails.payload.longitude}}  
                    onPress={(e)=>onMarkerPress(e)}
                  >

                  <Animated.View style={[styles.markerWrap]}>
                    <Animated.Image
                      source={require('../../assets/DefaultEventImage.png')}
                      style={[styles.eventMarker, scaleStyle]}
                      resizeMode="cover"
                    />
                  </Animated.View>
                  </Marker>
                )
            }
                
              
            )}

            
              
         </MapView>
         <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
      >
        {eventsArray?.map((item, index) =>(
          <View style={styles.card} key={index}>
            <Image 
              source={require('../../assets/DefaultEventImage.png')}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{item.eventName}</Text>
              <Text numberOfLines={1} style={styles.cardDescription}>{item.eventDescription}</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.signIn, {
                    borderColor: '#FF6347',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[styles.textSign, {
                    color: '#FF6347'
                  }]}>Join Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

        <View style={styles.titleContainer}> 
          <PlacesLogo width={70} height={70} marginRight={-15}/> 
          <Text style={styles.title}>Places<Text style={styles.title2}>App</Text></Text>
        </View>
         
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
    ...StyleSheet.absoluteFillObject,
  }, 
  markerContainer: {
    width: 70,
    height: 70,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#f44336',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 60,
    left: 5,
  },
  title: {
    fontWeight: 'bold',
    fontStyle:"italic",
    fontSize: 30,
    color:'#901f8f'

  },
  title2: {
    fontWeight: 'bold',
    fontStyle:"italic",
    fontSize: 30,
    color:'#25383C'
  },

  markerImage: {
    width: 40,
    height: 40,
    borderRadius:50
  },
  markerText: {
    fontSize: 20,
    color: '#f44336',
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  markerBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#5DB075',
    width: 18,
    height: 18,
    borderRadius: 8,
    borderWidth:3,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerBadgeInner: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 5,
  },
  eventMarker: {
    width: 50,
    height: 50,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'black'
  },
  eventImage: {
    width: 35,
    height: 35,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carouselItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  carouselTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  carouselDescription: {
    fontSize: 18,
    textAlign: 'center',
  },

  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  eventMarker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }
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


  // const loggedUser = useSelector(state => state.loggedUser);
  // const users = useSelector(state => state.userProfiles);
  // const dispatch = useDispatch();

  // const fetchUsers = () => dispatch(getUserProfiles());
  // const fetchLoggedUser = () => dispatch(getUserProfileByPhone(phoneNumber));
  
  // useEffect(() => {
  //   fetchUsers();
  //   fetchLoggedUser();
  // },[])
