import { useState,useEffect,useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet
} from "react-native";
import {useSelector, useDispatch} from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { AuthContext } from '../../context/AuthContext';
import {useFonts} from 'expo-font';
import { fetchLoggedInUser } from '../../Features/Api/apiSlice'


const HeaderItem = ({ welcomeText,navigation }) => {

  const {phoneNumber} = useContext(AuthContext);

  const dispatch = useDispatch();
  const apiState = useSelector((state) => state.api);

  const [loggedUser,setLoggedUser] = useState({});

  useEffect(() => {
    dispatch(fetchLoggedInUser(phoneNumber));
  }, [dispatch, phoneNumber]);

  useEffect(() => {
    if (apiState.loggedUser) {
      setLoggedUser(apiState.loggedUser);
    }
  }, [apiState.loggedUser, dispatch]);

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
          <View style={{flexDirection:'row'}}>
            <View style={styles.container}>
              <Text style={styles.userName}>Hello {loggedUser.firstName}</Text>
              <Text style={styles.welcomeMessage}>{welcomeText}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                {loggedUser.imageUrl === 'DefaultUserIcon.png' ? 
              
                <ImageBackground 
                source={require('../../../assets/DefaultUserIcon.png')}
                style={{width:40,height:40}}
                imageStyle={{borderRadius:25}}
              />
              :
                <ImageBackground 
                  source={{uri:loggedUser.imageUrl}}
                  style={{width:40,height:40}} 
                  imageStyle={{borderRadius:25}}
                />
              }
                  
            </TouchableOpacity>
          </View>
  );
};

export default HeaderItem;

const styles = StyleSheet.create({
    container: {
      width: "87%",
    },
    userName: {
      fontFamily: 'DMRegular',
      fontSize: 20,
      color: "#444262",
    },
    welcomeMessage: {
      fontFamily: 'DMBold',
      fontSize: 24,
      color: "#312651",
      marginTop: 2,
    },
    
  });