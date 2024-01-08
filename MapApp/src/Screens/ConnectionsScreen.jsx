import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity , Image,SafeAreaView,ImageBackground,TextInput} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import { fetchLoggedInUser, fetchUserConnections,fetchUserProfile } from '../Features/Api/apiSlice';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import HeaderItem from './Home/HeaderItem';


const Connections = ({route,navigation}) => {

    const phoneNumber = route.params?.phoneNumber;
  const dispatch = useDispatch();
  const apiState = useSelector((state) => state.api);

  const [loggedUser,setLoggedUser] = useState({});
  const [userConnections,setUserConnections] = useState({}); 
  const [searchTerm, setSearchTerm] = useState("");
  //const [userConnectionsData,setUserConnectionsData] = useState();
 

  //GET LOGGED IN USER
useEffect(() => {
    dispatch(fetchLoggedInUser(phoneNumber))
      
  },[dispatch,phoneNumber]);
 
  useEffect(() => {
    if(apiState.loggedUser)
    {
        setLoggedUser(apiState.loggedUser);
        dispatch(fetchUserConnections(apiState.loggedUser.id));
    }
  },[apiState.loggedUser,dispatch]);

  useEffect(() => {
    if (apiState.userConnections) {
        setUserConnections(apiState.userConnections);
    }

    console.log("----- AICI USER CONNECTIONS -----")
    console.log(userConnections);
  }, [apiState.userConnections]);

  let [fontsLoaded] = useFonts({
    'Roboto-Medium' : require('../../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-LightItalic' : require('../../assets/fonts/Roboto-LightItalic.ttf'),
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



  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFC" }}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
            style={{
              flex: 1,
              padding: 16,
            }}>

            <HeaderItem welcomeText="Let's start a discussion" navigation={navigation}/>

            <View style={styles.searchContainer}>
              <View style={styles.searchWrapper}>
                <TextInput
                  style={styles.searchInput}
                  value={searchTerm}
                  onChangeText={(text) => setSearchTerm(text)}
                  placeholder='Find your friend here'
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

          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Your Connections</Text>
              <TouchableOpacity>
                <Text style={styles.headerBtn}>Show all</Text>
              </TouchableOpacity>
            </View>
      
            <View style={styles.cardsContainer}>
                {userConnections?.map((user) => (
                    <TouchableOpacity style={styles.containerCard}>
                        
                    <TouchableOpacity style={styles.logoContainer}>
                        {user.imageUrl === 'DefaultUserIcon.png' ?
                        <Image source={require('../../assets/DefaultUserIcon.png')} resizeMode='contain'
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
                            style={styles.connectBtn }
                            onPress={() => {navigation.navigate('Chats')}}>

                                <Text style={styles.connectText}>Send Message</Text>

                        </TouchableOpacity>
                       
                    
                  </TouchableOpacity>
                ))}
            </View>
          </View>


        </View>
      </ScrollView>
    </SafeAreaView>
    
  );
}

export default Connections;

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
    backgroundColor: "#0fb300",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: "#fff",
  },
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
      backgroundColor: "#0fb300",
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginLeft:10,
    },
    connectText:{
      color:'#fff'
    },

  });