import React,{useEffect,useCallback} from 'react'
import {View,Text, ImageBackground,Image, TouchableOpacity} from 'react-native'
import { DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


const CustomDrawer = (props) => {

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

  return (
    <View style={{flex:1}}>
        <DrawerContentScrollView {...props}
         contentContainerStyle={{flex:1,marginTop:-55}}
         >
            <ImageBackground source={require('../../../../assets/BearingPointBanner.png')} style={{paddingTop:70,paddingLeft:20,paddingBottom:30}}>
                <Image source={require('../../../../assets/MyPic.jpg')} style={{height:80,width:80,borderRadius:40,marginBottom:10}} />
                <Text style={{color:'#fff',fontSize:18,fontFamily:'Roboto-Medium',marginBottom:5}}>Enache Bianca</Text>
                
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#fff',fontFamily:'Roboto-Regular',marginRight:5}}>100 Connections</Text>
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
            <TouchableOpacity onPress={() =>{}} style={{paddingVertical:15}}>
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