import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet,Text,View,Image,TouchableOpacity } from "react-native";


import Home from '../Screens/Home';
import Map from "../Screens/Map";
import Profile from '../Screens/Profile';
import Settings from '../Screens/Settings';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator screenOptions={{
            tabBarShowLabel:false,
            headerShown:false,
            tabBarStyle: {
                position: 'absolute',
                bottom:20,
                left:20,
                right:20,
                elevation:0,
                backgroundColor: '#ffffff',
                borderRadius:15,
                height:80,
                ...StyleSheet.shadow
            }
        }}>
            <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
                tabBarIcon:({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center', top:10}} >
                        <Image source={require('../../assets/HomeIcon.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45' : '#748c94' , fontSize:12
                        }}/>
                        <Text style={{color: focused? '#e32f45' : '#748c94' , fontSize : 12}}>
                            HOME
                        </Text>
                    </View>
                )
            }}
            />
            <Tab.Screen 
            name="Explore" 
            component={Map}
            options={{
                tabBarIcon:({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center', top:10}} >
                        <Image source={require('../../assets/ExploreIcon.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45' : '#748c94' , fontSize:12
                        }}/>
                        <Text style={{color: focused? '#e32f45' : '#748c94' , fontSize : 12}}>
                            EXPLORE
                        </Text>
                    </View>
                )
            }} />
            <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
                tabBarIcon:({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center', top:10}} >
                        <Image source={require('../../assets/ProfileIcon.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45' : '#748c94' , fontSize:12
                        }}/>
                        <Text style={{color: focused? '#e32f45' : '#748c94' , fontSize : 12}}>
                            PROFILE
                        </Text>
                    </View>
                )
            }} />
            <Tab.Screen 
            name="Settings" 
            component={Settings}
            options={{
                tabBarIcon:({focused}) => (
                    <View style={{alignItems:'center', justifyContent:'center', top:10}} >
                        <Image source={require('../../assets/SettingsIcon.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#e32f45' : '#748c94' , fontSize:12
                        }}/>
                        <Text style={{color: focused? '#e32f45' : '#748c94' , fontSize : 12}}>
                            SETTINGS
                        </Text>
                    </View>
                )
            }} />
        </Tab.Navigator>
    )
}

const style= StyleSheet.create({
    shadow: {
        shadowColor:'#7f5df0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    }
})

export default Tabs;