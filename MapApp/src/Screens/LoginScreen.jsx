import React,{useEffect,useContext,useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native'; 
import { ScrollView } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useIsFocused } from '@react-navigation/native';
import CustomButton from '../utilities/CustomButton';
import InputField from '../utilities/InputField';
import * as Location from 'expo-location';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { config } from '../urlConfig';

//GOOGLE AUTH 
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';


WebBrowser.maybeCompleteAuthSession();
 
const LoginScreen = ({navigation,route}) => {

  const {login} = useContext(AuthContext);

  // SAVE USER LOCATION
  const [currentLocationId,setCurrentLocationId] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude,setLatitude] = useState(null);
  const [longitude,setLongitude] = useState(null);
 
  const [phoneNumber,setPhoneNumber] = useState();

 
  // const [token, setToken] = useState(null);
  const [userInfo,setUserInfo] = useState({});  
  const [request,response,promptAsync] = Google.useAuthRequest({
    expoClientId:"478621355563-chhsjpjp7t7jh651idhecdq32n8qnbgb.apps.googleusercontent.com", 
    iosClientId:"478621355563-rc2iulcrfaee9u3sfqp8tqgaea2q2vtb.apps.googleusercontent.com",
    androidClientId:"478621355563-7e3k7q7mjpfh6fb7lsjefaj6um2lg2bb.apps.googleusercontent.com",
  });

  useEffect(() => {
      handleSignInWithGoogle();
      if(userInfo)
      {
        navigation.navigate("UserProfileForm",{userDataGoogle:userInfo})
      }
  },[response])

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if(!user) {
      if(response?.type==='success')
      {
        await getUserInfo(response.authentication.accessToken);
      }
      
    }else {
      setUserInfo(JSON.parse(user));
    }
  }
 

  const getUserInfo = async (token) => {
    if(!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );  

      const user = await response.json(); 
      await AsyncStorage.setItem("@user",JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.log(error);
    } 
  };
 

  const saveUserLocation = async () => {
  
      await axios.post(`${config.BASE_URL}/api/Location`,{
        latitude,
        longitude
      }).then( response => {
        console.log(response.data);
        //setCurrentLocationId(response.data.id); 
      });
      
  }

  const syncLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    if (status !== 'granted') {
      console.log("denied")
      setErrorMsg('Permission to access location was denied');
      return;
    }

    console.log("status", status); // <=== always says "granted"
    console.log("Waiting on location..");

      let subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 10, // minimum distance between updates, in meters
          maximumAge:10000,
        },
        (location) => {
          //console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        }
      );
      console.log("Latitude: ", latitude);
      console.log("Longitude: ",longitude);
  }    

  useEffect(() => {
    syncLocation();

    if(latitude && longitude)
    {
      console.log("COORDS HERE: ", latitude,longitude);
      axios.get(`${config.BASE_URL}/api/Location/GetLocationByCoords?latitude=${latitude}&longitude=${longitude}`).then(
        response => {
          console.log(response.status);  
       
          if(response.status == 204) // NO CONTENT - THE LOCATION DOES NOT EXISTS IN THE DATABASE 
          {
            saveUserLocation();
            setCurrentLocationId(response.data.id);
          }else if(response.status ==200){
            console.log("A INTRAT IN GET")
            console.log(response.data.id);
            setCurrentLocationId(response.data.id);  
          } 
        })
    }
  },[]);
 
  
  //FONTS LOADING
    let [fontsLoaded] = useFonts({
        'Roboto-Medium' : require('../../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-LightItalic' : require('../../assets/fonts/Roboto-LightItalic.ttf')
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
        <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center'}} keyboardShouldPersistTaps='handled'>
          <View style={{paddingHorizontal: 25}}>    
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 28,
                fontWeight: '500',
                color: '#333',
                marginBottom: 30,
              }}>
              Login using Phone Number
            </Text>
    
            <InputField
              label={'Phone Number'}
              icon={
                <Ionicons
                name="call"
                size={20} 
                color="#666"
                style={{marginRight: 5}}
              />
              }
              value={phoneNumber}
              onChangeText ={text => setPhoneNumber(text)}
            />

            
            <CustomButton label={"Login"} onPress={() => {(login(phoneNumber))}} />

            <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}> 
              Or ...
            </Text>

            <TouchableOpacity disabled={!request} onPress={() => {promptAsync()}}
              style={{
                backgroundColor: '#4285F4',
                padding: 15,
                borderRadius: 10,
                marginBottom: 30,
              }}>
                
              <Text 
                style={{
                  textAlign: 'center',
                  fontWeight: '700',
                  fontSize: 16,
                  color: '#fff', 
                }}>
                  
                     
                
                <Ionicons name='logo-google' size={22}>
                  <Text> Google Sign In</Text> 
                </Ionicons>
              </Text>
              <Text>{JSON.stringify(userInfo,null,2)}</Text>
              
            </TouchableOpacity>
    
            <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}> 
              Or, maybe ...
            </Text>
    
            
    
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 30,
              }}>
              <Text>New to the app?</Text>
              <TouchableOpacity onPress={() => {navigation.navigate('UserProfileForm', { currentLocationId: currentLocationId})}}>
                <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register and set your profile HERE</Text>
              </TouchableOpacity>

              
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 30,
              }}>
                
            
            </View>

          </View>
        </ScrollView>
      );
  
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

