/* eslint-disable prettier/prettier */
import React , {useEffect, useState} from 'react';
import {FlatList, Image, Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import ClickableIcon from '../ClickableIcon';
import Button from '../Button';
import auth from '@react-native-firebase/auth';
import colors from '../../constant/color';
import Input from '../Input';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

const ProfileImageModal = ({navigation , userData, profileImage, visible , onRequestClose}) => {

const user = auth().currentUser;

  const [image, setImage] = useState(null);
  const [values, setValues] = useState({
    full_name: '',
    email: '',
    address: '',
    contact_number: '',
    profile_image: '',
  });

  useEffect(() => {
    onChange(userData.full_name, 'full_name');
    onChange(userData.email, 'email');
    onChange(userData.address, 'address');
    onChange(userData.contact_number, 'contact_number');
    onChange(userData.profile_image, 'profile_image');
    setImage(profileImage);
  }, [visible]);

  async function submitPost(){
    if (image === null) {return;}

    const id = user.uid;
    const uploadUri = image;
    let fileName = id + '/' + uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    try {
      await storage().ref(fileName).putFile(uploadUri);
      console.log('Upload Succes!>>', image);
    } catch (e){
      console.log(e);
    }
  }

  async function getFirestoreData(){
    const id = user.uid;
    const userData = await firestore().collection('PetCollection')
    .doc('UserData')
    .collection(id)
    .doc('Info').get();

    if (userData !== undefined )
    {
        if (userData.data().infoData !== undefined){
          console.log('Check Content Data: defined>>');
          {updateFirestoreData(userData.data().infoData);}
        }
        else {
          console.log('Check Content Data: undefined>>');
          setFirestoreData();
        }
    }
    else {
      console.log('Check Content Data: undefined>> 2');
      setFirestoreData();
    }
  }

  async function updateFirestoreData(data) {
    const id = user.uid;
    submitPost();

    await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(id)
      .doc('Info')
      .set({
        infoData:  JSON.stringify(values),
      })
      .then(() => {
        console.log('User added!>>', JSON.stringify(values));

      });
  }

  async function setFirestoreData() {
    submitPost();
    const id = user.uid;

    await firestore()
      .collection('PetCollection')
      .doc('UserData')
      .collection(id)
      .doc('Info')
      .set({
        infoData: JSON.stringify(values),
      })
      .then(() => {

      });
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
        onChange(source.substring(source.lastIndexOf('/') + 1), 'profile_image');
        setImage(source);
      }
    });
  };

  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value,
    }));

    console.log('values >>', JSON.stringify(values));
  };

  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.modalContainer}>
          <LinearGradient
            style={styles.modalView}
            colors={[colors.lighBlue, colors.white]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <ClickableIcon
              icon={require('../../assets/close.png')}
              buttonStyle={[styles.button, styles.buttonClose]}
              onPress={onRequestClose}
            />
            {
              image ? (
                <Image
                  style={styles.profileImage}
                  source={{uri : image}}
                />
              ) : (
                <Image
                  style={styles.profileImage}
                  source={require('../../assets/account.png')}
                />
              )
            }
            <ClickableIcon buttonStyle={styles.editButton} icon={require('../../assets/edit.png')} onPress={() => selectImage()} />
            <Input
              value={values.full_name}
              onChangeText={value => onChange(value, 'full_name')}
              placeholder={'Full Name'}
            />
            <Input
              value={values.contact_number}
              onChangeText={value => onChange(value, 'contact_number')}
              placeholder={'Contact Number'}
            />
            <Input
              value={values.email}
              onChangeText={value => onChange(value, 'email')}
              placeholder={'Email'}
            />
            <Input
              value={values.address}
              onChangeText={value => onChange(value, 'address')}
              placeholder={'Address'}
            />
            <Button
              withBorder={true}
              title={'Update'}
              buttonStyle={{marginTop: 30}}
              onPress={() => getFirestoreData()}
            />
          </LinearGradient>
        </View>
      </Modal>
  );
};

export default React.memo(ProfileImageModal);
