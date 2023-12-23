/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import InternetStatusModal from '../../../Component/InternetStatusModal';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
import colors from '../../../constant/color';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import AccountModal from '../../../Component/AccountModal';
import ClickableIcon from '../../../Component/ClickableIcon';
import PetCard from '../../../Component/PetCard';
import petData from '../../../data/petData.json';
import NotifCard from '../../../Component/NotifCard';
import Button from '../../../Component/Button';
import OrderCard from '../../../Component/OrderCard';
import PetModal from '../../../Component/PetModal';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Orders = ({navigation}) => {


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
    setData(petData);
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
    <ScrollView>
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
          <Text style={styles.header}>Orders</Text>
        </View>
        <FlatList
          data={data}
          numColumns={2}
          style={{flexGrow: 1}}
          keyExtractor={item => String(item?.id)}
          renderItem={({item}) => (
            <OrderCard
              icon={{uri: item?.petImage[0]}}
              name={item.petName}
              breed={item.petBreed}
              location={item.location}
              status={item.petStatus}
              onPress={() => navigation.navigate('PetOrderDetails', {navigation , item})}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default React.memo(Orders);
