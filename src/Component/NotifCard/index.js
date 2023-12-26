/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import ClickableIcon from '../ClickableIcon';
import colors from '../../constant/color';

const NotifCard = ({icon , header, description, timeReceived, onPress}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
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
    </Pressable>
  );
};

export default React.memo(NotifCard);
