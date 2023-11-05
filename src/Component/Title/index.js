/* eslint-disable prettier/prettier */
import React from 'react';
import {Text} from 'react-native';
import styles from './style';

const Title = ({title , style}) => {
  return (
      <Text style={[styles.title, style]}>{title}</Text>
  );
};

export default React.memo(Title);
