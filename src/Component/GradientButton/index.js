/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constant/color';

const GradientButton = ({
  title,
  onPress,
  withBorder,
  firstColor,
  secondColor,
  style,
  buttonStyle,
  clickable,
}) => {
  return (
    <TouchableOpacity
      disabled={!clickable}
      onPress={onPress}
      style={[
        withBorder ? styles.buttonWithBorder : styles.buttonWithoutBorder,
        buttonStyle,
      ]}>
      <LinearGradient
        style={styles.buttonWithBorder}
        colors={ [firstColor, secondColor]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text style={[styles.title , style]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

GradientButton.defaultProps = {
  clickable: true,
  isDefaultColor: true,
  firstColor: colors.darkBlue,
  secondColor: colors.green,
};

export default React.memo(GradientButton);
