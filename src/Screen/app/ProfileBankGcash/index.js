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
import AddBankModal from '../../../Component/AddBankModal';

const {width} = Dimensions.get('window');

const ProfileBankGcash = ({navigation, route}) => {
  const { userData } = route?.params || {};
  var RNFS = require('react-native-fs');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [data, setData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [petData, setPetData] = useState();
  const [images, setImages] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [values, setValues] = useState({
    accountNumer: '',
    mode: 'Gcash',
  });

  const user = auth().currentUser;
  const path = `${RNFS.DocumentDirectoryPath}/data.txt`;

  // retrieves the file from the local data or firestore
  useEffect(() => {
    getUserDataFromFirestore();

    console.log('Item >>' , userData);
    console.log('route >>' , route);
  }, []);

  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value,
    }));

    console.log('values >>', values);
  };

  async function getUserDataFromFirestore() {
    const userData = await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(user?.uid)
      .doc('PaymentData')
      .get();

    if (userData.data().data !== undefined){
      var existingData = JSON.parse(userData.data().data);
      setPaymentData(existingData);
      console.log('Existing Data >> ', existingData);
    }
  }

  async function updateUserDataFromFirestore() {
    paymentData.push(values);
    await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(auth().currentUser.uid)
      .doc('PaymentData')
      .set({
        data: JSON.stringify(paymentData),
      }).then(() => {
        console.log('Updated Successfully >>', paymentData);
        setModalVisible(!modalVisible);
          setValues({
            accountNumer: '',
            mode: '',
          });

        getUserDataFromFirestore();
      });
  }

  return (
    <View style={styles.mainContainer}>

      <AddBankModal
        icon={require('../../../assets/bank.png')}
        title={'Gcash '}
        visible={modalVisible}
        accounNumber={values.accountNumer}
        onChangeAccountNumber={(value) => onChange(value, 'accountNumer')}
        buttonText={'Add'}
        onAddButtonClicked={() => {
          updateUserDataFromFirestore();
        }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      />
      <FlatList
        data={paymentData}
        numColumns={1}
        style={{flexGrow: 1}}
        ListHeaderComponent={
          <View style={styles.mainC1ontainer}>
            <LinearGradient
              style={styles.topContainer}
              colors={[colors.darkBlue, colors.green]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <ClickableIcon
                iconStyle={{borderRadius: 50}}
                icon={require('../../../assets/back.png')
                }
                onPress={() => navigation.goBack()}
              />
              <Image
                style={styles.topIcon}
                source={require('../../../assets/ShoppetsTopIcon.png')}
              />
            </LinearGradient>
          </View>
        }
        keyExtractor={item => String(item?.accountNumer)}
        renderItem={({item, index}) => {
          console.log('Data >>', item);

          return (
            <LinearGradient
              style={[styles.deliveryHolder]}
              colors={[colors.lighBlue, colors.white]}
              start={{x: 0.5, y: 0.5}}
              end={{x: 0, y: 0}}>
              <View style={styles.deliveryTextHolder}>
                <Text style={styles.deliveryTextHeader}>{item?.mode}</Text>
                <Text style={styles.deliveryText}>{userData?.full_name}</Text>
                <Text style={styles.deliveryText}>{item.accountNumer}</Text>
              </View>
            </LinearGradient>
          );
        }}
      />

      <ClickableIcon
        buttonStyle={styles.addButton}
        iconStyle={styles.addIcon}
        icon={require('../../../assets/add.png')}
        onPress={
          () => setModalVisible(true)
          }
      />
    </View>
  );
};

export default React.memo(ProfileBankGcash);
