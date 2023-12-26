/* eslint-disable prettier/prettier */
import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../constant/color';

const {width , height} = Dimensions.get('window');

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
  chatContainer:{
    height: height - 75,
  },
  deliveryHolder:{
    width: 300,
    padding: 10,
    margin: 10,
    borderRadius: 15,
    backgroundColor: colors.grey,
    alignSelf: 'flex-start',
  },
  deliveryHolder2:{
    width: 300,
    padding: 10,
    margin: 10,
    borderRadius: 15,
    backgroundColor: colors.lighBlue,
    alignSelf: 'flex-end',
  },
  deliveryText:{
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'left',
  },
  deliveryTextHeader:{
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.darkGrey2,
    textAlign: 'left',
  },
  deliveryText2:{
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    textAlign: 'right',
  },
  deliveryTextHeader2:{
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.darkGrey2,
    textAlign: 'right',
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
  topHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGrey,
  },
  chatFooter:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
    borderTopColor: colors.darkGrey,
  },
  sellerImage:{
    borderRadius: 50, width: 50, height: 50,
  },
  callIcon:{
    width: 30, height: 30,
  },
  sellerNameText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 27,
    color: colors.black,
    width: 250,
    height: 50,
    marginTop: 7,
    marginHorizontal: 10,
    textAlign: 'start',
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
  banner: {
    height: 280,
    borderWidth: 1,
    borderRadius: 10,
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
});

export default styles;
