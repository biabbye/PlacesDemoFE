import React, {useEffect, useContext, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRoute } from "@react-navigation/native"
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from 'react-native-form-component';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { config } from '../urlConfig';
import { getStorage, ref, uploadBytes } from 'firebase/storage'; 
import {app} from '../../firebaseConfig'

//imports used for location tracking
import * as Location from 'expo-location';

const UserProfileForm = ({navigation,route}) => {

    const {signUp} = useContext(AuthContext);
    const {userDataGoogle} = route.params;

    const [imageUrl, setImageUrl] = useState("DefaultUserIcon.png");
    const [uploading,setUploading] = useState(false);
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [city,setCity] = useState("");

    const currentLocationId = route.params.currentLocationId;
    console.log("ID LOCATIE CURENTA: ", currentLocationId);

  const {colors} = useTheme();


  const [interest,setInterest] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, 
    });

    console.log(result);
    if (!result.cancelled) {
      setImageUrl(result.uri);

      setUploading(true);
      const storage = getStorage(); //the storage itself
      const reference = ref(storage, 'MyAvatar.jpg'); //how the image will be addressed inside the storage

      //convert image to array of bytes
      const img = await fetch(result.uri);
      const bytes = await img.blob();

      await uploadBytes(reference, bytes); //upload images

      setUploading(false);
    }
  };

  
  
  var userData = {
    imageUrl:imageUrl,
    firstName:firstName,
    lastName:lastName,
    username:username,
    phoneNumber:phoneNumber,
    email:email,
    city:city,
    interest:interest
  };

  const submitUserProfile = async () => {

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };

    var userData = {
      imageUrl:imageUrl,
      firstName:firstName,
      lastName:lastName, 
      username:username,
      phoneNumber:phoneNumber,
      email:email,
      city:city,
      interest:interest
    };

    console.log(userData);
    try {
      const response = await axios.post(`${config.BASE_URL}/api/UserProfile?locationId=${currentLocationId}`,
      userData,axiosConfig
      );
      console.log(response.data);
      navigation.replace('DrawerNav');
    }catch(err) {
      console.log(err);
    }   
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1,paddingTop:100,padding:30}}
    keyboardShouldPersistTaps='handled'>
        <View style={{alignItems: 'center',marginBottom:20}}>
          <TouchableOpacity onPress={pickImage}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: userDataGoogle!= null ? userDataGoogle.picture : imageUrl,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            name='firstName'
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userDataGoogle!= null ? userDataGoogle.given_name : firstName}
            onChangeText={setFirstName}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            name='lastName'
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userDataGoogle!= null ? userDataGoogle.family_name : lastName}
            onChangeText={setLastName}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            name='username'
            placeholder="Username"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userDataGoogle!= null ? userDataGoogle.name : username}
            onChangeText={setUsername}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            name='phoneNumber'
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            name='email'
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            value={userDataGoogle!= null ? userDataGoogle.email : email}
            onChangeText={setEmail}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput
            name='city'
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={city}
            onChangeText={setCity}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        
        <Picker

            items={[
                {label: 'Business purpose', value: 'business'},
                {label: 'Friendship', value: 'friendship'},
                {label: 'Leisure', value: 'leisure'},
              ]}
            placeholder="Select your interest"
            selectedValue={interest}
            onSelection={(interest) => setInterest(interest.value)}
        />
 
        
        <TouchableOpacity style={styles.commandButton} onPress={() => {signUp(currentLocationId,userData)}}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

export default UserProfileForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#D70040',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});