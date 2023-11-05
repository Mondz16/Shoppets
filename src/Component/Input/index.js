/* eslint-disable prettier/prettier */
import React from 'react';
import {TextInput, View, Image} from 'react-native';
import styles from './style';

const Input = ({placeholder , onChangeText , value , keyboardType , icon , hideInput , style}) => {
  return (
      <View style={[styles.input, style]}>
        {icon && (
          <Image source={icon} style={styles.icon} />
        )}
        <TextInput value={value} onChangeText={onChangeText} style={styles.inputField} placeholder={placeholder} keyboardType={keyboardType} secureTextEntry={hideInput} />
      </View>
  );
};

Input.defaultProps = {
  hideInput : false,
};

export default React.memo(Input);
