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
import firestore from '@react-native-firebase/firestore';
import SingleButtonModal from '../../../Component/SingleButtonModal';
import VaccineInput from '../../../Component/VaccineInput';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';

const {width} = Dimensions.get('window');

const AddToStore = ({navigation, route}) => {
  const {userData} = route?.params || {};
  const [errorMessage, setErrorMessage] = useState();
  const [connectionStatus, setConnectionStatus] = useState(true);

  const user = auth().currentUser;
  const [image, setImage] = useState(null);
  const [vaccineImage, setVaccineImage] = useState(null);
  const [vaccines, setVaccines] = useState([
    {vaccineName: '', vaccineDate: ''},
  ]);
  const [values, setValues] = useState({
    id: 1,
    sellerId: '',
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
  });

  const [openGender, setOpenGender] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [genderItems, setGenderItems] = useState([
    {label: 'Unspecified', value: 'Unspecified'},
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
  ]);

  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);

  const [openCategory, setOpenCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryItems, setCategoryItems] = useState([
    {label: 'Dog', value: 'Dog'},
    {label: 'Cat', value: 'Cat'},
    {label: 'Rabbit', value: 'Rabbit'},
    {label: 'Bird', value: 'Bird'},
    {label: 'Chicken', value: 'Chicken'},
    {label: 'Fish', value: 'Fish'},
  ]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionStatus(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    onChange(auth().currentUser.uid, 'sellerId');
    onChange(
      auth().currentUser.uid + '/' + userData.profile_image,
      'sellerImage',
    );
    onChange(userData.full_name, 'sellerName');
    onChange(userData.address, 'sellerAddress');
    onChange(userData.contact_number, 'sellerContactNumber');
  }, []);

  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value,
    }));

    console.log('values >>', values);
  };

  useEffect(() => {
    onChange(vaccines, 'petVaccination');
  }, [vaccines]);

  const onAddVaccination = () => {
    setVaccines([...vaccines, {vaccineName: '', vaccineDate: ''}]);
  };

  const onChangeVaccineValue = (key, value, i) => {
    const onchangeVal = [...vaccines];
    onchangeVal[i][key] = value;
    setVaccines(onchangeVal);
  };

  const onRemoveVaccination = i => {
    const vaccineData = [...vaccines];
    vaccineData.splice(i, 1);
    setVaccines(vaccineData);
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }, [errorMessage]);

  function onError(onError) {
    setErrorMessage(onError);
  }

  async function getFirestoreData() {

    const overallData = await firestore()
      .collection('PetCollection')
      .doc('PetData')
      .get();

    if (overallData !== undefined) {
      if (overallData.data().data !== undefined) {
        updateFirestoreOverallData(overallData.data().data);
      } else {
        setFirestoreOverallData();
      }
    } else {
      setFirestoreOverallData();
    }
  }

  async function updateFirestoreOverallData(data) {
    const cloudData = JSON.parse(data);
    var myData = Object.keys(cloudData).map(key => cloudData[key]);
    console.log('Data Length >>', myData.length);
    if (myData.length > 0) {
      var existingId = parseInt(myData[myData.length - 1].id, 10)  + 1;
      values.id = existingId;
      console.log('existingId >>', existingId);
    } else {
      onChange(1, 'id');
    }
    console.log('Updated ID >>', values.id);
    myData.push(values);
    submitPost();
    submitVaccineImage();

    await firestore()
      .collection('PetCollection')
      .doc('PetData')
      .set({
        data: JSON.stringify(myData),
      })
      .then(() => {
        console.log('User added!>>', JSON.stringify(values));
        setPurchaseModalVisible(true);
        onChange('', 'petName');
        onChange('', 'petBreed');
        onChange('', 'petGender');
        onChange('', 'petAge');
        onChange('', 'petWeight');
        onChange('', 'petDescription');
        onChange('', 'location');
        onChange('', 'price');
        onChange('', 'category');
        setVaccines([{vaccineName: '', vaccineDate: ''}]);
      });
  }

  async function setFirestoreOverallData() {
    const id = user.uid;
    var dataArray = [];
    dataArray.push(values);
    console.log('Set Data added!>>', JSON.stringify(dataArray));

    await firestore()
      .collection('PetCollection')
      .doc('PetData')
      .set({
        data: JSON.stringify(dataArray),
      })
      .then(() => {
        setPurchaseModalVisible(true);
        onChange('', 'petName');
        onChange('', 'petBreed');
        onChange('', 'petGender');
        onChange('', 'petAge');
        onChange('', 'petWeight');
        onChange('', 'petDescription');
        onChange('', 'location');
        onChange('', 'price');
        onChange('', 'category');
        setVaccines([{vaccineName: '', vaccineDate: ''}]);
        console.log('User added!>>', JSON.stringify(values));
      });
  }

  async function updateFirestoreData(data) {
    const id = user.uid;
    const cloudData = JSON.parse(data);
    var myData = Object.keys(cloudData).map(key => cloudData[key]);
    if (myData.length > 0) {
      onChange(myData[myData.length - 1].id + 1, 'id');
    } else {
      onChange(1, 'id');
    }
    myData.push(values);
    submitPost();
    submitVaccineImage();

    await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(id)
      .doc('Content')
      .set({
        contentData: JSON.stringify(myData),
      })
      .then(() => {
        console.log('User added!>>', JSON.stringify(values));
        setPurchaseModalVisible(true);
        onChange('', 'petName');
        onChange('', 'petBreed');
        onChange('', 'petGender');
        onChange('', 'petAge');
        onChange('', 'petWeight');
        onChange('', 'petDescription');
        onChange('', 'location');
        onChange('', 'price');
        onChange('', 'category');
        setVaccines([{vaccineName: '', vaccineDate: ''}]);
      });
  }

  async function setFirestoreData() {
    submitPost();
    submitVaccineImage();
    const id = user.uid;
    var dataArray = [];
    dataArray.push(values);
    console.log('Set Data added!>>', JSON.stringify(dataArray));

    await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(id)
      .doc('Content')
      .set({
        contentData: JSON.stringify(dataArray),
      })
      .then(() => {
        setPurchaseModalVisible(true);
        onChange('', 'petName');
        onChange('', 'petBreed');
        onChange('', 'petGender');
        onChange('', 'petAge');
        onChange('', 'petWeight');
        onChange('', 'petDescription');
        onChange('', 'location');
        onChange('', 'price');
        onChange('', 'category');
        setImage(null);
        setVaccines([{vaccineName: '', vaccineDate: ''}]);
        console.log('User added!>>', JSON.stringify(values));
      });
  }

  async function submitPost() {
    if (image === null) {
      return;
    }

    const id = user.uid;
    const uploadUri = image;
    let fileName =
      id + '/' + uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    try {
      await storage().ref(fileName).putFile(uploadUri);
      console.log('Upload Succes!>>', image);
    } catch (e) {
      console.log(e);
    }
  }

  async function submitVaccineImage() {
    if (vaccineImage === null) {
      return;
    }

    const id = user.uid;
    const uploadUri = vaccineImage;
    let fileName =
      id + '/' + uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    try {
      await storage().ref(fileName).putFile(uploadUri);
      console.log('Upload Succes!>>', vaccineImage);
    } catch (e) {
      console.log(e);
    }
  }

  const selectImage = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        console.log(source);
        onChange(
          user.uid + '/' + source.substring(source.lastIndexOf('/') + 1),
          'petImage',
        );
        setImage(source);
      }
    });
  };

  const selectVaccineImage = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        console.log(source);
        onChange(
          user.uid + '/' + source.substring(source.lastIndexOf('/') + 1),
          'petVaccinationCard',
        );
        setVaccineImage(source);
      }
    });
  };

  return (
    <ScrollView>
      <DatePicker
        modal
        mode="date"
        open={openDate}
        date={date}
        minimumDate={new Date('2000-1-1')}
        maximumDate={new Date('2023-11-23')}
        onConfirm={date => {
          setOpenDate(false);
          setDate(date);
          const currentDate = new Date();
          const year = currentDate.getFullYear() - date.getFullYear();
          const months = currentDate.getMonth() - date.getMonth();
          let result = '';
          if (year > 0) {
            result = `${year} year and ${months} months`;
          } else {
            result = `${months} months`;
          }
          onChange(result, 'petAge');
          console.log('Date>> ', result);
        }}
        onCancel={() => {
          setOpenDate(false);
        }}
      />

      <SingleButtonModal
        icon={require('../../../assets/orders_active.png')}
        title={'Pet Added!'}
        description={'The Pet has been added to your store!'}
        visible={purchaseModalVisible}
        onRequestClose={() => {
          setPurchaseModalVisible(!purchaseModalVisible);
          navigation.goBack();
        }}
      />
      <InternetStatusModal isVisible={!connectionStatus} />
      <AccountModal
        navigation={navigation}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
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
        <Image
          style={styles.topIcon}
          source={require('../../../assets/ShoppetsTopIcon.png')}
        />
      </LinearGradient>
      <View style={styles.mainContainer}>
        <Input
          value={values.petName}
          onChangeText={value => onChange(value, 'petName')}
          placeholder={'Pet Name'}
        />
        <Input
          value={values.petBreed}
          onChangeText={value => onChange(value, 'petBreed')}
          placeholder={'Pet Breed'}
        />
        <View style={styles.dropDownHolder}>
          <Text style={styles.dropdownLabel}>Category</Text>
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
            onChangeValue={value => onChange(value, 'category')}
          />
        </View>
        <View style={styles.dropDownHolder}>
          <Text style={styles.dropdownLabel}>Gender</Text>
          <DropDownPicker
            open={openGender}
            value={genderValue}
            items={genderItems}
            setOpen={setOpenGender}
            setValue={setGenderValue}
            setItems={setGenderItems}
            style={styles.dropdown}
            showArrowIcon={false}
            dropDownContainerStyle={styles.dropdownContainer}
            dropDownDirection="TOP"
            onChangeValue={value => onChange(value, 'petGender')}
          />
        </View>
        <View style={styles.birthdateHolder}>
          <>
            <Input
              style={styles.birthdate}
              editable={false}
              value={values.petAge}
              placeholder={'Birthdate'}
            />
            <ClickableIcon
              iconStyle={styles.birthdateIcon}
              icon={require('../../../assets/calendar.png')}
              onPress={() => setOpenDate(true)}
            />
          </>
          <Input
            style={styles.weight}
            keyboardType={'phone-pad'}
            maxLength={3}
            value={values.petWeight}
            onChangeText={value => onChange(value, 'petWeight')}
            placeholder={'Weight (kg)'}
          />
        </View>
        <Input
          value={values.location}
          onChangeText={value => onChange(value, 'location')}
          placeholder={'Address'}
        />
        <Input
          keyboardType={'phone-pad'}
          maxLength={6}
          value={values.price}
          onChangeText={value => onChange(value, 'price')}
          placeholder={'Price'}
        />
        <Input
          multiline={true}
          style={styles.description}
          inputStyle={styles.descriptionInput}
          value={values.petDescription}
          onChangeText={value => onChange(value, 'petDescription')}
          placeholder={'Description'}
        />
        <View style={styles.vaccinationHolder}>
          <View style={styles.vaccinationText}>
            <Text style={styles.vaccinationHeader}>Vaccination</Text>
            <Text style={styles.vaccinationSubtitle}>(Optional)</Text>
          </View>
          <ClickableIcon
            iconStyle={styles.addVaccineButton}
            icon={require('../../../assets/add.png')}
            onPress={() => onAddVaccination()}
          />
        </View>
        <FlatList
          data={vaccines}
          keyExtractor={(item, index) => 'key' + index}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            console.log('Vaccines >>', vaccines);
            return (
              <VaccineInput
                vaccineDate={vaccines[index].vaccineDate}
                onChangeDate={value =>
                  onChangeVaccineValue(
                    'vaccineDate',
                    value.toDateString(),
                    index,
                  )
                }
                onChangeVaccine={value =>
                  onChangeVaccineValue('vaccineName', value, index)
                }
                onRemoveVaccine={() => onRemoveVaccination(index)}
              />
            );
          }}
        />

        <View style={styles.vaccinationHolder}>
          <View style={styles.vaccinationText}>
            <Text style={styles.vaccinationHeader}>Vaccination Card Image</Text>
            <Text style={styles.vaccinationSubtitle} />
          </View>
          <ClickableIcon
            iconStyle={styles.addVaccineButton}
            icon={require('../../../assets/add.png')}
            onPress={selectVaccineImage}
          />
        </View>
        <View style={styles.imageContainer}>
          {vaccineImage !== null ? (
            <Image source={{uri: vaccineImage}} style={styles.imageBox} />
          ) : null}
        </View>

        <View style={styles.vaccinationHolder}>
          <View style={styles.vaccinationText}>
            <Text style={styles.vaccinationHeader}>Pet Images</Text>
            <Text style={styles.vaccinationSubtitle} />
          </View>
          <ClickableIcon
            iconStyle={styles.addVaccineButton}
            icon={require('../../../assets/add.png')}
            onPress={selectImage}
          />
        </View>
        <View style={styles.imageContainer}>
          {image !== null ? (
            <Image source={{uri: image}} style={styles.imageBox} />
          ) : null}
        </View>

        <GradientButton
          buttonStyle={{
            width: width - 20,
          }}
          title={'Add to Store'}
          withBorder={true}
          clickable={true}
          onPress={getFirestoreData}
        />
      </View>
    </ScrollView>
  );
};

export default React.memo(AddToStore);
