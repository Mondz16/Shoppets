/* eslint-disable prettier/prettier */
import React from 'react';
import {TextInput, View, Image} from 'react-native';
import styles from './style';

const Input = ({placeholder, multiline , onChangeText , value , keyboardType , icon , hideInput, maxLength , editable , style , inputStyle}) => {
  return (
      <View style={[styles.input, style]}>
        {icon && (
          <Image source={icon} style={styles.icon} />
        )}
        <TextInput multiline={multiline} editable={editable} value={value} onChangeText={onChangeText} style={[styles.inputField, inputStyle]} placeholder={placeholder} keyboardType={keyboardType} secureTextEntry={hideInput} maxLength={maxLength} />
      </View>
  );
};

Input.defaultProps = {
  hideInput : false,
  maxLength : 524288,
  editable: true,
};

export default React.memo(Input);
