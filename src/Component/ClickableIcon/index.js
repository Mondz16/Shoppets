/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styles from './style';

const ClickableIcon = ({icon , onPress , iconStyle , buttonStyle}) => {
  return (
      <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
        <Image source={icon} style={[styles.icon , iconStyle]} />
      </TouchableOpacity>
  );
};

export default React.memo(ClickableIcon);
