/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '../../constant/color';

const styles = StyleSheet.create({
  buttonWithBorder: {
    width: '100%',
    height: 50,
    borderRadius: 7.5,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkGreen,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 13,
  },
  buttonWithoutBorder: {
    width: '100%',
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: colors.white,
  },
});

export default styles;
