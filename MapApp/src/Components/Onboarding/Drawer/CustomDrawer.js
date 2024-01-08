import React,{useEffect,useCallback, useContext,useState} from 'react'
import {View,Text, ImageBackground,Image, TouchableOpacity} from 'react-native'
import { DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AuthContext } from '../../../context/AuthContext';
import { UserContext } from '../../../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUser } from '../../../Features/Api/apiSlice'


const CustomDrawer = (props,{route}) => {

    const {logout,phoneNumber} = useContext(AuthContext);
    // const {loggedUser} = useContext(UserContext);

    const dispatch = useDispatch();
    const apiState = useSelector((state) => state.api);

    const [loggedUser,setLoggedUser] = useState({});

  //GET LOGGED IN USER
  useEffect(() => {
    dispatch(fetchLoggedInUser(phoneNumber));  
    if(apiState.loggedUser)
    {
      setLoggedUser(apiState.loggedUser);
    }
  }, [phoneNumber]);
  

    let [fontsLoaded] = useFonts({
        'Roboto-Medium' : require('../../../../assets/fonts/Roboto-Medium.ttf'),
        'Roboto-LightItalic' : require('../../../../assets/fonts/Roboto-LightItalic.ttf'),
        'Roboto-Regular' : require('../../../../assets/fonts/Roboto-Regular.ttf')
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
    //   require('../../../../assets/MyPic.jpg')
  return ( 
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props}
         contentContainerStyle={{flex:1,marginTop:-55}}
         >
            <ImageBackground source={require('../../../../assets/BearingPointBanner.png')} style={{paddingTop:70,paddingLeft:20,paddingBottom:30}}>
                <Image source={{uri:loggedUser.imageUrl}} style={{height:80,width:80,borderRadius:40,marginBottom:10}} />
                <Text style={{color:'#fff',fontSize:18,fontFamily:'Roboto-Medium',marginBottom:5}}>{loggedUser.firstName} {loggedUser.lastName}</Text>
                
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#fff',fontFamily:'Roboto-Regular',marginRight:5}}>3 Connections</Text>
                    <FontAwesome5 name="users" size={14} color="#fff" />
                </View>
                
            </ImageBackground>

            <View style={{flex:1,backgroundColor:'#fff', paddingTop:10}}>
                <DrawerItemList  {...props} />
            </View>
            
        </DrawerContentScrollView>    
        <View style={{padding:20,borderTopWidth:1,borderTopColor:'#ccc'}}>
            <TouchableOpacity onPress={() =>{}} style={{paddingVertical:15}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Ionicons name="share-social-outline" size={22} />
                    <Text style={{fontSize:15,fontFamily:'Roboto-Medium',marginLeft:5}}>Share with a friend</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{logout()}} style={{paddingVertical:15}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Ionicons name="exit-outline" size={22} />
                    <Text style={{fontSize:15,fontFamily:'Roboto-Medium',marginLeft:5}}>Sign out</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    </View>
    
  )
}

export default CustomDrawer