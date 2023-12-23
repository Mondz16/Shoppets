/* eslint-disable prettier/prettier */
import React from 'react';
import {Text} from 'react-native';
import styles from './style';

const Title = ({title , style , isTitle}) => {
  return (
    <Text style={[isTitle ? styles.title : styles.subtitle, style]}>{title}</Text>
  );
};

export default React.memo(Title);
