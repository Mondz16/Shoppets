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
import { launchImageLibrary} from 'react-native-image-picker';

const {width} = Dimensions.get('window');

const SellerEditPetDetails = ({navigation , route}) => {
  const {item} = route?.params || {};
  const [errorMessage, setErrorMessage] = useState();
  const [connectionStatus, setConnectionStatus] = useState(true);

  const user = auth().currentUser;
  const [image, setImage] = useState(null);
  const [vaccines, setVaccines] = useState([]);
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
    coordinates: {
      lat: 40.7128,
      lon: -74.006,
    },
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
    onChange(item.id, 'id');
    onChange(item.sellerImage, 'sellerImage');
    onChange(item.sellerName, 'sellerName');
    onChange(item.sellerAddress, 'sellerAddress');
    onChange(item.sellerContactNumber, 'sellerContactNumber');
    onChange(item.sellerRating, 'sellerRating');
    onChange(item.petName, 'petName');
    onChange(item.petStatus, 'petStatus');
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
    onChange(item.coordinates, 'coordinates');
    setCategoryValue(item.category);
    setGenderValue(item.petGender);
    getImagesFromFirebaseStorage();
    setVaccines(item.petVaccination);
  }, []);


  async function getImagesFromFirebaseStorage(){
    await storage().ref(item.petImage).getDownloadURL().then(x => {
      setImage(x);
    });
  }

  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value,
    }));

    console.log('values >>', values);
  };

  useEffect(() =>{
    onChange(vaccines, 'petVaccination');
  }, [vaccines]);

  const onAddVaccination = () => {
    setVaccines([...vaccines , {vaccineName: '', vaccineDate: ''}]);
  };

  const onLoadVaccination = (vaccineName , vaccineDate) => {
    setVaccines([...vaccines , {vaccineName: vaccineName, vaccineDate: vaccineDate}]);
  };

  const onChangeVaccineValue = (key,value, i) => {
    const onchangeVal = [...vaccines];
    onchangeVal[i][key] = value;
    setVaccines(onchangeVal);
  };

  const onRemoveVaccination = (i) => {
    const vaccineData = [...vaccines];
    vaccineData.splice(i,1);
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

  async function UpdatePetDataInfo(){
    try {
      const id = user.uid;
      const petData = await firestore()
        .collection('PetCollection')
        .doc('PetData')
        .get();

      const cloudData = JSON.parse(petData.data().data);
      var myData = Object.keys(cloudData).map(key => cloudData[key]);

      const indexToUpdate = myData.findIndex(data => data.id === item.id);

      if (indexToUpdate !== -1) {
        myData[indexToUpdate] = { ...myData[indexToUpdate], ...values };
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
        onChange(source.substring(source.lastIndexOf('/') + 1), 'petImage');
        setImage(source);
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
          if (year > 0){
            result = `${year} year and ${months} months`;
          }
          else {
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
        title={'Pet Data Updated!'}
        description={'Data has been updated!'}
        visible={purchaseModalVisible}
        onRequestClose={() => {
          setPurchaseModalVisible(!purchaseModalVisible);
          navigation.navigate('Home', navigation);
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
            renderItem={({ item , index }) => {
              console.log('Vaccines >>', vaccines);
              console.log('Index >>', index);
              return (
                <VaccineInput vaccineName={item.vaccineName} vaccineDate={item.vaccineDate} onChangeDate={(value) => onChangeVaccineValue('vaccineDate',value.toDateString(), index)} onChangeVaccine={(value) => onChangeVaccineValue('vaccineName',value, index)} onRemoveVaccine={() => onRemoveVaccination(index)} />
              );
            }}
        />
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
            <Image source={{ uri: image }} style={styles.imageBox} />
          ) : null}
      </View>

        <GradientButton
          buttonStyle={{
            width: width - 20,
          }}
          title={'Update'}
          withBorder={true}
          clickable={true}
          onPress={UpdatePetDataInfo}
        />
      </View>
    </ScrollView>
  );
};

export default React.memo(SellerEditPetDetails);
