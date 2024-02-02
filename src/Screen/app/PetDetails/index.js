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
import storage from '@react-native-firebase/storage';
import MedicalModal from '../../../Component/MedicalModal';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const {width} = Dimensions.get('window');
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const PetDetails = ({navigation, route}) => {
  const {item} = route?.params || {};
  const [image, setImage] = useState();
  const [sellerImage, setSellerImage] = useState();
  const [sellerData, setSellerData] = useState();

  const [connectionStatus, setConnectionStatus] = useState(true);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const [removeCartModalVisible, setRemoveCartModalVisible] = useState(false);
  const [medicalModalVisible, setMedicalModalVisible] = useState(false);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [cartlist , setCartlist] = useState([]);
  const [cartExists , setCartExists] = useState(false);

  const id = auth().currentUser.uid;

  useEffect(() => {
    getImagesFromFirebaseStorage();
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    getFirestoreCartlistData();
    getFirestoreSenderData();
  }, []);

  async function getImagesFromFirebaseStorage(){
    await storage().ref(item.petImage).getDownloadURL().then(x => {
      setImage(x);
    });

    await storage().ref(item.sellerImage).getDownloadURL().then(x => {
      setSellerImage(x);
    });
  }

  const onBackButtonPressed = () => {
    navigation.goBack();
  };
  useEffect(() => {
    let checkIfExists = cartlist?.find(x => x === item.id) !== null && cartlist?.find(x => x === item.id) !== undefined;
    setCartExists(checkIfExists);
    console.log('list >> ', cartlist);
  },[cartlist]);

  async function getFirestoreCartlistData() {
    await firestore()
    .collection('PetCollection')
    .doc('UserData')
    .collection(id)
    .doc('Cartlist').onSnapshot(cart => {
      if (cart.data() !== undefined && cart.data().list !== null  && cart.data().list !== undefined){
        let jsonObj = JSON.parse(cart.data().list);
        setCartlist(jsonObj);
        setCartExists(cartlist?.find(x => x === item.id) !== null);
      }
      else {
        setCartlist([]);
      }
    });
  }

  async function getFirestoreSenderData() {
    await firestore()
    .collection('PetCollection')
    .doc('UserData')
    .collection(item.sellerId)
    .doc('Info').onSnapshot(cart => {
      if (cart.data() !== undefined && cart.data().infoData !== null  && cart.data().infoData !== undefined){
        let jsonObj = JSON.parse(cart.data().infoData);
        setSellerData(jsonObj);
      }
      else {
        setCartlist([]);
      }
    });
  }

  async function setFirestoreCartlistData() {
    const id = auth().currentUser.uid;
    let cart = cartlist.find(x => x === item.id);

    if (cart !== null && cartlist?.find(x => x === item.id) !== undefined){
      cartlist.pop(item.id);
    }
    else {
      cartlist.push(item.id);
    }

    await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(id)
      .doc('Cartlist')
      .set({
        'list' : JSON.stringify(cartlist),
      })
      .then(() => {
        console.log('Wish List updated!', cartlist);
      });
  }

  return (
    <SafeAreaView>
      <InternetStatusModal isVisible={!connectionStatus} />
      <SingleButtonModal
      icon={require('../../../assets/cart_active.png')}
        title={'Added to Cart!'}
        description={'The Pet has been added to your cart.'}
        visible={cartModalVisible}
        onRequestClose={() => {
          setCartModalVisible(!cartModalVisible);
        }}
       />
      <SingleButtonModal
      icon={require('../../../assets/cart_active.png')}
        title={'Removed from Cart!'}
        description={'The Pet has been removed from your cart.'}
        visible={removeCartModalVisible}
        onRequestClose={() => {
          setRemoveCartModalVisible(!removeCartModalVisible);
          navigation.goBack();
        }}
       />
      <MedicalModal
      title={'Medical Record'}
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
          onChatPress={() => navigation.navigate('Chat', {
            sellerId: item.sellerId,
            sellerData: sellerData,
            navigation: navigation,
          })}
        />

        <Text style={styles.description}>{item.petDescription}</Text>
      </View>
      <View style={styles.gradientButtonHolder}>
        {
          cartExists ?
          <GradientButton
            buttonStyle={{
              width: width / 2 - 20,
            }}
            style={{fontSize: 17}}
            title={'Remove from Cart'}
            withBorder={true}
            clickable={true}
            onPress={() => {
              setFirestoreCartlistData();
              setRemoveCartModalVisible(true);
            }}
          /> :
          <GradientButton
            buttonStyle={{
              width: width / 2 - 20,
            }}
            title={'Add to Cart'}
            withBorder={true}
            clickable={true}
            onPress={() => {
              setFirestoreCartlistData();
              setCartModalVisible(true);
            }}
          />
        }
        <GradientButton
          buttonStyle={{
            width: width / 2 - 20,
          }}
          title={'Buy Now'}
          withBorder={true}
          clickable={true}
          onPress={() => {
            navigation.navigate('PetOrderDetails', {navigation , item});
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(PetDetails);
