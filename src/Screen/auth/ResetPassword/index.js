/* eslint-disable prettier/prettier */
import React , { useState , useEffect } from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import Button from '../../../Component/Button';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constant/color';
import Input from '../../../Component/Input';
import auth from '@react-native-firebase/auth';

const PostSignUp = ({navigation}) => {
  const [values, setValues] = useState({
    email: '',
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

  const onResetPassword = () => {
    if (!values.email){
      onError('Fill in the input field!');
      return null;
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(values.email) === false) {
      onError('Enter a valid email address');
      return;
    }

    auth().sendPasswordResetEmail(values.email).then(() => {
      navigation.navigate('PostResetPassword');
    }).catch((error) => {
      console.log(error);
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
          <Image style={styles.image} source={require('../../../assets/DogSad.png')} />
          <Image style={styles.checkIcon} source={require('../../../assets/password-reset.png')} />
          <Text style={styles.title} >Trouble Logging in?</Text>
          <Text style={styles.description}>Enter your email and we'll send you a link to reset your password.</Text>
          <Input onChangeText={(value) => onChange(value, 'email')} icon={require('../../../assets/account.png')} placeholder={'Email'} style={{marginTop: 0, marginBottom: 10}}/>

          <Text style={styles.error}>{errorMessage}</Text>
          <Button onPress={onResetPassword} title={'Continue'} withBorder={true}/>
          <TouchableOpacity onPress={navigation.goBack}>
            <Text style={styles.signUpText}>Cancel</Text>
          </TouchableOpacity>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

export default React.memo(PostSignUp);
