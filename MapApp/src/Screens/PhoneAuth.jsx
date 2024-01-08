import { StyleSheet, Text, View,Alert} from 'react-native'
import React, { useState ,useRef, useEffect} from 'react'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../firebaseConfig';
import firebase from 'firebase/compat/app';

const PhoneAuth = ({navigation}) => {
    let textInput = useRef(null);
    const [phoneNumber,setPhoneNumber] = useState();
    const [verificationId,setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const lengthInput = 6;

    const [code,setCode] = useState('');

    const onChangeText = (val) => {
        // setInternalVal(val);
        setCode(val);
    }

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        if(phoneNumber) {
            phoneProvider
            .verifyPhoneNumber(phoneNumber,recaptchaVerifier.current)
            .then(setVerificationId);
            setPhoneNumber('');
            
        }
    }
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId,code);
        
    
            firebase.auth().signInWithCredential(credential)
            .then(() => {
              setCode('');
            //   navigation.replace('DrawerNav');
                navigation.replace('UserProfileForm', {
                    phoneNumber: phoneNumber
                });
            })
            .catch((error) => {
              //show alert in case of error
            //   alert(error);
              Alert.alert('Please input a valid verification code.')
            })
            
      
    }

    useEffect(() => {
        textInput.focus();
    },[])


  return (
    <ScrollView contentContainerStyle={{flex: 1,justifyContent:'center',alignItems:'center'}}
    keyboardShouldPersistTaps='handled'
    >
        <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
        <Text style={styles.otpText}>Login using OTP</Text>
       
        <TextInput 
            ref={(input) =>  textInput = input}
            style={styles.phoneInputStyle}
            placeholder='+40 751 617 082'
            keyboardType='phone-pad'
            autoComplete='tel'
            onChangeText={setPhoneNumber}
            secureTextEntry={false}
        />
                

        <TouchableOpacity onPress={sendVerification}>
                <View style={[
                    styles.sendVerificationBtn,
                    {
                        backgroundColor: phoneNumber? '#D70040' : 'gray'
                    }
                    ]}>
                    <Text style={styles.btnText}>Send Code</Text>
                </View>
        </TouchableOpacity>
        <Text style={styles.otpText}>
                {"Please enter the code received by SMS."}
        </Text>
        <TextInput 
                ref={(input) => textInput = input}
                placeholder='Enter Code'
                onChangeText={onChangeText}
                value={code}
                style={styles.phoneInputStyle}
                maxLength={lengthInput}
                keyboardType='numeric'
        />
        <TouchableOpacity onPress={confirmCode}>
                <View style={[
                    styles.btnContinue,
                    ]}>
                    <Text style={styles.btnText}>Continue</Text>
                </View>
        </TouchableOpacity>
        
        
    </ScrollView>
  )
}

export default PhoneAuth

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    otpText:{
        fontWeight:'bold',
        fontSize:20,
        margin:10
    },
    phoneInputStyle:{
        marginTop:20,
        paddingTop:40,
        paddingBottom:20,
        paddingHorizontal:20,
        fontSize:24,
        borderBottomWidth:2,
        marginBottom:30,
        textAlign:'center',
    },
    sendVerificationBtn:{
        height:60,
        width:130,
        padding:20,
        margin:20,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#D70040',

    },
    btnContinue: {
        height:60,
        width:130,
        padding:20,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#D70040',
    },
    btnText:{
        textAlign:'center',
        fontWeight:'bold'
    },
    cellView : {
        paddingVertical: 11,
         width:40,
         margin:5,
         justifyContent:'center',
         alignItems:'center',
         borderBottomWidth:1.5,
 
     },
     cellText: {
         textAlign:'center',
         fontSize:16
     }
     
    
})