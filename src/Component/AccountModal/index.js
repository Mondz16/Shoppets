/* eslint-disable prettier/prettier */
import React from 'react';
import {FlatList, Image, Modal, Pressable, Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import ClickableIcon from '../ClickableIcon';
import Button from '../Button';
import auth from '@react-native-firebase/auth';
import colors from '../../constant/color';

const AccountModal = ({navigation , profileImage , visible , onRequestClose}) => {

const user = auth().currentUser;

  const onLogout = () => {
    onRequestClose();
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('Login', {navigation});
      });
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
            <Image
              style={styles.profileImage}
              source={profileImage === null ? require('../../assets/account.png') : {uri: profileImage}}
            />
            <Text style={styles.modalHeader}>{user?.displayName}</Text>
            <Text style={styles.modalSubtitle}>{user?.phoneNumber}</Text>
            <Pressable
              style={styles.modalButtonHolder}
              onPress={() => {
                onRequestClose();
                navigation.navigate('Profile', {navigation});
              }}>
              <Image
                style={styles.modalIcon}
                source={require('../../assets/profile-user.png')}
              />
              <Text style={styles.modalText}>Profile</Text>
              <Image
                style={styles.modalIcon}
                source={require('../../assets/rightArrow.png')}
              />
            </Pressable>
            <Pressable style={styles.modalButtonHolder} onPress={() => {
                onRequestClose();
                navigation.navigate('Wishlist', navigation);
              }}>
              <Image
                style={styles.modalIcon}
                source={require('../../assets/heartWithBorder.png')}
              />
              <Text style={styles.modalText}>My Wishlist</Text>
              <Image
                style={styles.modalIcon}
                source={require('../../assets/rightArrow.png')}
              />
            </Pressable>
            <Pressable style={styles.modalButtonHolder}
              onPress={() => {
                onRequestClose();
                navigation.navigate('HelpCenter', {navigation});
              }}>
              <Image
                style={styles.modalIcon}
                source={require('../../assets/help-centre.png')}
              />
              <Text style={styles.modalText}>Help Centre</Text>
              <Image
                style={styles.modalIcon}
                source={require('../../assets/rightArrow.png')}
              />
            </Pressable>

            <Button
              withBorder={true}
              title={'Logout'}
              buttonStyle={{marginTop: 30}}
              onPress={onLogout}
            />
          </LinearGradient>
        </View>
      </Modal>
  );
};

export default React.memo(AccountModal);
