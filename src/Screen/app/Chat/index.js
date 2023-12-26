/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  View,
  Dimensions,
  LogBox,
  Pressable,
} from 'react-native';
import styles from './style';
import Title from '../../../Component/Title';
import InfoCard from '../../../Component/InfoCard';
import LinearGradient from 'react-native-linear-gradient';
import ClickableIcon from '../../../Component/ClickableIcon';
import colors from '../../../constant/color';
import Swiper from 'react-native-swiper';
import GradientButton from '../../../Component/GradientButton';
import NetInfo from '@react-native-community/netinfo';
import InternetStatusModal from '../../../Component/InternetStatusModal';
import SingleButtonModal from '../../../Component/SingleButtonModal';
import PetCard from '../../../Component/PetCard';
import storage from '@react-native-firebase/storage';
import MedicalModal from '../../../Component/MedicalModal';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Input from '../../../Component/Input';
import { ScrollView } from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Chat = ({navigation, route}) => {
  const {sellerData , sellerId} = route?.params || {};
  const [image, setImage] = useState();
  const [sellerImage, setSellerImage] = useState();
  console.log('Route params >>', route);

  const [connectionStatus, setConnectionStatus] = useState(true);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [removeCartModalVisible, setRemoveCartModalVisible] = useState(false);
  const [medicalModalVisible, setMedicalModalVisible] = useState(false);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [cartExists, setCartExists] = useState(false);
  const [chat, setChat] = useState({
    senderId: '',
    message: '',
  });

  const id = auth().currentUser.uid;
  const fullName = sellerData.full_name;

  useEffect(() => {
    getImagesFromFirebaseStorage();
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  const onChange = (value, key) => {
    setChat(vals => ({
      ...vals,
      [key]: value,
    }));

    console.log('chat >>', chat);
  };

  useEffect(() => {
    onChange(id , 'senderId');
    getFirestoreChatData();
  }, []);

  const onBackButtonPressed = () => {
    navigation.goBack();
  };

  async function getImagesFromFirebaseStorage() {
    await storage()
      .ref(sellerId + '/' + sellerData.profile_image)
      .getDownloadURL()
      .then(x => {
        setImage(x);
      });
  }

  async function getFirestoreChatData() {
    await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(id)
      .doc('Messages')
      .onSnapshot(cart => {
        if (
          cart.data() !== undefined &&
          cart.data().list !== null &&
          cart.data().list !== undefined
        ) {
          let jsonObj = JSON.parse(cart.data().list);
          setChatList(jsonObj);
        } else {
          setChatList([]);
        }
      });
  }

  async function setFirestoreChatListData() {
    const id = auth().currentUser.uid;
    chatList.push(chat);

    await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(id)
      .doc('Messages')
      .set({
        list: JSON.stringify(chatList),
        senderId: sellerId,
      })
      .then(() => {
        console.log('Wish List updated!', chatList);
        onChange('', 'message');
      });


      await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(sellerId)
      .doc('Messages')
      .set({
        list: JSON.stringify(chatList),
        senderId: id,
      })
      .then(() => {
        console.log('Wish List updated!', chatList);
        onChange('', 'message');
      });
  }

  return (
    <SafeAreaView>
      <InternetStatusModal isVisible={!connectionStatus} />
      <SingleButtonModal
        icon={require('../../../assets/cart_active.png')}
        title={'Added to Cart!'}
        description={'The Pet has been added to your cart.'}
        visible={cartModalVisible}
        onRequestClose={() => {
          setCartModalVisible(!cartModalVisible);
        }}
      />
      <SingleButtonModal
        icon={require('../../../assets/cart_active.png')}
        title={'Removed from Cart!'}
        description={'The Pet has been removed from your cart.'}
        visible={removeCartModalVisible}
        onRequestClose={() => {
          setRemoveCartModalVisible(!removeCartModalVisible);
          navigation.goBack();
        }}
      />
      <SingleButtonModal
        icon={require('../../../assets/orders_active.png')}
        title={'Order Placed!'}
        description={'The Pet has been added to your orders!'}
        visible={purchaseModalVisible}
        onRequestClose={() => {
          setPurchaseModalVisible(!purchaseModalVisible);
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
        <Text style={styles.topText}>Chat</Text>
      </LinearGradient>
      <ScrollView>
      <View style={styles.chatContainer}>
        <View style={styles.topHeader}>
          <Image source={{uri: image}} style={styles.sellerImage} />
          <Text style={styles.sellerNameText}>{sellerData.full_name}</Text>
          <Image source={require('../../../assets/call.png')} style={styles.callIcon} />
        </View>
        <FlatList
            data={chatList}
            numColumns={1}
            style={{flexGrow: 1}}
            keyExtractor={data => String(data?.senderId)}
            renderItem={({item, index}) => {
              return (
                <View
                  style={item.senderId === id ? styles.deliveryHolder2 : styles.deliveryHolder}>
                  <View style={styles.deliveryTextHolder}>
                    <Text style={item.senderId === id ? styles.deliveryText2 : styles.deliveryText}>{item.message}</Text>
                    <Text style={item.senderId === id ? styles.deliveryTextHeader2 : styles.deliveryTextHeader}>{item.senderId === id ? 'You' : fullName }</Text>
                  </View>
                </View>
              );
            }}
          />

        <View style={styles.chatFooter}>
          <Input
            style={{width: 325 , marginTop: 0}}
            inputStyle={{width: 325}}
            value={chat.message}
            onChangeText={value => onChange(value, 'message')}
            placeholder={'Enter message here'}
          />
          <Pressable onPress={setFirestoreChatListData}>
            <Image source={require('../../../assets/send.png')} style={styles.callIcon} />
          </Pressable>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Chat);
