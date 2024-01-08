import {React,useState,useEffect,useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from "react-native";
import {useSelector, useDispatch} from 'react-redux';
import {useFonts} from 'expo-font';
import axios from 'axios';
import { config } from '../../urlConfig';
import { AuthContext } from '../../context/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import { fetchLoggedInUser,fetchLocationOfUser, fetchOtherUserProfiles,fetchOtherUserLocation, fetchExistsConnection } from '../../Features/Api/apiSlice'
import HaversineGeolocation from 'haversine-geolocation';

const NearbyUsers = () => {
    const {phoneNumber} = useContext(AuthContext);

    const dispatch = useDispatch();
    const apiState = useSelector((state) => state.api);
  
    const [loggedUser,setLoggedUser] = useState({});
    const [currUserLatitude,setCurrUserLatitude] = useState();
    const [currUserLongitude,setCurrUserLongitude] = useState();
    const [otherUsers,setOtherUsers] = useState([]);
    const [nearbyUsers,setNearbyUsers] = useState([]);
    const [isConnectionSent,setIsConnectionSent] = useState(false); 
  
  
    useEffect(() => {
      dispatch(fetchLoggedInUser(phoneNumber));
    }, [dispatch, phoneNumber]);
  
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
        dispatch(fetchOtherUserProfiles(apiState.loggedUser.id));
      }
    }, [apiState.userLocation, apiState.loggedUser, dispatch]); 
  
    useEffect(() => {
      if (apiState.otherUserProfiles) {
        setOtherUsers(apiState.otherUserProfiles);
      }
    }, [apiState.otherUserProfiles]);
  
    useEffect(() => {
      const fetchOtherUserLocationAndUpdateNearbyUsers = async () => {
        const nearbyUsersArray = [];
  
        for (const user of otherUsers) {
          const otherUserLocationId = user.currentLocationId;
          await dispatch(fetchOtherUserLocation(otherUserLocationId));
          if (apiState.otherUserLocation) {
            const myLoc = {
              latitude: currUserLatitude,
              longitude: currUserLongitude,
            };
            const otherLoc = {
              latitude: apiState.otherUserLocation.latitude,
              longitude: apiState.otherUserLocation.longitude,
            };
            const distanceInKm = HaversineGeolocation.getDistanceBetween(
              myLoc,
              otherLoc
            );
            if (distanceInKm < 10 && distanceInKm > -1) {
              nearbyUsersArray.push({
                ...user,
                connectionExists: await dispatch(
                  fetchExistsConnection({
                    senderId: loggedUser.id,
                    receiverId: user.id,
                  })
                ), 
              });
            }
          }
        }
  
        setNearbyUsers(nearbyUsersArray);
        console.log("NEARBYUSERS AICI");
        console.log("--------------------------------\n",nearbyUsers);
      };
      if (otherUsers.length > 0 && currUserLatitude && currUserLongitude) {
        fetchOtherUserLocationAndUpdateNearbyUsers();
      }
    },[otherUsers, currUserLatitude, currUserLongitude, dispatch, loggedUser.id]);
  
    const sendConnection = async (receiverId) => {
      let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
   
      var connectionData = {
        senderId:loggedUser.id,
        receiverId:receiverId,
        status:0
      }
  
  
      await axios.post(`${config.BASE_URL}/api/Connection`,
        connectionData,axiosConfig
      ).then( 
        response => {
          console.log(response.data);
          
        }
      );
    }

    let [fontsLoaded] = useFonts({
        'DMBold' : require('../../../assets/fonts/DMSans-Bold.ttf'),
        'DMMedium': require('../../../assets/fonts/DMSans-Medium.ttf'),
        'DMRegular' : require('../../../assets/fonts/DMSans-Regular.ttf')
       })
      
      
       useEffect(() => {
        async function prepare() {
          await SplashScreen.preventAutoHideAsync();
        }
        prepare();
      }, []);
      
      if (!fontsLoaded) {
        return undefined;
      }else {
        SplashScreen.hideAsync();   
      }

        return (
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Nearby Users</Text>
              <TouchableOpacity>
                <Text style={styles.headerBtn}>Show all</Text>
              </TouchableOpacity>
            </View>
      
            <View style={styles.cardsContainer}>
                {nearbyUsers?.map((user) => (
                    <TouchableOpacity style={styles.containerCard}>
                        
                    <TouchableOpacity style={styles.logoContainer}>
                        {user.imageUrl === 'DefaultUserIcon.png' ?
                        <Image source={require('../../../assets/DefaultUserIcon.png')} resizeMode='contain'
                        style={styles.logImage}/>
                        :
                        <Image source={{uri:user.imageUrl}} resizeMode='contain'
                        style={styles.logImage}/>
                        }
                    </TouchableOpacity>

                   
                        <View style={styles.textContainer}>
                            <View>
                                <Text style={styles.jobName} numberOfLines={1}>
                                    {user?.username}
                                </Text> 
                                <Text style={styles.jobType}>{user?.email}</Text> 
                            </View>
                            
                        </View>
                        <TouchableOpacity 
                            style={user.connectionExists.payload === true ? [styles.connectBtn,styles.disabledButton] : styles.connectBtn }
                            disabled={user.connectionExists.payload}
                            onPress={() => {sendConnection(user.id) }}>

                                <Text style={styles.connectText}>{user.connectionExists.payload === true ? 'Connected' : 'Connect'}</Text>

                        </TouchableOpacity>
                       
                    
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        );
}

export default NearbyUsers;

const styles = StyleSheet.create({
    container: {
      marginTop:24,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'DMMedium',
      color: "#312651",
    },
    headerBtn: {
      fontSize: 16,
      fontFamily: 'DMMedium',
      color: "#83829A",
    },
    cardsContainer: {
      marginTop: 16,
      gap: 10,
    },
    containerCard: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 16,
        borderRadius: 10,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowColor: "#F3F4F8",
      },
      logoContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#F3F4F8",
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
      },
      logImage: {
        width: "70%",
        height: "70%",
      },
      textContainer: {
        flex: 1,
        flexDirection:'row',
        marginHorizontal: 16,
      },
      jobName: {
        fontSize: 16,
        fontFamily: "DMBold",
        color: "#312651",
      },
      jobType: {
        fontSize: 10 + 2,
        fontFamily: "DMRegular",
        color: "#83829A",
        marginTop: 3,
        textTransform: "capitalize",
      },
      connectBtn:{
        backgroundColor: "#901f8f",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginLeft:10,
      },
      connectText:{
        color:'#F3F4F8'
      },
      disabledButton:{
        backgroundColor: 'gray',
      }
     
    });
  