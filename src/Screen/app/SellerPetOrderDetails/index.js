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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import MedicalModal from '../../../Component/MedicalModal';
import DropDownPicker from 'react-native-dropdown-picker';

const {width} = Dimensions.get('window');
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const SellerPetOrderDetails = ({navigation, route}) => {
  const {item} = route?.params || {};

  const [connectionStatus, setConnectionStatus] = useState(true);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState();
  const [sellerImage, setSellerImage] = useState();
  const [medicalModalVisible, setMedicalModalVisible] = useState(false);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [buyerData, setBuyerData] = useState({});
  const [headerText , setHeaderText] = useState('');
  const [values, setValues] = useState({
    id: 1,
    sellerImage: '',
    sellerName: '',
    sellerAddress: '',
    sellerContactNumber: '',
    sellerRating: '4.3',
    petName: '',
    petStatus: 'Available',
    petBreed: '',
    petGender: '',
    petAge: '',
    petWeight: '',
    petDescription: '',
    location: '',
    price: '',
    category: '',
    petImage: '',
    petVaccinationStatus: 'Unverified',
    petVaccination: '',
    petVaccinationCard: '',
    buyerData: '',
    coordinates: {
      lat: 40.7128,
      lon: -74.006,
    },
  });

  const [openCategory, setOpenCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryItems, setCategoryItems] = useState([
    {label: 'Cash on Delivery', value: 'Cash on Delivery'},
    {label: 'Gcash', value: 'Gcash'},
    {label: 'Online Banking', value: 'Online Banking'},
  ]);

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
    if (item.buyerData === '' && item.buyerData.status === undefined){
      setHeaderText('Checkout');
    }
    else {
      if (item.buyerData.status === 'To Ship'){
        setHeaderText('Shipment');
      }
      else if (item.buyerData.status === 'To Receive'){
        setHeaderText('Shipping');
      }
      else if (item.buyerData.status === 'To Pay'){
        setHeaderText('Payment');
      }
    }

    getFirebaseData();
  }, []);

  useEffect(() => {
    onChange(item.id, 'id');
    onChange(item.sellerImage, 'sellerImage');
    onChange(item.sellerName, 'sellerName');
    onChange(item.sellerAddress, 'sellerAddress');
    onChange(item.sellerContactNumber, 'sellerContactNumber');
    onChange(item.sellerRating, 'sellerRating');
    onChange(item.petName, 'petName');
    onChange(item.petBreed, 'petBreed');
    onChange(item.petGender, 'petGender');
    onChange(item.petAge, 'petAge');
    onChange(item.petWeight, 'petWeight');
    onChange(item.petDescription, 'petDescription');
    onChange(item.location, 'location');
    onChange(item.price, 'price');
    onChange(item.category, 'category');
    onChange(item.petImage, 'petImage');
    onChange(item.petVaccination, 'petVaccination');
    onChange(item.petVaccinationCard, 'petVaccinationCard');

    let status = item.petStatus === 'Pending' ? 'Shipping' : 'Completed';
    let buyerStatus = item.buyerData.status === 'To Receive' ? 'To Rate' : 'To Receive';
    onChange(status, 'petStatus');
    onChange(
      {
        buyerId: item.buyerData.buyerId,
        status: buyerStatus,
        payment: item.buyerData.payment,
        paymentOption: item.buyerData.paymentOption,
      },
      'buyerData',
    );
  }, []);

  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value,
    }));

    console.log('values >>', values);
  };

  async function getImagesFromFirebaseStorage() {
    await storage()
      .ref(item.petImage)
      .getDownloadURL()
      .then(x => {
        setImage(x);
      });

    await storage()
      .ref(item.sellerImage)
      .getDownloadURL()
      .then(x => {
        setSellerImage(x);
      });
  }

  async function getFirebaseData() {
    await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(auth().currentUser.uid)
      .doc('Info')
      .onSnapshot(x => {
        var existingData = JSON.parse(x.data().infoData);
        console.log('Order Details : Updated User Data >>', existingData);
        setUserData(existingData);
      });
  }

  async function UpdatePetDataInfo() {
    try {
      const petData = await firestore()
        .collection('PetCollection')
        .doc('PetData')
        .get();

      const cloudData = JSON.parse(petData.data().data);
      var myData = Object.keys(cloudData).map(key => cloudData[key]);

      const indexToUpdate = myData.findIndex(data => data.id === item.id);

      if (indexToUpdate !== -1) {
        myData[indexToUpdate] = {...myData[indexToUpdate], ...values};
        await firestore()
          .collection('PetCollection')
          .doc('PetData')
          .set({
            data: JSON.stringify(myData),
          });

        console.log('Data updated!', myData);
        setPurchaseModalVisible(true);
      } else {
        console.log('Pet not found for update');
      }
    } catch (error) {
      console.error('Error updating pet data:', error);
    }
  }

  const onBackButtonPressed = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{height: '100%'}}>
      <InternetStatusModal isVisible={!connectionStatus} />

      <SingleButtonModal
        icon={require('../../../assets/close.png')}
        title={'Order Cancelled!'}
        description={'Order has been cancelled!'}
        visible={cancelModalVisible}
        onRequestClose={() => {
          setCancelModalVisible(!cancelModalVisible);
        }}
      />
      <SingleButtonModal
        icon={require('../../../assets/orders_active.png')}
        title={'Order Shipped!'}
        description={'Please prepare your pet for pickup, the delivery truck will be there soon.'}
        visible={purchaseModalVisible}
        onRequestClose={() => {
          setPurchaseModalVisible(!purchaseModalVisible);
          navigation.navigate('Sell', navigation);
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
      <LinearGradient
        style={styles.topContainer}
        colors={[colors.darkBlue, colors.green]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <ClickableIcon
          icon={require('../../../assets/back.png')}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.topText}>{headerText}</Text>
      </LinearGradient>
      <View style={styles.container}>
        <LinearGradient
          style={[styles.deliveryHolder]}
          colors={[colors.lighBlue, colors.white]}
          start={{x: 0.5, y: 0.5}}
          end={{x: 0, y: 0}}>
          <View style={styles.deliveryTextHolder}>
            <Text style={styles.deliveryTextHeader}>Delivery Address</Text>
            <Text style={styles.deliveryText}>
              {userData.full_name} | {userData.contact_number}
            </Text>
            <Text style={styles.deliveryText}>{userData.address}</Text>
          </View>
        </LinearGradient>
        <View style={styles.bannerHolder}>
          <View style={styles.bannerTextHolder}>
            <Title title={item.petName} isTitle={true} />
            <Text style={styles.petDetail}>{item.petBreed}</Text>
            <Text style={styles.petDetail}>
              {item.petGender} | {item.petAge}
            </Text>
            <Text style={styles.petDetail}>{item.location}</Text>
          </View>
          <Image style={styles.banner} source={{uri: image}} />
        </View>
        <LinearGradient
          style={[
            styles.deliveryHolder,
            {
              paddingHorizontal: 0,
              borderBottomWidth: 1,
              paddingRight: 20,
              borderTopWidth: 1,
              borderColor: colors.lighBlue,
            },
          ]}
          colors={[colors.white, colors.white]}
          start={{x: 0.5, y: 0.5}}
          end={{x: 0, y: 0}}>
          <View style={styles.deliveryTextHolder}>
            <Text style={styles.deliveryTextHeader}>Shipping Options</Text>
            <Text style={styles.deliveryText}>Standard Local</Text>
            <Text style={styles.deliverySubtitleText}>
              Receive by 31 Dec - 5 Jan
            </Text>
            <Text style={styles.deliverySubtitleText}>
              (Make sure your delivery address is set to your correct location)
            </Text>
          </View>
          <Image
            style={styles.deliveryIcon}
            source={require('../../../assets/delivery.png')}
          />
        </LinearGradient>
        <View
          style={[
            styles.deliveryHolder,
            {
              paddingHorizontal: 5,
              paddingVertical: 0,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: colors.lighBlue,
            },
          ]}>
          <Text style={styles.paymentDetails}>Payment Options</Text>
          <Text style={styles.statusLabel}>{item.buyerData.paymentOption}</Text>
          </View>
        <View
          style={[
            styles.deliveryHolder,
            {
              paddingHorizontal: 5,
              paddingVertical: 0,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderColor: colors.lighBlue,
            },
          ]}>
          <Text style={styles.paymentDetails}>Payment Status</Text>
          <Text style={styles.statusLabel}>Fully Paid</Text>

        </View>
        <View>
          <Text style={styles.paymentDetails}>Payment Details</Text>
          <View style={styles.statusHolder}>
            <Text style={styles.statusLabel}>Pet Price:</Text>
            <Text style={styles.status}>P {item.price}.00</Text>
          </View>
          <View style={styles.statusHolder}>
            <Text style={styles.statusLabel}>Delivery Fee:</Text>
            <Text style={styles.status}>P 120.00</Text>
          </View>
          <View style={styles.statusHolder}>
            <Text style={styles.statusLabel}>Paid Amount:</Text>
            <Text style={styles.status}>(P {(Number(item.price) + 120)}.00)</Text>
          </View>
          <View style={styles.statusHolder}>
            <Text style={styles.statusLabel}>Total Payment:</Text>
            <Text style={styles.status}>P 0.00</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        {
          item.buyerData.status === 'To Ship' ? (
            <>
              <GradientButton
                buttonStyle={{
                  width: width - 30,
                }}
                title={'Ship Order'}
                withBorder={true}
                clickable={true}
                onPress={UpdatePetDataInfo}
              />
            </>
          ) : (
            item.buyerData.status === 'To Receive' ? (
            <>
              <GradientButton
                buttonStyle={{
                  width: width - 30,
                }}
                title={'Delivering Order'}
                withBorder={true}
                clickable={true}
              />
            </>
            ) : (
            <>
              <GradientButton
                buttonStyle={{
                  width: width - 30,
                }}
                title={'Complete Order'}
                withBorder={true}
                clickable={true}
                onPress={UpdatePetDataInfo}
              />
            </>
            )
          )
          }
      </View>
    </SafeAreaView>
  );
};

export default React.memo(SellerPetOrderDetails);
