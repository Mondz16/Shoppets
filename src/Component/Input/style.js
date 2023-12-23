/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '../../constant/color';

const styles = StyleSheet.create({
  input: {
    borderRadius: 30,
    width: '100%',
    padding: 5,
    paddingLeft: 20,
    marginTop: 20,
    backgroundColor: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 25,
    width: 25,
  },
  inputField: {
    height: '100%',
    color: colors.black,
    letterSpacing: 1,
    width: '100%',
    fontWeight: '300',
    marginLeft: 5,
  },
});

export default styles;
