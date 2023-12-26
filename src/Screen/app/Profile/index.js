/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Image, Alert, Share, Pressable, Text, View} from 'react-native';
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

const ProfileImage = ({navigation}) => {
  const user = auth().currentUser;

  const [connectionStatus, setConnectionStatus] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
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

  useEffect(() => {
    console.log('user data >>', userData);
    getImagesFromFirebaseStorage(userData.profile_image);
  }, [userData]);

  const onLogout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('Login', {navigation});
      });
  };

  async function getFirebaseData(){
    const userDataCollection = await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(auth().currentUser.uid)
      .doc('Info').onSnapshot(x => {
        var existingData = JSON.parse(x.data().infoData);
        console.log('edit profile: Updated User Data >>', existingData);
        setUserData(existingData);
      });
  }

  async function getImagesFromFirebaseStorage(profileImage){
    const fileName = auth().currentUser.uid;
    await storage().ref(fileName + '/' + profileImage).getDownloadURL().then(x => {
      setImage(x);
    });
  }

  const onShare = async () => {
      try {
        const result = await Share.share({
          message:
            'React Native | A framework for building native apps using React',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    };

  return (
    <SafeAreaView>
      <InternetStatusModal isVisible={!connectionStatus} />
      <ProfileImageModal userData={userData} profileImage={image} navigation={navigation} visible={showUploadModal} onRequestClose={() => {
          setShowUploadModal(!showUploadModal);
        }} />
      <LinearGradient
        style={styles.topContainer}
        colors={[colors.darkBlue, colors.green]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <ClickableIcon
          icon={require('../../../assets/back.png')}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.topText}>Profile</Text>
      </LinearGradient>
      <LinearGradient
        style={styles.profileContentView}
        colors={[colors.lighBlue, colors.white]}
        start={{x: 0.5, y: 0.5}}
        end={{x: 0, y: 0}}>
        <View style={styles.profileHolder}>
          <Image style={styles.profileImg} source={image === null ? require('../../../assets/account.png') : {uri : image}} />
          <ClickableIcon buttonStyle={styles.editButton} icon={require('../../../assets/edit.png')} onPress={() => setShowUploadModal(true)} />
          <Text style={styles.profileName}>{user.displayName}</Text>
          <Text style={styles.profileNumber}>{user.phoneNumber}</Text>
        </View>
        <View style={styles.profileButtonHeader}>
          <Text style={styles.buttonHeader}>General Settings</Text>
        </View>
        <View>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              navigation.navigate('ProfileResetPassword',{navigation});
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/profile-user.png')} />
              <Text style={styles.modalText}>Reset Password</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              navigation.navigate('ProfileBankGcash',{navigation , userData});
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/bank.png')} />
              <Text style={styles.modalText}>Bank Accounts/Gcash</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
        </View>
        <View style={styles.profileButtonHeader}>
          <Text style={styles.buttonHeader}>Information</Text>
        </View>
        <View>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              navigation.navigate('ProfileAboutApp',{navigation});
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/phone.png')} />
              <Text style={styles.modalText}>About App</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              navigation.navigate('ProfileTermsAndPolicy',{navigation});
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/paper.png')} />
              <Text style={styles.modalText}>Terms & Conditions</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              navigation.navigate('ProfilePrivacyPolicy',{navigation});
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/privacy-policy.png')} />
              <Text style={styles.modalText}>Privacy Policy</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
          <Pressable style={styles.modalButtonHolder} onPress={onShare}>
              <Image style={styles.modalIcon} source={require('../../../assets/share.png')} />
              <Text style={styles.modalText}>Share This App</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default React.memo(ProfileImage);
