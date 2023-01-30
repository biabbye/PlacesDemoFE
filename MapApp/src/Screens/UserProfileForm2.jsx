import { View, Text,TouchableOpacity,ImageBackground,ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Form, FormItem ,Picker} from 'react-native-form-component';
import React,{useState} from 'react'
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const UserProfileForm2 = () => {

    const [imageUrl, setImageUrl] = useState("")
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [phoneNumber,setPhoneNumber] = useState("");
    const [city,setCity] = useState("");
    const [interest,setInterest] = useState("");

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All, 
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1, 
        });
    
        console.log(result);

        if (!result.canceled) {
          setImageUrl(result.assets[0].uri);
        }

      };

      const submitUserProfile = async () => {
        try {
          const response = await axios.post('http://192.168.1.4:7071/api/UserProfiles',{
           imageUrl,firstName,lastName,username,phoneNumber,email,city,interest
          });
          console.log(response.data);
        }catch(err) {
          console.log(err);
        }
    
       
      };

      const displayPayload = () => {
        console.log("AICI!!!!!!");
        console.log(image)
        console.log(firstName);
        console.log(lastName);
        console.log(username);
        console.log(phoneNumber);
        console.log(email);
        console.log(city);
        console.log(interest);
    
      }

  return (
    <ScrollView contentContainerStyle={{flex: 1,paddingTop:50,padding:30}}
    keyboardShouldPersistTaps='handled'>
     <Form method="POST" onButtonPress={submitUserProfile}>
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
                  uri: imageUrl,
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

        <FormItem label="First Name"
            isRequired
            value={firstName}
            onChangeText={(firstName) => setFirstName(firstName)}
            asterik
            />
        <FormItem label="Last Name"
            isRequired
            value={lastName}
            onChangeText={(lastName) => setLastName(lastName)}
            asterik
            />
        <FormItem label="Username"
            isRequired
            value={username}
            onChangeText={(username) => setUsername(username)}
            asterik
            />

        <FormItem label="Phone number"
            isRequired
            value={phoneNumber}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            asterik
            />
        <FormItem label="Email"
            isRequired
            value={email}
            onChangeText={(email) => setEmail(email)}
            asterik
            />
        <FormItem label="City"
            isRequired
            value={city}
            onChangeText={(city) => setCity(city)}
            asterik
            />
        <Picker
            items={[
                {label: 'Business purpose', value: 'business'},
                {label: 'Friendship', value: 'friendship'},
                {label: 'Leisure', value: 'leisure'},
              ]}
            label="Pick a number"
            selectedValue={interest}
            onSelection={(interest) => setInterest(interest.value)}
        />
        
    </Form>
    </ScrollView>
    
  )
}

export default UserProfileForm2