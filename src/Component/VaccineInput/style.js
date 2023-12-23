/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../constant/color';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  vaccineInputHolder:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  icon: {
    height: 25,
    width: 25,
    marginLeft: -110,
  },
  removeIcon: {
    height: 25,
    width: 25,
    marginLeft: -100,
  },
  inputField: {
    borderRadius: 5,
    backgroundColor: colors.grey,
    padding: 5,
    paddingLeft: 10,
    marginRight: 10,
    height: '100%',
    color: colors.black,
    letterSpacing: 1,
    width: width / 2 - 45,
    fontWeight: '300',
    fontSize: 12,
  },
});

export default styles;
