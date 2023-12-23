/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '../../../constant/color';

const styles = StyleSheet.create({
  topContainer: {
    width: '100%',
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  topIcon: {
    width: 175,
    height: 50,
    marginLeft: 50,
  },
  mainContainer:{
    height: '100%',
  },
  addButton:{
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 20,
    marginRight: 20,
    width: 60,
    height: 60,
  },
  addIcon:{
    width: 60,
    height: 60,
  },
  mainC1ontainer:{
    alignItems: 'center',
  },
  container2:{
    alignItems: 'center',
  },
  header:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
  },
});

export default styles;
