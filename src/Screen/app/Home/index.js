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
import AccountModal from '../../../Component/AccountModal';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary} from 'react-native-image-picker';

const Home = ({navigation}) => {
  var RNFS = require('react-native-fs');

  const [selectedCategory, setSelectedCategory] = useState('Dog');
  const [data, setData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [petData, setPetData] = useState();
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [image, setImage] = useState(null);
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

  useEffect(() => {
    setCategoriesData(categories);

    getImagesFromFirebaseStorage();
    const unsubscribe = getFirestoreData();

    return () => {
      unsubscribe();
    };
  }, []);


  useEffect(() => {
    const filteredData = petData?.filter(item =>
      item?.category.includes(selectedCategory),
    );
    setData(filteredData);
  },[petData]);

  useEffect(() => {
    const filteredData = petData?.filter(item =>
      item?.category.includes(selectedCategory),
    );
    setData(filteredData);
  }, [selectedCategory]);

  async function getFirestoreData() {
    try {
      const docRef = firestore().collection('PetCollection').doc('PetData');

      // Subscribe to snapshot changes and get an unsubscribe function
      const unsubscribe = docRef.onSnapshot(snapshot => {
        if (snapshot.exists && snapshot.data().data !== undefined) {
          const jsonObj = JSON.parse(snapshot.data().data);

          // Use Promise.all to concurrently fetch pet images
          const imagePromises = jsonObj.map(pet => getPetImagesFromFirebaseStorage(pet.petImage));
          Promise.all(imagePromises).then(images => {
            setPetData(jsonObj);
            setImages(images);
          }).catch(error => {
            console.error('Error fetching pet images:', error);
          });
        }
      });

      return () => unsubscribe(); // Return the unsubscribe function
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  }

  async function getImagesFromFirebaseStorage(){
    try {
      const docRef = firestore().collection('PetCollection').doc('UserData').collection(user.uid)
      .doc('Info');

      // Subscribe to snapshot changes and get an unsubscribe function
      docRef.onSnapshot(snapshot => {
        if (snapshot.exists && snapshot.data().infoData !== undefined) {
          const jsonObj = JSON.parse(snapshot.data().infoData);

          console.log('Profile Picture Updated!');
          getProfilePictureFromFirebaseStorage(
              user.uid + '/' + jsonObj.profile_image
            );
        }
      });

    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
      return null;
    }
  }

  async function getProfilePictureFromFirebaseStorage(profileImage) {
    try {
      const imageUrl = await storage().ref(profileImage).getDownloadURL();
      setImage(imageUrl);
    } catch (error) {
      console.error('Error fetching pet image from storage:', error);
      // Handle the error, maybe set an error state or log it
      setImage(null);
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

  async function getFile() {
    const file = await RNFS.readFile(path);
    const jsonObj = JSON.parse(file);
    console.log('File>>', file);
    setPetData(jsonObj);
  }

  return (
    <View>
      <InternetStatusModal isVisible={!connectionStatus} />
      <AccountModal profileImage={image} navigation={navigation} visible={modalVisible} onRequestClose={() => {
          setModalVisible(false);
        }} />
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
                iconStyle={{borderRadius: 50}}
                icon={image === null ? require('../../../assets/account.png') : {uri : image}}
                onPress={() => setModalVisible(true)}
              />
              <Image
                style={styles.topIcon}
                source={require('../../../assets/ShoppetsTopIcon.png')}
              />
            </LinearGradient>
            <InputSearch
              showSearchIcon={true}
              pressable={true}
              onPress={() => navigation.navigate('SearchPet', navigation)}
              placeholderText={'Search for pets name or breed'}
              style={{
                width: 380,
                height: 60,
                alignSelf: 'center',
                borderColor: colors.purple,
              }}
            />
            <View style={styles.container}>
              <Swiper
                containerStyle={styles.sliderWrapper}
                showsButtons={false}
                width={380}
                height={175}
                loop={true}
                autoplay={true}
                autoplayTimeout={5}
                buttonWrapperStyle={styles.buttonWrapperStyle}
                paginationStyle={styles.paginationStyle}
                dotStyle={styles.dotStyle}
                bounces={true}
                activeDotStyle={styles.activeDotStyle}>
                <View>
                  <Image
                    style={styles.banner}
                    source={require('../../../assets/banner1.png')}
                  />
                </View>
                <View>
                  <Image
                    style={styles.banner}
                    source={require('../../../assets/banner2.png')}
                  />
                </View>
                <View>
                  <Image
                    style={styles.banner}
                    source={require('../../../assets/barnner3.png')}
                  />
                </View>
              </Swiper>
            </View>
            <View style={styles.container2}>
              <Text style={styles.header}>Categories</Text>
              <Button
                buttonStyle={{width: 100}}
                style={styles.header}
                title={'Show All'}
                onPress={() => navigation.navigate('AllCategories', navigation)}
              />
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
          let petImage = images[index];
          if (index > 0)
            {petImage = images[images.length - index];}

          let navigateDirectory = item.sellerId === auth().currentUser.uid ? 'SellerPetDetails' : 'PetDetails';
          return (
          <PetCard
            key={item.id}
            petId={item.id}
            petImage={petImage}
            petName={item.petName}
            location={item.location}
            breed={item.petBreed}
            onPress={() =>
                navigation.navigate(navigateDirectory, {navigation, item}
              )
            }
          />
        );}}
      />
    </View>
  );
};

export default React.memo(Home);
