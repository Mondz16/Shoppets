/* eslint-disable prettier/prettier */
import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import ClickableIcon from '../ClickableIcon';
import Button from '../Button';
import auth from '@react-native-firebase/auth';
import colors from '../../constant/color';

const PetModal = ({navigation, data, visible, onRequestClose}) => {
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
            source={{uri: data?.petImage[0]}}
          />
          <View style={styles.container}>
            <View style={styles.infoHolder}>
              <Text style={styles.modalHeader}>{data?.petName}</Text>
              <View style={styles.modalSubtitle}>
                <Text style={styles.modalSubtitle}>{data?.petBreed}</Text>
              </View>
            </View>
            <View style={styles.shopHolder}>
              <ClickableIcon
                buttonStyle={{backgroundColor: colors.lightPurple}}
                iconStyle={styles.clickableIcon}
                icon={require('../../assets/medical.png')}
              />
              <ClickableIcon
                buttonStyle={{backgroundColor: colors.lightPurple}}
                iconStyle={styles.clickableIcon}
                icon={require('../../assets/chat.png')}
              />
            </View>
          </View>
          <Button
            withBorder={true}
            title={'Cancel Order'}
            buttonStyle={{marginTop: 30}}
          />
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default React.memo(PetModal);
