/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import ClickableIcon from '../ClickableIcon';
import colors from '../../constant/color';

const InfoCard = ({profile, sellerName, rate, onMedicalPress, onChatPress}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: profile}} style={styles.profile} />
      <View style={styles.infoHolder}>
        <Text style={styles.info}>{sellerName}</Text>
        <View style={styles.rateHolder}>
          <Text style={styles.subtitle}>Pet Owner</Text>
        </View>
      </View>
      <View style={styles.shopHolder}>
          <ClickableIcon onPress={onMedicalPress} buttonStyle={{backgroundColor: colors.lightPurple}} iconStyle={styles.clickableIcon} icon={require('../../assets/medical.png')}  />
          <ClickableIcon onPress={onChatPress} buttonStyle={{backgroundColor: colors.lightPurple}} iconStyle={styles.clickableIcon} icon={require('../../assets/chat.png')}  />
      </View>
    </View>
  );
};

export default React.memo(InfoCard);
