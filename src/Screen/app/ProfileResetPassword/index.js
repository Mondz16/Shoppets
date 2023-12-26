/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from './style';
import Button from '../../../Component/Button';
import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constant/color';
import ClickableIcon from '../../../Component/ClickableIcon';
import NetInfo from '@react-native-community/netinfo';
import InternetStatusModal from '../../../Component/InternetStatusModal';
import ProfileImageModal from '../../../Component/ProfileImageModal';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import Input from '../../../Component/Input';
import SingleButtonModal from '../../../Component/SingleButtonModal';

const ProfileResetPassword = ({navigation}) => {
  const user = auth().currentUser;

  const [connectionStatus, setConnectionStatus] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [errorMessage]);

  function onError(onError) {
    setErrorMessage(onError);
  }

  const onResetPassword = () => {
    if (!email){
      onError('Fill in the input field!');
      return null;
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      onError('Enter a valid email address');
      return;
    }

    auth().sendPasswordResetEmail(email).then(() => {
      setShowUploadModal(true);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <SafeAreaView>

      <SingleButtonModal
        icon={require('../../../assets/password-resetactive.png')}
        title={'Email Sent!'}
        description={'An email is sent with a link that allows you to change your password!'}
        visible={showUploadModal}
        onRequestClose={() => {
          setShowUploadModal(!showUploadModal);
          navigation.goBack();
        }}
       />
      <InternetStatusModal isVisible={!connectionStatus} />
        <LinearGradient
          style={styles.topContainer}
          colors={[colors.darkBlue, colors.green]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <ClickableIcon
            icon={require('../../../assets/back.png')}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.topText}>Reset Password</Text>
        </LinearGradient>
        <LinearGradient
          style={styles.profileContentView}
          colors={[colors.lighBlue, colors.white]}
          start={{x: 0.5, y: 0.5}}
          end={{x: 0, y: 0}}>
          <View style={styles.profileHolder}>
            <Image
              style={styles.profileImg}
              source={require('../../../assets/shoppets_icon_rounded.png')}
            />
            <Text style={styles.profileName}>Reset Password With Email</Text>
          </View>
          <View style={styles.profileButtonHeader}>
            <Text style={styles.modalText}>Forgot your Shoppets password?No worries! Enter the email address associated with your account, and we'll send you an email with a secure link.</Text>
            <Input value={email} onChangeText={setEmail} placeholder={'Email'} icon={require('../../../assets/account.png')} />
            <Text style={[styles.modalText, {color: colors.red}]}>{errorMessage}</Text>
            <Button onPress={onResetPassword} title={'Submit'} withBorder={true}/>
          </View>
        </LinearGradient>
    </SafeAreaView>
  );
};

export default React.memo(ProfileResetPassword);
