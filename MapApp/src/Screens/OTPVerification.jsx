import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React ,{useState,useEffect,useRef} from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import firebase from 'firebase/compat/app';

const OTPVerification = ({navigation,phoneNumber}) => {

    let textInput = useRef(null);
    const lengthInput = 6;
    // const [internalVal,setInternalVal] = useState("");
    const [code,setCode] = useState('');

    const onChangeText = (val) => {
        // setInternalVal(val);
        setCode(val);
    }

    const onPressContinue = () => {
        
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId,code);
        
        if(code.length == 6) {
            firebase.auth().signInWithCredential(credential)
            .then(() => {
              setCode('');
              navigation.replace('Tabs');
            })
            .catch((error) => {
              //show alert in case of error
              alert(error);
            })
            
        }
    }

    useEffect(() => {
        textInput.focus();
    },[]);
    
    return (
    <View style={styles.container}>
        <KeyboardAvoidingView
            keyboardVerticalOffset={50}
            behavior={'padding'}
            style={styles.containerAvoidingView}
        >
            <Text style={styles.textTitle}>
                {"Please enter the code received by SMS."}
            </Text>
            <View>
                <TextInput 
                    ref={(input) => textInput = input}
                    onChangeText={onChangeText}
                    style={{width:0,height:0}}
                    value={code}
                    maxLength={lengthInput}
                    returnKeyType="done"
                    keyboardType='number-pad'
                    autoFocus={true}
                    
                />
                <View style={styles.containerInput}>
                    {
                        Array(lengthInput).fill().map((data,index)=>(

                            <View 
                            key={index}
                            style={[
                            styles.cellView,
                            {
                                borderBottomColor: index === code.length ? '#D70040' : '#234DB7'

                            }]}>
                                <Text 
                                style={styles.cellText}
                                onPress={() => textInput.focus()}
                                >
                                {code && code.length > 0 ? code[index] : ""}
                                </Text>
                            </View>
                        ))
                    }
                   
                </View>
            </View>

            <View style={styles.bottomView}>
                <TouchableOpacity onPress={onPressContinue}>
                        <View style={[
                            styles.btnContinue,
                            ]}>
                            <Text style={{color:'#ffffff',alignItems:'center'}}>Continue</Text>
                        </View>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    </View>
  )
}

export default OTPVerification

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    containerAvoidingView:{
        flex:1,
        alignItems:'center',
        padding:10
    },
    textTitle:{
        marginBottom:50,
        marginTop:50,
        fontSize:16
    }, containerInput:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'

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
    },
    bottomView: {
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-end',
        marginBottom:50,
        alignItems:'center'
    },
    btnContinue:{
        width:150,
        height:50,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#D70040'
       
    }
})