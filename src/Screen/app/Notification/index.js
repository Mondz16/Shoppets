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

const Notification = ({navigation}) => {
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    console.log('notification data >>', notificationData);
    setData(notificationData);
    getImagesFromFirebaseStorage();
  }, []);

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

  return (
    <View>
      <AccountModal profileImage={image} navigation={navigation} visible={modalVisible} onRequestClose={() => {
          setModalVisible(!modalVisible);
        }} />

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
          numColumns={2}
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
            />
          )}
        />

        <View style={styles.container2}>
          <Text style={styles.header}>Inbox</Text>
        </View>
        <FlatList
          data={data}
          numColumns={2}
          style={{flexGrow: 1}}
          keyExtractor={item => String(item?.notificationId)}
          ListFooterComponent={() => (
            <Button buttonStyle={styles.showButton} title={'Show All'} style={styles.showAllButton}  />
          )}
          renderItem={({item}) => (
            <NotifCard
              icon={require('../../../assets/inbox_inactive.png')}
              header={item.notificationTitle}
              description={item.notificationDescription}
              timeReceived={new Date().toDateString()}
            />
          )}
        />
      </View>
    </View>
  );
};

export default React.memo(Notification);
