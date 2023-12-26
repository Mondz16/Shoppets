/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {Image, Text, FlatList, View, Modal, Pressable} from 'react-native';
import Button from '../../../Component/Button';
import categories from '../../../data/categories.json';
import PetCard from '../../../Component/PetCard';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../constant/color';
import ClickableIcon from '../../../Component/ClickableIcon';
import Swiper from 'react-native-swiper';
import IconCategories from '../../../Component/IconCategories';
import InputSearch from '../../../Component/InputSearch';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import InternetStatusModal from '../../../Component/InternetStatusModal';
import storage from '@react-native-firebase/storage';

const AllCategories = ({navigation}) => {
  var RNFS = require('react-native-fs');

  const [selectedCategory, setSelectedCategory] = useState('Dog');
  const [data, setData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [petData, setPetData] = useState();
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [images, setImages] = useState([]);

  const user = auth().currentUser;
  const path = `${RNFS.DocumentDirectoryPath}/data.txt`;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  // retrieves the file from the local data or firestore
  useEffect(() => {
    setCategoriesData(categories);
    getFirestoreData();
  }, []);

  useEffect(() => {
    const filteredData = petData?.filter(item =>
      item?.category.includes(selectedCategory),
    );
    setData(filteredData);
    getImagesURL();
  },[petData]);

  useEffect(() => {
    if (!petData) {return;}

    const filteredData = petData?.filter(item =>
      item?.category.includes(selectedCategory),
    );
    setData(filteredData);
    getImagesURL();
  }, [selectedCategory]);

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
      const imagePromises = petData.map(pet =>
        getPetImagesFromFirebaseStorage(pet.id, pet.petImage),
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
      return {id: petId, imgUrl: imageUrl};
    } catch (error) {
      console.error('Error fetching pet image from storage:', error);
      // Handle the error, maybe set an error state or log it
      return null; // Or some default value indicating an error
    }
  }

  return (
    <View>
      <InternetStatusModal isVisible={!connectionStatus} />
      <FlatList
        data={data}
        numColumns={2}
        style={{flexGrow: 1}}
        ListEmptyComponent={
          <View style={{alignItems: 'center'}}>
            <Text>No {selectedCategory} found.</Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.mainContainer}>
            <LinearGradient
              style={styles.topContainer}
              colors={[colors.darkBlue, colors.green]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <ClickableIcon
                icon={require('../../../assets/back.png')}
                onPress={() => navigation.goBack()}
              />
              <Image
                style={styles.topIcon}
                source={require('../../../assets/ShoppetsTopIcon.png')}
              />
            </LinearGradient>
            <InputSearch
              showSearchIcon={true}
              pressable={true}
              placeholderText={'Search for pets name or breed'}
              style={{
                width: 380,
                height: 60,
                alignSelf: 'center',
                borderColor: colors.purple,
              }}
            />
            <View style={styles.container2}>
              <Text style={styles.header}>Categories</Text>
            </View>
            <IconCategories
              selectedItem={selectedCategory}
              onItemPressed={setSelectedCategory}
              data={categoriesData}
            />
          </View>
        }
        keyExtractor={item => String(item?.id)}
        renderItem={({item, index}) => {
          let petImage =
            images.length > 1 ? images.find(x => x.id === item.id) : images;

          let navigateDirectory =
            item.sellerId === auth().currentUser?.uid
              ? 'SellerPetDetails'
              : 'PetDetails';
          console.log('Item Found >> ', item);
          return (
            <PetCard
              key={item.id}
              petId={item.id}
              petImage={petImage ? petImage.imgUrl : null}
              petName={item.petName}
              location={item.location}
              breed={item.petBreed}
              onPress={() =>
                navigation.navigate(navigateDirectory, {navigation, item})
              }
            />
          );
        }}
      />
    </View>
  );
};

export default React.memo(AllCategories);
