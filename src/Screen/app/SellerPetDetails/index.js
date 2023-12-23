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
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import MedicalModal from '../../../Component/MedicalModal';

const {width} = Dimensions.get('window');
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const SellerPetDetails = ({navigation, route}) => {
  const {item} = route?.params || {};
  const [image, setImage] = useState();
  const [sellerImage, setSellerImage] = useState();

  const [connectionStatus, setConnectionStatus] = useState(true);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [medicalModalVisible, setMedicalModalVisible] = useState(false);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);

  useEffect(() => {
    getImagesFromFirebaseStorage();
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  async function getImagesFromFirebaseStorage(){
    await storage().ref(item.petImage).getDownloadURL().then(x => {
      setImage(x);
    });

    await storage().ref(item.sellerImage).getDownloadURL().then(x => {
      setSellerImage(x);
    });
  }

  async function deletePetFromStore() {
    try {
      const sellerData = await firestore()
        .collection('PetCollection')
        .doc('UserData')
        .collection(auth().currentUser.uid)
        .doc('Content')
        .get();

      const sellerCloudData = JSON.parse(sellerData.data().contentData);
      var sellerContentData = Object.keys(sellerCloudData).map(key => sellerCloudData[key]);

      const sellerIndexToDelete = sellerContentData.find(pet => pet.id === item.id);

      if (sellerIndexToDelete !== -1) {
        sellerContentData.splice(sellerIndexToDelete, 1);

        await firestore()
          .collection('PetCollection')
          .doc('UserData')
          .collection(auth().currentUser.uid)
          .doc('Content')
          .set({
            contentData: JSON.stringify(sellerContentData),
          });

        console.log('Data Removed!');
      } else {
        console.log('Pet not found for deletion');
      }

      const overallData = await firestore()
        .collection('PetCollection')
        .doc('PetData')
        .get();

      const cloudData = JSON.parse(overallData.data().data);
      var myData = Object.keys(cloudData).map(key => cloudData[key]);

      const indexToDelete = myData.find(pet => pet.id === item.id);

      if (indexToDelete !== -1) {
        myData.splice(indexToDelete, 1);

        await firestore()
          .collection('PetCollection')
          .doc('PetData')
          .set({
            data: JSON.stringify(myData),
          });

          setCartModalVisible(true);
        console.log('Data Removed!');
      } else {
        console.log('Pet not found for deletion');
      }
    } catch (error) {
      console.error('Error deleting pet data:', error);
    }
  }

  const onBackButtonPressed = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
      <InternetStatusModal isVisible={!connectionStatus} />
      <SingleButtonModal
      icon={require('../../../assets/cart_active.png')}
        title={'Removed Pet!'}
        description={'The Pet has been removed from your store.'}
        visible={cartModalVisible}
        onRequestClose={() => {
          setCartModalVisible(!cartModalVisible);
          navigation.goBack();
        }}
       />
       <MedicalModal
        title={'Medical Record'}
        verifiedText={item.petVaccinationStatus}
        vaccination={item.petVaccination}
        description={'The Pet has been added to your orders!'}
        visible={medicalModalVisible}
        onRequestClose={() => {
          setMedicalModalVisible(!medicalModalVisible);
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
        <Text style={styles.topText}>{item?.category}</Text>
      </LinearGradient>
      <View style={styles.container}>
        <Image style={styles.banner} source={{uri: image}} />
        {/* <View style={styles.swiperContainer}>
          <Swiper
            containerStyle={styles.sliderWrapper}
            showsButtons={item?.petImage?.length > 1}
            width={width - 45}
            height={280}
            loop={true}
            paginationStyle={styles.paginationStyle}
            dotStyle={styles.dotStyle}
            bounces={true}
            activeDotStyle={styles.activeDotStyle}>
            {item?.petImage.map(img => {
              return (
                <View>
                  <Image style={styles.banner} source={{uri: img}} />
                </View>
              );
            })}
          </Swiper>
        </View> */}
        <View style={styles.mainTitle}>
          <Title title={item.petName} isTitle={true} />
          <View style={styles.priceHolder}>
            <Image
              style={styles.priceIcon}
              source={require('../../../assets/peso.png')}
            />
            <Title title={item.price} isTitle={true} />
          </View>
        </View>

        <View style={styles.locationHolder}>
          <Image
            style={styles.icon}
            source={require('../../../assets/location.png')}
          />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>

        <View style={styles.detailContainer}>
          <View style={styles.detailHolder}>
            <Text style={styles.detailText}>Gender</Text>
            <Text style={styles.detailValue}>{item?.petGender}</Text>
          </View>
          <View style={styles.detailHolder}>
            <Text style={styles.detailText}>Breed</Text>
            <Text style={styles.detailValue}>{item?.petBreed}</Text>
          </View>
          <View style={styles.detailHolder}>
            <Text style={styles.detailText}>Age</Text>
            <Text style={styles.detailValue}>{item?.petAge}</Text>
          </View>
        </View>

        <InfoCard
          profile={sellerImage}
          sellerName={item.sellerName}
          rate={item.sellerRating}
          onMedicalPress={() => setMedicalModalVisible(true)}
        />

        <Text style={styles.description}>{item.petDescription}</Text>
      </View>
      <View style={styles.gradientButtonHolder}>
        <GradientButton
          buttonStyle={{
            width: width / 2 - 20,
          }}
          firstColor={colors.red}
          secondColor={colors.red}
          title={'Delete'}
          withBorder={true}
          clickable={true}
          onPress={deletePetFromStore}
        />
        <GradientButton
          buttonStyle={{
            width: width / 2 - 20,
          }}
          title={'Edit'}
          withBorder={true}
          clickable={true}
          onPress={() => navigation.navigate('SellerEditPetDetails', {navigation, item})}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(SellerPetDetails);
