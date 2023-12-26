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
import Input from '../Input';

const AddBankModal = ({
  icon,
  title,
  buttonText,
  accounNumber,
  onChangeAccountNumber,
  visible,
  onAddButtonClicked,
  onRequestClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onAddButtonClicked}>
      <View style={styles.modalContainer}>
        <LinearGradient
          style={styles.modalView}
          colors={[colors.lighBlue, colors.white]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}>
            <ClickableIcon
              icon={require('../../assets/close.png')}
              buttonStyle={[styles.buttonClose]}
              onPress={onRequestClose}
            />
          <Image style={styles.profileImage} source={icon} />

          <Text style={styles.modalHeader}>{title}</Text>
          <Input
            value={accounNumber}
            onChangeText={onChangeAccountNumber}
            placeholder={'Account Number'}
          />
          <Button
            withBorder={true}
            title={buttonText ? buttonText : 'Close'}
            buttonStyle={{marginTop: 30}}
            onPress={onAddButtonClicked}
          />
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default React.memo(AddBankModal);
