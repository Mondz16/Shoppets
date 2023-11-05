/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import Button from '../../../Component/Button';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constant/color';
import Input from '../../../Component/Input';
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const [toggleCheckbox, setToggleCheckBox] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errorMessage , setErrorMessage] = useState();

  const onChange = (value, key) =>{
    setValues((vals) => ({
      ...vals,
      [key]: value,
    }));

    console.log('values >>', values);
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [errorMessage]);

  function onError(onError) {
    setErrorMessage(onError);
  }

  function clearInput() {
    onChange('', 'email');
    onChange('', 'password');
  }

  const onLogin = () => {
    if (!values.email || !values.password){
      onError('Fill in the input field!');
      return null;
    }

    auth().signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        console.log('User account signed in!');
        navigation.navigate('MainApp', {navigation});
        clearInput();
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email'){
          onError('Invalid email address');
        }
        else if (error.code === 'auth/wrong-password') {
          onError('Wrong Password');
        }
        else if (error.code === 'auth/invalid-login') {
          onError('Account does not exists!');
        }
        else {
          onError('Something went wrong!');
        }

        console.log(error);
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    <View>
      <LinearGradient
            style={styles.container}
            colors={[colors.darkBlue, colors.green]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
        >
        <Image style={{width: '100%', position: 'absolute'}} source={require('../../../assets/background.png')} />
        <Image style={styles.icon} source={require('../../../assets/paws.png')} />
        <LinearGradient
            style={styles.inputHolder}
            colors={[colors.lighBlue, colors.white]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
        >
          <Image style={styles.image} source={require('../../../assets/Shopets-UI-Login-A.png')} />
          <Input value={values.email} onChangeText={(value) => onChange(value, 'email')} placeholder={'Email'} icon={require('../../../assets/account.png')} />
          <Input value={values.password} onChangeText={(value) => onChange(value, 'password')} placeholder={'Password'} icon={require('../../../assets/padlock.png')} hideInput={true}/>

          <View style={styles.buttonHolder}>
            <View style={styles.rememberMeHolder}>
              <CheckBox
                style={styles.checkbox}
                value={toggleCheckbox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <Text style={styles.forgotPassText}>Remember Me</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ResetPassword', {navigation})}>
              <Text style={styles.forgotPassText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <Button onPress={onLogin} title={'Login'} withBorder={true}/>

          <Text style={styles.error}>{errorMessage}</Text>

          <View style={styles.signUp}>
            <Text style={styles.text}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp', {navigation})}>
              <Text style={styles.signUpText}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

export default React.memo(Login);
