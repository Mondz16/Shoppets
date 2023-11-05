/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './style';

const Button = ({title , onPress , withBorder , style , buttonStyle, clickable}) => {
  return (
      <TouchableOpacity disabled={!clickable} onPress={onPress} style={[withBorder ? styles.buttonWithBorder : styles.buttonWithoutBorder, buttonStyle]}>
        <Text style={[styles.title, style]}>{title}</Text>
      </TouchableOpacity>
  );
};

Button.defaultProps = {
  clickable : true,
};

export default React.memo(Button);
