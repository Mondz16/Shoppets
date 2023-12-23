/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import styles from './style';
import Button from '../../../Component/Button';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import InternetStatusModal from '../../../Component/InternetStatusModal';
import Input from '../../../Component/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ClickableIcon from '../../../Component/ClickableIcon';
import colors from '../../../constant/color';
import AccountModal from '../../../Component/AccountModal';
import GradientButton from '../../../Component/GradientButton';
import InputSearch from '../../../Component/InputSearch';
import IconCategories from '../../../Component/IconCategories';
import Categories from '../../../Component/Categories';
import firestore from '@react-native-firebase/firestore';
import storeCategories from '../../../data/storeCategory.json';
import PetCard from '../../../Component/PetCard';
import storage from '@react-native-firebase/storage';
import SellerPetCard from '../../../Component/SellerPetCard';

const {width} = Dimensions.get('window');

const Sell = ({navigation}) => {
  var RNFS = require('react-native-fs');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [data, setData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [userData, setUserData] = useState();
  const [petData, setPetData] = useState();
  const [images, setImages] = useState();
  const [profileImage, setProfileImage] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const user = auth().currentUser;
  const path = `${RNFS.DocumentDirectoryPath}/data.txt`;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
  });

  // retrieves the file from the local data or firestore
  useEffect(() => {
    setCategoriesData(storeCategories);
    getUserDataFromFirestore();
    listenUserDateFromFirestore();
  }, []);

  async function listenUserDateFromFirestore() {
    const id = user.uid;

    // Using try-catch for better error handling
    try {
      const docRef = await firestore()
      .collection('PetCollection')
      .doc('PetData');

      // Subscribe to snapshot changes and get an unsubscribe function
      const unsubscribe = docRef.onSnapshot(snapshot => {
        if (snapshot.exists && snapshot.data().data !== undefined) {
          const jsonObj = JSON.parse(snapshot.data().data);
          const filteredData = jsonObj?.filter(item =>
            item?.sellerId.includes(id),
          );
          setPetData(filteredData);
          getImagesURL();
        }
      });

      return unsubscribe; // Return the unsubscribe function
    } catch (error) {
      console.error('Error listening to Firestore:', error);
    }
  }

  async function getUserDataFromFirestore() {
    const userData = await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(auth().currentUser.uid)
      .doc('Info')
      .get();

    var existingData = JSON.parse(userData.data().infoData);
    setUserData(existingData);
    console.log('user data >>', userData.data().infoData);

    const fileName = auth().currentUser.uid;
    await storage()
      .ref(fileName + '/' + existingData.profile_image)
      .getDownloadURL()
      .then(x => {
        setProfileImage(x);
      });
  }

  useEffect(() => {
    setSelectedCategory('Available');
    getImagesURL();
  }, [petData]);

  useEffect(() => {
    if (!petData) {
      return;
    }

    const filteredData = petData?.filter(item =>
        item?.petStatus.includes(selectedCategory),
      );
      setData(filteredData);

    console.log('Data >>', JSON.stringify(data));
  }, [selectedCategory]);

  let dataArray = [];

  const getImagesURL = async () => {
    const imagePromises = petData.map(pet =>
      getPetImagesFromFirebaseStorage(pet.petImage),
    );
    Promise.all(imagePromises)
      .then(img => {
        setImages(img);
        console.log('Images found >', img);
      })
      .catch(error => {
        console.error('Error fetching pet images:', error);
      });
  };

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

  async function getFirestoreData() {
    const id = user.uid;
    const petData = await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(id)
      .doc('Content')
      .get();

    const jsonObj = JSON.parse(petData.data().contentData);
    setPetData(jsonObj);
  }

  return (
    <View style={styles.mainContainer}>
      <AccountModal
        profileImage={profileImage}
        navigation={navigation}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <FlatList
        data={data}
        numColumns={2}
        style={{flexGrow: 1}}
        ListEmptyComponent={
          <View style={{alignItems: 'center'}}>
            <Text>No item found.</Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.mainC1ontainer}>
            <LinearGradient
              style={styles.topContainer}
              colors={[colors.darkBlue, colors.green]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <ClickableIcon
                iconStyle={{borderRadius: 50}}
                icon={
                  profileImage === null
                    ? require('../../../assets/account.png')
                    : {uri: profileImage}
                }
                onPress={() => setModalVisible(true)}
              />
              <Image
                style={styles.topIcon}
                source={require('../../../assets/ShoppetsTopIcon.png')}
              />
            </LinearGradient>
            <View style={styles.container2}>
              <Text style={styles.header}>Seller Hub</Text>
            </View>
            <Categories
              selectedItem={selectedCategory}
              onItemPressed={setSelectedCategory}
              data={[...categoriesData]}
            />
          </View>
        }
        keyExtractor={item => String(item?.id)}
        renderItem={({item, index}) => {
          let petImage = images[index];
          if (index > 0) {
            petImage = images[images.length - index];
          }
          return (
            <SellerPetCard
              key={item.id}
              petImage={petImage}
              petName={item.petName}
              location={item.location}
              gender={item.petGender}
              breed={item.petBreed}
              onPress={() =>
                navigation.navigate('SellerPetDetails', {navigation, item})
              }
            />
          );
        }}
      />

      <ClickableIcon
        buttonStyle={styles.addButton}
        iconStyle={styles.addIcon}
        icon={require('../../../assets/add.png')}
        onPress={() =>
          navigation.navigate('AddToStore', {navigation, userData})
        }
      />
    </View>
  );
};

export default React.memo(Sell);
