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

const SignUp = ({navigation}) => {

  const [values, setValues] = useState({
    full_name: '',
    email: '',
    contact_number: '',
    password: '',
    confirm_password: '',
  });
  const [errorMessage , setErrorMessage] = useState();

  const onChange = (value, key) =>{
    setValues((vals) => ({
      ...vals,
      [key]: value,
    }));
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [errorMessage]);

  function onError(onError) {
    setErrorMessage(onError);
  }

  const onSignUp = () => {
    if (!values.full_name || !values.email || !values.contact_number || !values.password || !values.confirm_password){
      onError('Fill in the input fields!');
      return;
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(values.email) === false) {
      onError('Enter a valid email address');
      return;
    }

    if (values.contact_number.length != 11){
      onError('Enter a valid phone number');
      return;
    }

    if (values.password !== values.confirm_password){
      onError('Passwords does not match!');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        console.log('User account created & signed in!');
        navigation.navigate('PostSignUp', {navigation});
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          onError('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          onError('That email address is invalid!');
        }

        console.error(error);
      });
  };

  console.log('values >>', values);

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
                <Input onChangeText={(val) => onChange(val, 'full_name')} placeholder={'Full Name'} style={{marginTop: 10}} />
                <Input onChangeText={(val) => onChange(val, 'email')}  placeholder={'Email'} style={{marginTop: 10}} keyboardType={'email-address'} />
                <Input onChangeText={(val) => onChange(val, 'contact_number')}  placeholder={'Contact Number'} style={{marginTop: 10}} keyboardType={'phone-pad'} />
                <Input onChangeText={(val) => onChange(val, 'password')}  placeholder={'Password'} style={{marginTop: 10}} hideInput={true} />
                <Input onChangeText={(val) => onChange(val, 'confirm_password')}  placeholder={'Confirm Password'} style={{marginTop: 10}} hideInput={true} />

                <Button onPress={onSignUp} title={'Sign Up'} withBorder={true}/>

                <Text style={styles.error}>{errorMessage}</Text>

                <View style={styles.signUp}>
                  <Text style={styles.text}>Already have an account?</Text>
                  <TouchableOpacity onPress={navigation.goBack}>
                    <Text style={styles.signUpText}>Sign In</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </ScrollView>
      </LinearGradient>
  );
};

export default React.memo(SignUp);
