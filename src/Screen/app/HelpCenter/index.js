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
import SingleButtonModal from '../../../Component/SingleButtonModal';

const HelpCenter = ({navigation}) => {
  const user = auth().currentUser;

  const [connectionStatus, setConnectionStatus] = useState(true);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [answer, setAnswer] = useState('');
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

  return (
    <SafeAreaView>
      <InternetStatusModal isVisible={!connectionStatus} />
      <SingleButtonModal
        icon={require('../../../assets/faq.png')}
        title={'Answer'}
        description={answer}
        visible={infoModalVisible}
        onRequestClose={() => {
          setInfoModalVisible(!infoModalVisible);
        }}
       />
      <LinearGradient
        style={styles.topContainer}
        colors={[colors.darkBlue, colors.green]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <ClickableIcon
          icon={require('../../../assets/back.png')}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.topText}>FAQ</Text>
      </LinearGradient>
      <LinearGradient
        style={styles.profileContentView}
        colors={[colors.lighBlue, colors.white]}
        start={{x: 0.5, y: 0.5}}
        end={{x: 0, y: 0}}>
        <View>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              setInfoModalVisible(true);
              setAnswer("You can easily track your order by logging into your account on our app. Once logged in, go to the Order History section, and you'll find real-time tracking information for your recent purchases.");
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/faq.png')} />
              <Text style={styles.modalText}>How can I track my order?</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>

          <Pressable style={styles.modalButtonHolder} onPress={() => {
              setInfoModalVisible(true);
              setAnswer('We accept a variety of payment methods, including credit/debit cards, PayPal, and other secure online payment options. You can select your preferred payment method during the checkout process.');
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/faq.png')} />
              <Text style={styles.modalText}>What payment methods do you accept?</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              setInfoModalVisible(true);
              setAnswer('You can easily buy a pet by clicking the Buy Now in the Pet Details screen.');
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/faq.png')} />
              <Text style={styles.modalText}>How do I buy a pet?</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              setInfoModalVisible(true);
              setAnswer('Yes, we take the security of your information seriously. Our app uses industry-standard encryption protocols to ensure the confidentiality of your personal and payment details. Rest assured that your data is safe with us.');
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/faq.png')} />
              <Text style={styles.modalText}>Are my personal and payment details secure?</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              setInfoModalVisible(true);
              setAnswer('Once an order is placed, it enters our system for quick processing. Therefore, modifications or cancellations are challenging. Please review your order carefully before confirming the purchase. If you encounter any issues, reach out to our customer support as soon as possible.');
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/faq.png')} />
              <Text style={styles.modalText}>Can I modify or cancel my order after placing it?</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              setInfoModalVisible(true);
              setAnswer('If you have any questions or need assistance, our customer support team is ready to help. You can reach us through our email customersupport@shoppets.com. We strive to respond promptly to ensure a seamless shopping experience for you.');
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/faq.png')} />
              <Text style={styles.modalText}>How can I contact customer support?</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              setInfoModalVisible(true);
              setAnswer('The estimated delivery time depends on your location and the shipping method chosen. You can find the expected delivery date during the checkout process before confirming your order. Additionally, tracking information will be provided for real-time updates on your delivery status.');
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/faq.png')} />
              <Text style={styles.modalText}>What is the estimated delivery time for my order?</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              setInfoModalVisible(true);
              setAnswer('Yes, we do offer international shipping to many countries. During the checkout process, you can select your country, and the available shipping options and costs will be displayed. Please note that international shipping times may vary, and additional customs fees may apply.');
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/faq.png')} />
              <Text style={styles.modalText}>Are there any discounts or promotions available?</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
          <Pressable style={styles.modalButtonHolder} onPress={() => {
              setInfoModalVisible(true);
              setAnswer("Unfortunately, once an order is confirmed, the shipping address cannot be changed to ensure the security of your purchase. We recommend double-checking your shipping details before completing the order. If you encounter any issues or need assistance, please contact our customer support as soon as possible, and we'll do our best to help.");
            }}>
              <Image style={styles.modalIcon} source={require('../../../assets/faq.png')} />
              <Text style={styles.modalText}>Can I change my shipping address after placing an order?</Text>
              <Image style={styles.modalIcon} source={require('../../../assets/rightArrow.png')} />
            </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default React.memo(HelpCenter);
