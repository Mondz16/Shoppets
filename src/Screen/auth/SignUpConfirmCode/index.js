/* eslint-disable prettier/prettier */
import React, { useState , useEffect } from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import Button from '../../../Component/Button';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constant/color';
import Input from '../../../Component/Input';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';

const SignUpConfirmCode = ({navigation, route}) => {
  const {confirmation} = route?.params || {};
  const [errorMessage , setErrorMessage] = useState();
  const [code, setCode] = useState('');
  console.log('route >>', route);
  console.log('confirmation >>', confirmation);
  console.log('code >>', code);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [errorMessage]);

  function onError(onError) {
    setErrorMessage(onError);
  }

  const onSignUp = () => {
    confirmCode();
  };

  // Handle confirm code button press
  async function confirmCode() {
    try {
      const credential = auth.PhoneAuthProvider.credential(confirmation?.verificationId, code);
      let data = await auth().currentUser.linkWithCredential(credential);
      console.log('data >>', data);
      if (data){
        navigation.navigate('PostSignUp', {navigation});
      }
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        onError('Invalid code.');
      } else {
        onError('Account linking error');
      }

      console.log('error>', error);
    }
  }

  return (
      <LinearGradient
            style={styles.container}
            colors={[colors.darkBlue, colors.green]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
        >

        <ScrollView style={styles.scrollView}>
          <View style={styles.modalHolder}>
            <Image style={{width: '100%', position: 'absolute'}} source={require('../../../assets/background.png')} />
            <Image style={styles.icon} source={require('../../../assets/paws.png')} />
            <LinearGradient
                  style={styles.inputHolder}
                  colors={[colors.lighBlue, colors.white]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
              >
                <Image style={styles.image} source={require('../../../assets/Cat.png')} />
                <Text style={styles.label}>Enter Confirmation Code</Text>
                <Text style={styles.text}>Enter the 6-digit code we sent to</Text>
                <Text style={styles.numberText}>+63 9** **** *12</Text>
                <Text style={styles.text}>It may take up to a minute for you to receive this code.</Text>
                <Input onChangeText={text => setCode(text)} placeholder={'Code'} style={{marginTop: 10}} keyboardType={'number-pad'} maxLength={6}/>
                <Button onPress={onSignUp} title={'Confirm'} withBorder={true}/>

                <Text style={styles.error}>{errorMessage}</Text>

                <View style={styles.signUp}>
                  <Text style={styles.text}>Didn't get it?</Text>
                  <TouchableOpacity onPress={navigation.goBack}>
                    <Text style={styles.signUpText}>Resend code</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </ScrollView>
      </LinearGradient>
  );
};

export default React.memo(SignUpConfirmCode);
