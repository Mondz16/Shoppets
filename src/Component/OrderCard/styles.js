/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import colors from '../../constant/color';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 7,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 130,
  },
  petInfoContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
    width: 230,
  },
  profile: {
    borderRadius: 5,
    width: 150,
    height: 115,
  },
  icon: {
    width: 150,
    height: 150,
    marginRight: 2,
  },
  infoHolder: {
    width: '82%',
  },
  info: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    letterSpacing: 0.5,
    color: colors.black,
    marginBottom: -5,
  },
  breed:{
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    letterSpacing: 0.5,
    color: colors.black,
    marginBottom: -5,
  },
  rateHolder: {
    alignItems: 'flex-start',
  },
  rate: {
    fontSize: 13,
    color: 'rgba(0,0,0,.5)',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGrey2,
    fontSize: 12,
  },
  clickableIcon: {
    width: 30,
    height: 30,
  },
  timeReceived: {
    fontFamily: 'Poppins-Regular',
    color: colors.darkGrey2,
    textAlignVertical: 'bottom',
    fontSize: 12,
  },
  chatButton: {
    width: 30,
    height: 30,
  },
  statusHolder:{
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  status:{
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginLeft: 5,
    color: colors.darkGreen,
  },
  statusLabel:{
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  locationIcon:{
    width: 15,
    height: 15,
  },
});

export default styles;
