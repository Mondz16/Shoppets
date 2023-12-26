/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../constant/color';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    margin: 15,
    marginBottom: 0,
    borderRadius: 7.5,
    padding: 10,
  },
  swiperContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 310,
  },
  topButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
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
    letterSpacing: 1,
    color: colors.white,
    width: 175,
    height: 50,
    marginTop: 7,
    marginLeft: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  topButton: {
    width: 35,
    height: 35,
  },
  mainTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    marginTop: 5,
    paddingHorizontal: 5,
  },
  priceHolder: {
    flexDirection: 'row',
  },
  priceIcon: {
    marginTop: 8,
    marginRight: 5,
    width: 28,
    height: 28,
  },
  locationHolder: {
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.darkGrey2,
    height: 80,
    padding: 5,
  },
  locationText:{
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    color: colors.darkGrey2,
  },
  vaccination: {
    width: '50%',
  },
  sliderWrapper: {
    borderRadius: 7.5,
  },
  bannerHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deliveryHolder:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  deliveryTextHolder:{
    justifyContent: 'center',
    alignItems: 'left',
    marginLeft: 10,
  },
  bannerTextHolder:{
    justifyContent: 'center',
    alignItems: 'left',
    marginLeft: 10,
  },
  banner: {
    height: 125,
    width: 125,
    borderWidth: 1,
    borderRadius: 10,
  },
  deliveryIcon: {
    height: 40,
    width: 40,
    marginTop: -60,
    marginLeft: -100,
  },
  paginationStyle: {
    justifyContent: 'center',
    marginBottom: -25,
  },
  icon: {
    width: 25,
    height: 25,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 8,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: colors.grey,
  },
  activeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 8,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: colors.green,
  },
  detailContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  detailHolder:{
    backgroundColor: colors.lightPurple,
    width: ( width / 3 ) - 30,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7.5,
  },
  detailText:{
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: colors.darkGrey2,
    marginBottom: -5,
  },
  detailValue:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: colors.green,
  },
  gradientButtonHolder:{
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-between',
  },
  statusHolder:{
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footer:{
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 13,
  },
  footerText:{
    alignItems: 'flex-end',
    marginRight: 15,
  },
  footerHeader:{
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginVertical: -3,
    color: colors.darkGrey2,
  },
  footerTotal:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    marginVertical: -3,
    color: colors.darkGreen,
  },
  status:{
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginLeft: 5,
    color: colors.darkGreen,
  },
  statusLabel:{
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
  paymentDetails:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  dropdown:{
    width: 170,
    marginLeft: 50,
  },
  petDetail:{
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginVertical: -2,
  },
  deliveryTextHeader:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
  },
  deliveryText:{
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  deliverySubtitleText:{
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: colors.darkGrey2,
  },
});

export default styles;
