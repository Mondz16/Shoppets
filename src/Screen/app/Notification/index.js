/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import InternetStatusModal from '../../../Component/InternetStatusModal';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import colors from '../../../constant/color';
import {FlatList} from 'react-native-gesture-handler';
import AccountModal from '../../../Component/AccountModal';
import ClickableIcon from '../../../Component/ClickableIcon';
import PetCard from '../../../Component/PetCard';
import notificationData from '../../../data/notificationData.json';
import NotifCard from '../../../Component/NotifCard';
import Button from '../../../Component/Button';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import SingleButtonModal from '../../../Component/SingleButtonModal';

const Notification = ({navigation}) => {
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [sender , setSender] = useState();
  const [senderData , setSenderData] = useState();
  const [modalTitle , setModalTitle] = useState('');
  const [modalDescription , setModalDescription] = useState('');
  const [purchaseModalVisible , setPurchaseModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    getImagesFromFirebaseStorage();
    getFirestoreChatData();
    getNotificationFromFirebaseStorage();
  }, []);

  useEffect(() => {
    getSenderImagesFromFirebaseStorage();
  }, [sender]);

  async function getImagesFromFirebaseStorage(){
    const userData = await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(auth().currentUser.uid)
      .doc('Info').get();

    var existingData = JSON.parse(userData.data().infoData);
    console.log('user data >>', userData.data().infoData);

    const fileName = auth().currentUser.uid;
    await storage().ref(fileName + '/' + existingData.profile_image).getDownloadURL().then(x => {
      setImage(x);
    });
  }

  async function getSenderImagesFromFirebaseStorage(){
    const userData = await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(sender)
      .doc('Info').get();

    var existingData = JSON.parse(userData.data().infoData);
    setSenderData(existingData);
    console.log('Sender Data >>', existingData);
  }

  async function getNotificationFromFirebaseStorage(){
    const userData = await firestore()
      .collection('PetCollection')
      .doc('NotificationData').get();

    var existingData = JSON.parse(userData.data().data);
    setData(existingData);
    console.log('Sender Data >>', existingData);
  }

  async function getFirestoreChatData() {
    let id = auth().currentUser.uid;
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
        }
        if (
          cart.data() !== undefined &&
          cart.data().senderId !== null &&
          cart.data().senderId !== undefined
        ) {
          setSender(cart.data().senderId);
        }
      });
  }

  return (
    <View>
      <AccountModal profileImage={image} navigation={navigation} visible={modalVisible} onRequestClose={() => {
          setModalVisible(!modalVisible);
        }} />

      <SingleButtonModal
      icon={require('../../../assets/notification_active.png')}
        title={modalTitle}
        description={modalDescription}
        visible={purchaseModalVisible}
        onRequestClose={() => {
          setPurchaseModalVisible(!purchaseModalVisible);
        }}
       />

      <View style={styles.mainC1ontainer}>
        <LinearGradient
          style={styles.topContainer}
          colors={[colors.darkBlue, colors.green]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <ClickableIcon
                iconStyle={{borderRadius: 50}}
                icon={image === null ? require('../../../assets/account.png') : {uri : image}}
                onPress={() => setModalVisible(true)}
              />
          <Image
            style={styles.topIcon}
            source={require('../../../assets/ShoppetsTopIcon.png')}
          />
        </LinearGradient>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.container2}>
          <Text style={styles.header}>Notification</Text>
        </View>
        <FlatList
          data={data}
          numColumns={1}
          style={{flexGrow: 1 , height: 300}}
          keyExtractor={item => String(item?.notificationId)}
          ListFooterComponent={() => (
            <Button buttonStyle={styles.showButton} title={'Show All'} style={styles.showAllButton}  />
          )}
          renderItem={({item}) => (
            <NotifCard
              icon={require('../../../assets/notification_inactive.png')}
              header={item.notificationTitle}
              description={item.notificationDescription}
              timeReceived={new Date().toDateString()}
              onPress={() => {
                setModalTitle(item.notificationTitle);
                setModalDescription(item.notificationDescription);
                setPurchaseModalVisible(true);
              }}
            />
          )}
        />

        <View style={styles.container2}>
          <Text style={styles.header}>Inbox</Text>
        </View>
        <FlatList
          data={chatList}
          numColumns={1}
          style={{flexGrow: 1}}
          keyExtractor={item => String(item?.senderId)}
          ListFooterComponent={() => (
            <Button buttonStyle={styles.showButton} title={'Show All'} style={styles.showAllButton}  />
          )}
          renderItem={({item, index}) => {

            if (index === chatList.length - 1){
            return (
            <NotifCard
              icon={require('../../../assets/inbox_inactive.png')}
              header={senderData?.full_name}
              description={item.message}
              timeReceived={new Date().toDateString()}
              onPress={() => navigation.navigate('Chat', {
                sellerId: sender,
                sellerData: senderData,
                navigation: navigation,
              })}
            />
          );}}}
        />
      </View>
    </View>
  );
};

export default React.memo(Notification);
