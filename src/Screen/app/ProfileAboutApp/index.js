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

const ProfileAboutApp = ({navigation}) => {
  const user = auth().currentUser;

  const [connectionStatus, setConnectionStatus] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [userData, setUserData] = useState('');
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
    getFirebaseData();
  }, []);

  useEffect(() => {
    getFirebaseData();
  }, [showUploadModal]);

  const onLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('Login', {navigation});
      });
  };

  async function getFirebaseData() {
    await firestore()
      .collection('PetCollection')
      .doc('AppInfo')
      .onSnapshot(x => {
        var existingData = x.data().about;
        console.log('About App: Found Data >>', existingData);
        setUserData(existingData);
      });
  }

  return (
    <SafeAreaView>
      <InternetStatusModal isVisible={!connectionStatus} />
      <ScrollView>
        <LinearGradient
          style={styles.topContainer}
          colors={[colors.darkBlue, colors.green]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <ClickableIcon
            icon={require('../../../assets/back.png')}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.topText}>About</Text>
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
            <Text style={styles.profileName}>Shoppets App</Text>
          </View>
          <View style={styles.profileButtonHeader}>
            <Text style={styles.modalText}>{userData}</Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(ProfileAboutApp);
