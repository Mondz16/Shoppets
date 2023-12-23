/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import ClickableIcon from '../ClickableIcon';
import colors from '../../constant/color';

const NotifCard = ({icon , header, description, timeReceived}) => {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.profile} />
      <View style={styles.infoHolder}>
        <Text style={styles.info}>{header}</Text>
        <View style={styles.rateHolder}>
          <Text style={styles.subtitle}>{description}</Text>
        </View>
      </View>
      <View style={styles.shopHolder}>
          <Text style={styles.timeReceived}>{timeReceived}</Text>
      </View>
    </View>
  );
};

export default React.memo(NotifCard);
