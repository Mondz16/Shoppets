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

const Wishlist = ({navigation}) => {
  var RNFS = require('react-native-fs');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [petData, setPetData] = useState([]);
  const [images, setImages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const user = auth().currentUser;
  const id = user.uid;
  const path = `${RNFS.DocumentDirectoryPath}/data.txt`;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  // retrieves the file from the local data or firestore
  useEffect(() => {
    const unsubscribe = listenUserDateFromFirestore();

    return () => {
      unsubscribe();
    };
  }, []);

  let dataArray = [];

  async function listenUserDateFromFirestore() {
    const id = user.uid;

    // Using try-catch for better error handling
    try {
      const docRef = await firestore()
      .collection('PetCollection')
      .doc('PetData').get();

      const wishlist = await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(id)
      .doc('Wishlist');

      // Subscribe to snapshot changes and get an unsubscribe function
      const unsubscribe = wishlist.onSnapshot(wish => {
        if (wish.data().list !== null && wish.data().list !== undefined) {
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
            setPetData(temp);
            setImages(img);
            console.log('Images found >', img);
          }).catch(error => {
            console.error('Error fetching pet images:', error);
          });
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
    <View style={styles.mainContainer}>
      <FlatList
        data={petData}
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
                icon={require('../../../assets/back.png')}
                onPress={() => navigation.goBack()}
              />
              <Image
                style={styles.topIcon}
                source={require('../../../assets/ShoppetsTopIcon.png')}
              />
            </LinearGradient>
            <View style={styles.container2}>
              <Text style={styles.header}>Wishlist</Text>
            </View>
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
          );
        }}
      />
    </View>
  );
};

export default React.memo(Wishlist);
