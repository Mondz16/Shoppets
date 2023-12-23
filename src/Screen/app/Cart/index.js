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
import CartCard from '../../../Component/CartCard';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Cart = ({navigation}) => {
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
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
    const unsubscribe = listenUserDateFromFirestore();

    return () => {
      unsubscribe();
    };
  }, []);



  async function listenUserDateFromFirestore() {
    const id = auth().currentUser.uid;

    // Using try-catch for better error handling
    try {
      const docRef = await firestore()
      .collection('PetCollection')
      .doc('PetData').get();

      const wishlist = await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(id)
      .doc('Cartlist');

      // Subscribe to snapshot changes and get an unsubscribe function
      const unsubscribe = wishlist.onSnapshot(wish => {
        if (wish.data() !== undefined && wish.data().list !== null && wish.data().list !== undefined) {
          let listObj = JSON.parse(wish.data().list);
          let dataObj = JSON.parse(docRef.data().data);
          let temp = [];
          listObj.forEach(x => {
            if (dataObj.find(item => item.id === x) !== undefined && dataObj.find(item => item.id === x) !== null){
              temp.push(dataObj.find(item => item.id === x));
            }
          });

          console.log('Temp found >', temp);
          const imagePromises = temp.map(pet => getPetImagesFromFirebaseStorage(pet.petImage));
          Promise.all(imagePromises).then(img => {
            setData(temp);
            setImages(img);
            console.log('Images found >', img);
          }).catch(error => {
            console.error('Error fetching pet images:', error);
          });
        }
        else {
          setData([]);
        }
      });

      return unsubscribe; // Return the unsubscribe function
    } catch (error) {
      console.error('Error listening to Firestore:', error);
    }
  }

  async function getPetImagesFromFirebaseStorage(petImage) {
    try {
      const imageUrl = await storage().ref(petImage).getDownloadURL();
      console.log('Image Data >>', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error fetching pet image from storage:', error);
      // Handle the error, maybe set an error state or log it
      return null;
    }
  }

  return (
    <View>
      <ScrollView>
        <AccountModal
          profileImage={image}
          navigation={navigation}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
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
              icon={
                image === null
                  ? require('../../../assets/account.png')
                  : {uri: image}
              }
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
            <Text style={styles.header}>Cart</Text>
          </View>
          <FlatList
            data={data}
            numColumns={1}
            style={{flexGrow: 1}}
            keyExtractor={item => String(item?.id)}
            renderItem={({item, index}) => {
              let petImage = images[index];
              if (index > 0) {
                petImage = images[images.length - index];
              }
              return (
                <CartCard
                  icon={{uri: petImage}}
                  buttonText={'Check out'}
                  name={item.petName}
                  breed={item.petBreed}
                  price={item.price}
                  location={item.location}
                  onPress={() =>
                    navigation.navigate('PetDetails', {navigation, item})
                  }
                  onCheckout={() =>
                    navigation.navigate('PetDetails', {navigation, item})
                  }
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(Cart);
