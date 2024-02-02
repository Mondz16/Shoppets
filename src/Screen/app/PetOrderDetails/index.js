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

const PetOrderDetails = ({navigation, route}) => {
  const {item} = route?.params || {};

  const [sellerData, setSellerData] = useState();
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState();
  const [sellerImage, setSellerImage] = useState();
  const [medicalModalVisible, setMedicalModalVisible] = useState(false);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [buyerData, setBuyerData] = useState({});
  const [headerText , setHeaderText] = useState('');
  const [modalTitle , setModalTitle] = useState('');
  const [modalDescription , setModalDescription] = useState('');
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
      else if (item.buyerData.status === 'To Pay'){
        setHeaderText('Payment');
      }
      else if (item.buyerData.status === 'To Receive'){
        setHeaderText('Shipping');
      }
      else if (item.buyerData.status === 'To Rate' ){
        setHeaderText('Complete');
      }
    }

    getFirebaseData();
    getFirestoreSenderData();
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
    if (item.petStatus === 'Available')
      {onChange('Pending', 'petStatus');}
    else if (item.petStatus === 'Delivering'){
      onChange('Delivering', 'petStatus');
    }
    else {
      onChange('Completed', 'petStatus');
    }
    if (item.buyerData === '')
      {setCategoryValue('Cash on Delivery');}
    else
      {setCategoryValue(item.buyerData.paymentOption);}
  }, []);

  useEffect(() => {
    let status = '';
    if (item.buyerData.status === undefined || item.buyerData.status === null)
      {status = categoryValue === 'Cash on Delivery' ? 'To Ship' : 'To Pay';}
    else {
      if (item.buyerData.status === 'To Receive'){
        status = 'To Rate';
      }
      else if (item.buyerData.status === 'To Pay'){
        status = 'To Ship';
      }
    }
    let paymentAmount = categoryValue === 'Cash on Delivery' ? Number(item.price) + 120 : item.buyerData.payment;
    onChange(
      {
        buyerId: id,
        status: status,
        payment: paymentAmount,
        paymentOption: categoryValue,
      },
      'buyerData',
    );
  }, [categoryValue]);

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
        title={modalTitle}
        description={modalDescription}
        visible={purchaseModalVisible}
        onRequestClose={() => {
          setPurchaseModalVisible(!purchaseModalVisible);
          navigation.navigate('Home', navigation);
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
        <InfoCard
          profile={sellerImage}
          sellerName={item.sellerName}
          rate={item.sellerRating}
          onMedicalPress={() => setMedicalModalVisible(true)}
        />
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
          <DropDownPicker
            open={openCategory}
            value={categoryValue}
            items={categoryItems}
            setOpen={setOpenCategory}
            setValue={setCategoryValue}
            setItems={setCategoryItems}
            style={styles.dropdown}
            showArrowIcon={false}
            dropDownContainerStyle={styles.dropdownContainer}
            dropDownDirection="TOP"
            onChangeValue={value => setCategoryValue(value)}
          />
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
            <Text style={styles.statusLabel}>Total Payment:</Text>
            <Text style={styles.status}>P {Number(item.price) + 120}.00</Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        {item.buyerData !== '' && item.buyerData.status !== undefined ? (
          item.buyerData.status === 'To Ship' ? (
            <>
              <GradientButton
                buttonStyle={{
                  width: width - 30,
                }}
                title={'Contact Seller'}
                withBorder={true}
                clickable={true}
                onPress={() => navigation.navigate('Chat', {
                  sellerId: item.sellerId,
                  sellerData: sellerData,
                  navigation: navigation,
                })}
              />
            </>
          ) : (
            item.buyerData.status === 'To Receive' ?
            <>
              <GradientButton
                buttonStyle={{
                  width: width - 30,
                }}
                title={'Order Received'}
                withBorder={true}
                clickable={true}
                onPress={() => {
                  setModalTitle('Order Received!');
                  setModalDescription('Thank you for confirming that you have received your order!');
                  UpdatePetDataInfo();
                  }}
              />
            </>
            : (
            item.buyerData.status === 'To Rate' ?
            <>
              <GradientButton
                buttonStyle={{
                  width: width - 30,
                }}
                title={'Rate Now'}
                withBorder={true}
                clickable={true}
                onPress={() => {
                  setModalTitle('Payment Successful!');
                  setModalDescription('You have paid your order! The seller will ship your order right away.');
                  UpdatePetDataInfo();
                  }}
              />
            </> :
            <>
              <View style={styles.footerText}>
                <Text style={styles.footerHeader}>Total Payment</Text>
                <Text style={styles.footerTotal}>
                  P {Number(item.price) + 120}.00
                </Text>
              </View>
              <GradientButton
                buttonStyle={{
                  width: width / 2 - 30,
                }}
                title={'Pay Now'}
                withBorder={true}
                clickable={true}
                onPress={() => {
                  setModalTitle('Payment Successful!');
                  setModalDescription('You have paid your order! The seller will ship your order right away.');
                  UpdatePetDataInfo();
                  }}
              />
            </>)
          )
        ) : (
          <>
            <View style={styles.footerText}>
              <Text style={styles.footerHeader}>Total Payment</Text>
              <Text style={styles.footerTotal}>
                P {Number(item.price) + 120}.00
              </Text>
            </View>
            <GradientButton
              buttonStyle={{
                width: width / 2 - 30,
              }}
              title={'Place Order'}
              withBorder={true}
              clickable={true}
                onPress={() => {
                  setModalTitle('Order Placed!');
                  setModalDescription('You have placed an order. You can now see the pet in the order section.');
                  UpdatePetDataInfo();
                  }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(PetOrderDetails);
