import { View, Text, SafeAreaView, ImageBackground,TextInput, TouchableOpacity, StyleSheet,FlatList,Image, Button, ScrollView} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import React,{useState,useEffect,useContext} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {useFonts} from 'expo-font';
import axios from 'axios';
import { config } from '../urlConfig';
import * as SplashScreen from 'expo-splash-screen';
import { AuthContext } from '../context/AuthContext';
import { fetchLoggedInUser,fetchLocationOfUser, fetchOtherUserProfiles,fetchOtherUserLocation, fetchExistsConnection } from '../Features/Api/apiSlice'
import HaversineGeolocation from 'haversine-geolocation';
import HeaderItem from './Home/HeaderItem';
import NearbyUsers from './Home/NearbyUsers';
import Events from './Home/Events';


const jobTypes = ["Business", "Friendship", "Leisure"];
  
const Home  = ({navigation}) => {  

  // const {phoneNumber} = useContext(AuthContext);

  // const dispatch = useDispatch();
  // const apiState = useSelector((state) => state.api);

  // const [loggedUser,setLoggedUser] = useState({});
  // const [currUserLatitude,setCurrUserLatitude] = useState();
  // const [currUserLongitude,setCurrUserLongitude] = useState();
  // const [otherUsers,setOtherUsers] = useState([]);
  // const [nearbyUsers,setNearbyUsers] = useState([]);
  // const [isConnectionSent,setIsConnectionSent] = useState(false); 
  const [activeJobType, setActiveJobType] = useState("Business");
  const [searchTerm, setSearchTerm] = useState("");
  

  let [fontsLoaded] = useFonts({
    'DMBold' : require('../../assets/fonts/DMSans-Bold.ttf'),
    'DMMedium': require('../../assets/fonts/DMSans-Medium.ttf'),
    'DMRegular' : require('../../assets/fonts/DMSans-Regular.ttf')
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

// ------ HOME SCREEN NEW DESIGN HERE -----------------


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFC" }}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
            style={{
              flex: 1,
              padding: 16,
            }}>

          <HeaderItem welcomeText="Let's find nearby users" navigation={navigation}/>

          <View style={styles.searchContainer}>
              <View style={styles.searchWrapper}>
                <TextInput
                  style={styles.searchInput}
                  value={searchTerm}
                  onChangeText={(text) => setSearchTerm(text)}
                  placeholder='Search here'
                />
              </View>

              <TouchableOpacity style={styles.searchBtn}>
                <Image
                  source={require('../../assets/icons/search.png')}
                  resizeMode='contain'
                  style={styles.searchBtnImage}
                /> 
              </TouchableOpacity>
          </View>

          <View style={styles.tabsContainer}>
            <FlatList
              data={jobTypes}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.tab(activeJobType, item)}
                  onPress={() => {
                    setActiveJobType(item);
                  }}
                >
                  <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              contentContainerStyle={{ columnGap: 10 }}
              horizontal
            />
          </View>
      
          
          <NearbyUsers/>
          <Events />

        </View>
      </ScrollView>
  </SafeAreaView>
  )
}


export default Home;

const styles = StyleSheet.create({
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: "#F3F4F8",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: "100%",
  },
  searchInput: {
    fontFamily: 'DMRegular',
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: "#901f8f",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: "#F3F4F8",
  },
  tabsContainer: {
    width: "100%",
    marginTop: 16,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: 10 / 2,
    paddingHorizontal: 10,
    marginRight:10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: activeJobType === item ? "#444262" : "#C1C0C8",
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: 'DMMedium',
    color: activeJobType === item ? "#444262" : "#C1C0C8",
  }),
});



// ------ HOME SCREEN OLD DESIGN HERE -----------------

// //FLAT LIST ITEMS

//     const renderItem  =({ item }) => {
//         return (  
//           <View key={item.id}>  
           
//             <TouchableOpacity style={styles.userItem} >
//             {item.imageUrl === 'DefaultUserIcon.png' ?  
//                       <Image
//                       source={require('../../assets/DefaultUserIcon.png')}
//                       style={styles.userImage}
//                       /> :
//                       <Image style={styles.userImage} source={{ uri: item.imageUrl }} />
//               } 
              
//               <View style={styles.userInfo}> 
//                 <Text style={styles.userName}>{item.username}</Text> 
//                 <Text style={styles.userEmail}>{item.email}</Text>
           
              
//               </View>

//               <TouchableOpacity 
//                   style={item.connectionExists.payload === true ? [styles.connectButton,styles.disabledButton] : styles.connectButton }
//                   disabled={item.connectionExists.payload}
//                   onPress={() => {sendConnection(item.id) }}
//                 > 
                    
//                   <Text style={styles.connectButtonText}>{item.connectionExists.payload === true ? 'Connected' : 'Connect'}</Text> 
           
//                 </TouchableOpacity>
//             </TouchableOpacity>
//           </View>
//         )
       
//     }
      
  
//     return ( 
    
//       <SafeAreaView style={{flex:1,backgroundColor:'#fff'}} >
//         <View style={{padding:20}}>
//           <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:20}}>
//             <View style={{flexDirection:'column',justifyContent:'center'}}>
//               <Text style={{fontSize:20,fontFamily:'Roboto-Medium',marginBottom:5}}>Hello, {loggedUser.firstName} {loggedUser.lastName}</Text>
//               <Text style={{fontSize:17,fontFamily:'Roboto-LightItalic'}}>Let's see who's nearby and start connecting</Text>
//             </View>

//             <TouchableOpacity onPress={() => navigation.openDrawer()}>
//               {loggedUser.imageUrl === 'DefaultUserIcon.png' ? 
              
//                 <ImageBackground 
//                 source={require('../../assets/DefaultUserIcon.png')}
//                 style={{width:35,height:40}}
//                 imageStyle={{borderRadius:25}}
//               />
//               :
//                 <ImageBackground 
//                   source={{uri:loggedUser.imageUrl}}
//                   style={{width:35,height:40}} 
//                   imageStyle={{borderRadius:25}}
//                 />
//               }
               
//             </TouchableOpacity>

//           </View>
  
//           <View style={{
//             flexDirection:'row',
//             borderColor:'#C6C6C6', 
//             borderWidth:1,
//             borderRadius:8,
//             paddingHorizontal:10,
//             paddingVertical:8}}>
//             <Feather name='search' size={20} color='#C6C6C6' style={{marginRight:5}}/>
//             <TextInput placeholder='Search' />
//           </View>

//           <View style={styles.container}>
//             <Text style={styles.title}>Nearby Users</Text>
           
//             <FlatList
//               data={nearbyUsers}
//               renderItem={renderItem}
//               keyExtractor={(item) => item.id}
//               extraData={apiState} 
//             /> 
//           </View>
              
//         </View>
         
//       </SafeAreaView>
//     )
// }  

// export default Home

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     paddingTop: 20
//   },
//   title: {
//     alignSelf:'center',
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20
//   },
//   userItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20
//   },
//   userImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10
//   },
//   userInfo: {
//     flex: 1 
//   },
//   userName: {
//     fontWeight: 'bold',
//     fontSize: 16
//   },
//   userEmail: {
//     color: '#666'
//   },
//   connectButton: {
//     backgroundColor: '#007AFF',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 8
//   },
//   connectButtonText: {
//     color: '#fff'
//   },
//   disabledButton: {
//     backgroundColor: 'gray',
//   },
// });



