import { View, Text,TouchableOpacity,TextInput,StyleSheet,Alert} from 'react-native'
import React,{useRef,useState} from 'react'
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../firebaseConfig';
import firebase from 'firebase/compat/app';
import { ScrollView } from 'react-native-gesture-handler';


const Authentication = ({navigation}) => {

  const [phoneNumber,setPhoneNumber] = useState('');
  const [code,setCode] = useState('');
  const [verificationId,setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);
  
  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
        .verifyPhoneNumber(phoneNumber,recaptchaVerifier.current)
        .then(setVerificationId);
        setPhoneNumber('');
        console.log("AICIIIIIII");
        console.log(verificationId);

  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId,code);
    console.log("AICIIIIIII");
    console.log(credential);
    firebase.auth().signInWithCredential(credential)
          .then(() => {
            setCode('');
          })
          .catch((error) => {
            //show alert in case of error
            alert(error);
          })
          console.log("AICIIIIIII");
          console.log(code);
          console.log("AICIIIIIII");
          console.log(verificationId);
          navigation.replace('Tabs')
  }

  return (
    <ScrollView contentContainerStyle={[{flexGrow: 1},{alignItems:'center'},{justifyContent:'center'}]} keyboardShouldPersistTaps='handled'>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
      <Text style={styles.otpText}>Login using Phone Number</Text>
      <TextInput placeholder='Phone Number With Country Code'
                 onChangeText={setPhoneNumber}
                 keyboardType='phone-pad'
                 autoComplete='tel'
                 style={styles.textInput}
      />
      <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
        <Text style={styles.buttonText}>
          Send Verification
        </Text>
      </TouchableOpacity>
      <TextInput placeholder='Confirm Code'
                 onChangeText={setCode}
                 keyboardType='number-pad'
                 style={styles.textInput}
      />
      <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
        <Text style={styles.buttonText}>
          Confirm Verification
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

export default Authentication

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexGrow:1,
    backgroundColor:'#000',
    alignItems:'center',
    justifyContent:'center'
  },
  textInput:{
    paddingTop:40,
    paddingBottom:20,
    paddingHorizontal:20,
    fontSize:24,
    borderBottomColor:'#fff',
    borderBottomWidth:2,
    marginBottom:20,
    textAlign:'center',
    color:'#fff'
  },
  sendVerification:{
    padding:20,
    backgroundColor:'#3498db',
    borderRadius:10,
  },
  sendCode:{
    padding:20,
    backgroundColor:'#9b59b6',
    borderRadius:10,
  },
  buttonText:{
    textAlign:'center',
    color:'#fff',
    fontWeight:'bold',
  },
  otpText:{
    fontSize:24,
    fontWeight:'bold',
    color:'#fff',
    margin:20
  }
});