/* eslint-disable prettier/prettier */
import {StyleSheet , Dimensions} from 'react-native';
import colors from '../../../constant/color';
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container2:{
    width: '100%',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  topContainer:{
    width: '100%',
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  header:{
    color: colors.black,
    fontSize: 18,
    fontWeight: '500',
  },
  topIcon:{
    width: 175,
    height: 50,
    marginLeft: 50,
  },
  sliderWrapper:{
    width: 380,
    height: 175,
    borderRadius: 7.5,
  },
  banner:{
    width: 380,
    height: 175,
    borderRadius: 7.5,
  },
  paginationStyle: {
    justifyContent: 'center',
    marginBottom: -50,
  },
  dotStyle:{
    width: 10,
    height: 10,
    borderRadius: 8,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: colors.grey,
  },
  activeDotStyle:{
    width: 10,
    height: 10,
    borderRadius: 8,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: colors.green,
  },
  swiperContent:{
    height: '100%',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 350,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: colors.darkGreen,
    alignSelf: 'flex-end',
  },
  textStyle: {
    fontFamily: 'Poppins-Medium',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileImage:{
    width: 200,
    height: 200,
  },
  internetImage:{
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  modalButtonHolder:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottomWidth: 2.2,
    borderBottomColor: colors.darkGreen,
    paddingVertical: 5,
    marginVertical: 5,
  },
  modalIcon:{
    width: 23,
    height: 23,
  },
  modalHeader:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: -5,
  },
  modalSubtitle:{
    fontFamily: 'Poppins-Light',
    letterSpacing: 1,
    fontSize: 14,
  },
  modalText: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    textAlign: 'left',
    letterSpacing: 1,
    textAlignVertical: 'center',
    width: 200,
    marginHorizontal: 10,
    marginBottom: -5,
  },
});

export default styles;
