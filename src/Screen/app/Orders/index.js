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
import Categories from '../../../Component/Categories';
import orderCategory from '../../../data/orderCategory.json';

const Orders = ({navigation}) => {


  const [connectionStatus, setConnectionStatus] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [petData, setPetData] = useState();
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('To Pay');
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    setCategoriesData(orderCategory);
    setSelectedCategory('To Pay');
    getFirestoreData();
    getImagesFromFirebaseStorage();
  }, []);

  useEffect(() => {
    setSelectedCategory('To Pay');
    const filteredData = petData?.filter(item => {
      let buyerData = item.buyerData;
      return buyerData.status === selectedCategory && buyerData.buyerId === auth().currentUser.uid;
    }
    );
    setData(filteredData);
    getImagesURL();
  }, [petData]);

  useEffect(() => {
    console.log('Pet Data>>' , petData);
    const filteredData = petData?.filter(item => {
      let buyerData = item.buyerData;
      return buyerData.status === selectedCategory && buyerData.buyerId === auth().currentUser.uid;
    }
    );
    setData(filteredData);
    getImagesURL();
  }, [selectedCategory]);


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

  async function getFirestoreData() {
    try {
      const docRef = firestore().collection('PetCollection').doc('PetData');

      // Subscribe to snapshot changes and get an unsubscribe function
      const unsubscribe = docRef.onSnapshot(snapshot => {
        if (snapshot.exists && snapshot.data().data !== undefined) {
          const jsonObj = JSON.parse(snapshot.data().data);
          setPetData(jsonObj);
          getImagesURL();
        }
      });

      return () => unsubscribe(); // Return the unsubscribe function
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  }

  async function getImagesURL() {
    try {
      const imagePromises = petData.map((pet) =>
        getPetImagesFromFirebaseStorage(pet.id, pet.petImage)
      );

      // Wait for all promises to resolve
      const imagesData = await Promise.all(imagePromises);

      // Update the state with all images at once
      setImages(imagesData);

      console.log('All Images Data >>', imagesData);
    } catch (error) {
      console.error('Error fetching pet images from storage:', error);
      // Handle the error, maybe set an error state or log it
    }
  }

  async function getPetImagesFromFirebaseStorage(petId, petImage) {
    try {
      const imageUrl = await storage().ref(petImage).getDownloadURL();
      return { id: petId, imgUrl: imageUrl };
    } catch (error) {
      console.error('Error fetching pet image from storage:', error);
      // Handle the error, maybe set an error state or log it
      return null; // Or some default value indicating an error
    }
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
        <Categories
              selectedItem={selectedCategory}
              onItemPressed={setSelectedCategory}
              data={[...categoriesData]}
            />
        <FlatList
          data={data}
          numColumns={1}
          style={{flexGrow: 1}}
          keyExtractor={item => String(item?.id)}
          ListEmptyComponent={
          <View style={{alignItems: 'center'}}>
            <Text>No item found.</Text>
          </View>
          }
          renderItem={({item, index}) => {

            let petImage =
            images.length > 1 ? images.find(x => x.id === item.id) : images;

            return (
            <OrderCard
              icon={petImage ? petImage.imgUrl : null}
              name={item.petName}
              breed={item.petBreed}
              location={item.location}
              status={item.buyerData.status}
              onPress={() => navigation.navigate('PetOrderDetails', {navigation , item})}
            />
          );}}
        />
      </View>
    </ScrollView>
  );
};

export default React.memo(Orders);
