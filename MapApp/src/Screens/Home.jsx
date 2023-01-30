import { View, Text, SafeAreaView, ScrollView, ImageBackground,TextInput, TouchableOpacity} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import React,{useEffect,useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import axios from 'axios';
//actions
import { getUserProfiles,getUserProfileByPhone } from '../Redux/Actions/UserProfileActions';



const Home = ({navigation}) => {

  const [usersData, setUsersData] = useState();

  const getUsers = async () => {
    try {
      const users = await axios.get('http://192.168.1.4:7071/api/UserProfiles',
      {
        timeout:2000
      });
      console.log(users.data);
      setUsersData(users.data);
    } catch (error) {
      console.log("err", error);
    }
  };
  
  useEffect(() => {

    getUsers();
  }, []);


// const {userProfiles} = useSelector(state => state.userProfileReducer);
// const dispatch = useDispatch();

// const fetchUserProfile = () => dispatch(getUserProfiles());

// useEffect(() => {
//   fetchUserProfile();
// },[]);
   

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
    
      <SafeAreaView style={{flex:1,backgroundColor:'#fff'}} >
        <ScrollView style={{padding:20}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
            <View style={{flexDirection:'column',justifyContent:'center'}}>
              <Text style={{fontSize:20,fontFamily:'Roboto-Medium',marginBottom:5}}>Hello Enache Bianca</Text>
              <Text style={{fontSize:17,fontFamily:'Roboto-LightItalic'}}>Let's see what's new today</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <ImageBackground 
                source={require('../../assets/MyPic.jpg')}
                style={{width:35,height:40}}
                imageStyle={{borderRadius:25}}
              />
            </TouchableOpacity>

          </View>
  
          <View style={{
            flexDirection:'row',
            borderColor:'#C6C6C6', 
            borderWidth:1,
            borderRadius:8,
            paddingHorizontal:10,
            paddingVertical:8}}>
            <Feather name='search' size={20} color='#C6C6C6' style={{marginRight:5}}/>
            <TextInput placeholder='Search' />
          </View>

          <View>
            <Text>TEST AICI</Text>
            <Text>{JSON.stringify(usersData)}</Text>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    )
}  

export default Home