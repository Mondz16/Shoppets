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

const SingleButtonModal = ({
  icon,
  title,
  description,
  buttonText,
  visible,
  onRequestClose,
}) => {
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
          <Image style={styles.profileImage} source={icon} />

          <Text style={styles.modalHeader}>{title}</Text>
          <Text style={styles.modalText}>{description}</Text>
          <Button
            withBorder={true}
            title={buttonText ? buttonText : 'Close'}
            buttonStyle={{marginTop: 30}}
            onPress={onRequestClose}
          />
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default React.memo(SingleButtonModal);
