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
  topText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    letterSpacing: 3,
    color: colors.white,
    width: 175,
    height: 50,
    marginTop: 7,
    marginLeft: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  profileContentView:{
    height: '100%',
  },
  profileHolder:{
    height: 230,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImg:{
    width: 125,
    height: 125,
    borderRadius: 75,
  },
  editButton:{
    width: 30,
    height: 30,
    marginLeft: 90,
    marginTop: -40,
  },
  profileName:{
    marginTop: 20,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  profileNumber:{
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  profileButtonHeader:{
    paddingVertical: 10,
    paddingLeft: 30,
    backgroundColor: colors.lightGrey,
  },
  buttonHeader:{
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: colors.darkGrey2,
  },
  modalButtonHolder:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomColor: colors.darkGreen,
    paddingVertical: 20,
  },
  modalIcon:{
    width: 35,
    height: 35,
  },
  modalText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
    width: 250,
    marginBottom: -5,
  },
});

export default styles;
